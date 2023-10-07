import React from "react";
import cn from "classnames";

import { getAllFocusableIn, lockScroll, supportsInert, inertFocusOn, inertFocusOff, inertCleanUp } from "../utils/dom";
import { useSafeLayoutEffect, afterPaint, afterTimeout, documentListener } from "../utils/react";

import { Portal } from "./portal";
import { dialogStack } from "./dialog-stack-store";
import { DialogContext } from "./dialog-context";
import { fade, scale, slide } from "./animations";

export function Dialog(props: {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  scrollOn?: "backdrop" | "dialog";
  animation?: false | "custom" | "scale" | "fade" | "slide";
  duration?: number;
}) {
  const { children, open, onClose, scrollOn = "backdrop", duration: _duration, animation = "scale" } = props;
  const duration = animation !== false ? _duration ?? 100 : 0;
  const animated = duration > 0;

  const id = React.useId();
  const [transition, setTransition] = React.useState<"enter" | "leave" | null>(null);
  const [stack] = dialogStack.useStore();
  const stackIndex = stack.findIndex(isSame(id));
  const isTopmost = stackIndex === stack.length - 1;
  const isBottommost = stackIndex === 0;

  const [$wrapper, set$wrapper] = React.useState<HTMLElement | null>(null);
  const [$dialog, set$dialog] = React.useState<HTMLElement | null>(null);

  // Stack order tracker
  // Add and remove id to stack when it's opened or closed
  useSafeLayoutEffect(() => {
    if (open) {
      dialogStack.push(id);
    } else {
      dialogStack.remove(isSame(id));
    }
    return () => dialogStack.remove(isSame(id));
  }, [open]);

  // Enable transition when animated != false
  // When open it will render dialog then put `data-enter` in the next repaint.
  // When close it will put `data-leave` and wait animation ends before unmount if needed.
  // This allows animations via css transitions.
  useSafeLayoutEffect(() => {
    if (!animated) return;
    if (!$wrapper) {
      return setTransition(null);
    }
    return afterPaint(() => {
      setTransition(open ? "enter" : "leave");
    });
  }, [animated, $wrapper, open]);

  useSafeLayoutEffect(() => {
    if (!$wrapper) return;
    if (transition === "leave") {
      if (animated) {
        return afterTimeout(duration, () => {
          setTransition(null);
        });
      } else {
        return afterPaint(() => {
          setTransition(null);
        });
      }
    }
    return;
  }, [animated, animated, transition]);

  // Toggle inert on every element but dialog itself
  // This also works as a focus trap to dialog content
  useSafeLayoutEffect(() => {
    if (!supportsInert()) return;
    if (!isTopmost) return;
    if (!$wrapper) return;
    if (open) {
      inertFocusOn($wrapper, id);
      return () => inertCleanUp(id);
    } else {
      inertFocusOff($wrapper, id);
      return;
    }
  }, [open, isTopmost, $wrapper]);

  // Handle focus restoration after close
  const restorerRef = React.useRef<HTMLElement | null>();
  useSafeLayoutEffect(() => {
    if (open) {
      if (document.activeElement && document.activeElement instanceof HTMLElement) {
        restorerRef.current = document.activeElement;
      }
    } else {
      restorerRef.current?.focus();
    }
  }, [open]);

  // Handle autofocus on open
  useSafeLayoutEffect(() => {
    if (!$wrapper) return;
    if (!isTopmost) return;
    if (open) {
      // React doesn't render [autofocus] to the dom. So we need to work with [data-autofocus] instead.
      const autofocus = $wrapper.querySelector("[data-autofocus]");
      if (autofocus instanceof HTMLElement) {
        autofocus.focus();
      } else {
        // If no autofocus found, it should focus the first focusable element on dialog.
        const focusable = getAllFocusableIn($wrapper);
        focusable[0]?.focus();
      }
    }
  }, [open, isTopmost, $wrapper]);

  // Handle close on clicking outside of dialog
  // It should close only topmost dialog if stacked
  useSafeLayoutEffect(() => {
    return documentListener(["mousedown", "touchstart"], (event) => {
      if (!open) return;
      if (!isTopmost) return;
      if (!$dialog) return;
      if ($dialog.contains(event.target as Node)) return;

      onClose();
    });
  }, [open, isTopmost, $dialog]);

  // Handle close on esc
  // It should close only topmost dialog if stacked
  useSafeLayoutEffect(() => {
    return documentListener("keydown", (event) => {
      if (!open) return;
      if (!isTopmost) return;
      if (event.key !== "Escape") return;

      onClose();
    });
  }, [open, isTopmost]);

  // Handle lock scroll
  // Lock scroll when first dialog is shown
  // Remove lock when last dialog is closed
  const scrollUnlockerRef = React.useRef<() => void>();
  useSafeLayoutEffect(() => {
    if (!isBottommost) return;
    if (open) {
      scrollUnlockerRef.current = lockScroll();
      return () => afterTimeout(duration || 0, scrollUnlockerRef.current);
    } else {
      return afterTimeout(duration || 0, scrollUnlockerRef.current);
    }
  }, [open, duration, isBottommost]);

  // Prepare to render
  const zIndex = 100 + stackIndex;
  const transitionProps = {
    ...(animated !== false && { "data-animated": "" }),
    ...(transition === "enter" && { "data-enter": "" }),
    ...(transition === "leave" && { "data-leave": "" }),
  };

  const context = {
    id,
    open,
    onClose,
    isTopmost,
    isBottommost,
    stackIndex,
    animated,
    duration,
    scrollOn,
  };

  return (
    <Portal>
      <DialogContext.Provider value={context}>
        <div
          className="imp-wrapper"
          ref={set$wrapper}
          id={id}
          {...transitionProps}
          {...(!open && { "aria-hidden": true, inert: "" })}
          style={{
            ...{ "--duration": `${duration}ms` },
            ...(transition === "leave" && { overflow: "hidden" }),
            ...(animated && !open && { visibility: "hidden" }),
            ...(!animated && !open && { display: "none" }),
            pointerEvents: open ? "initial" : "none",
          }}
        >
          <div
            id={`${id}_backdrop`}
            className={cn("imp-backdrop", animated && fade)}
            {...transitionProps}
            style={{
              position: "fixed",
              inset: 0,
              background: isTopmost ? "rgba(0, 0, 0, 0.1)" : "transparent",
              backdropFilter: isTopmost ? "blur(2px)" : "none",
              display: "grid",
              placeItems: "center",
              zIndex,
              ...(scrollOn === "backdrop" && {
                maxHeight: "100dvh", // TODO: fallback to 100vh
                overflowY: "auto",
                padding: "10px 0",
              }),
            }}
          >
            <div
              ref={set$dialog}
              id={`${id}_dialog`}
              role="dialog"
              className={cn(
                "imp-dialog",
                animated && {
                  [fade]: animation === "fade",
                  [scale]: animation === "scale",
                  [slide]: animation === "slide",
                },
              )}
              {...transitionProps}
              style={{
                position: "relative",
                background: "white",
                boxShadow: "0 5px 25px rgba(0, 0, 0, 0.1)",
                padding: "1.5rem",
                width: "95%",
                maxWidth: "400px",
                borderRadius: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                ...(scrollOn === "dialog" && {
                  maxHeight: "calc(95dvh - 3rem)",
                  overflowY: "auto",
                }),
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </DialogContext.Provider>
    </Portal>
  );
}

function isSame(id: string) {
  return (value: any) => value === id;
}
