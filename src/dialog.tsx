import React from "react";
import { createPortal } from "react-dom";

import { getAllFocusableIn, lockScroll, supportsInert, inertFocusOn, inertFocusOff, inertCleanUp } from "./utils/dom";
import { useSafeLayoutEffect, afterPaint, afterTimeout, documentListener } from "./utils/react";
import { createContext } from "./utils/context";
import { ArrayStore } from "./utils/store";

type IDialogContext = { id: string; open: boolean; onClose: () => void };

export const [DialogContext, useDialogContext] = createContext<IDialogContext>();

/**
 * Global store to track stacked dialogs order.
 * E.g: Esc should close only topmost dialog when more than 1 is rendered, not all
 * so we need to know who is the topmost.
 */
export const dialogStack = new ArrayStore([] as string[]);
const isSame = (id: string) => (value: any) => value === id;

export function Dialog(props: {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  animated?: false | number;
  scrollOn?: "backdrop" | "dialog";
}) {
  const { children, open, onClose, animated = 100, scrollOn = "backdrop" } = props;

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
      return () => afterTimeout(animated || 0, scrollUnlockerRef.current);
    } else {
      return afterTimeout(animated || 0, scrollUnlockerRef.current);
    }
  }, [open, animated, isBottommost]);

  const zIndex = 50 + stackIndex;
  const transitionProps = {
    ...(animated !== false && { "data-animated": "" }),
    ...(transition === "enter" && { "data-enter": "" }),
    ...(transition === "leave" && { "data-leave": "" }),
  };

  return (
    <Portal>
      <DialogContext.Provider value={{ id, open, onClose }}>
        <div
          className="imp-wrapper"
          ref={set$wrapper}
          id={id}
          {...transitionProps}
          {...(!open && { "aria-hidden": true, inert: "" })}
          style={{
            ...(animated !== false && { "--duration": `${animated}ms` }),
            pointerEvents: open ? "initial" : "none",
            visibility: open ? "initial" : "hidden",
          }}
        >
          <div
            id={`${id}_backdrop`}
            className="imp-backdrop"
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
              className="imp-dialog"
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

function Portal({ children, container }: { container?: HTMLElement; children?: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(children, container ?? document.body);
}

export const DialogDismiss = React.forwardRef<React.ComponentRef<typeof Button>, React.ComponentProps<typeof Button>>(
  (props, ref) => {
    const dialog = useDialogContext();

    return (
      <Button
        ref={ref}
        onClick={() => dialog.onClose()}
        {...props}
        style={{
          position: "absolute",
          right: "1.5rem",
          top: "1.5rem",
          padding: 4,
          ...props.style,
        }}
      >
        <svg
          aria-label="Dismiss"
          display="block"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5pt"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
        >
          <line x1="4" y1="4" x2="12" y2="12"></line>
          <line x1="4" y1="12" x2="12" y2="4"></line>
        </svg>
      </Button>
    );
  },
);

export const DialogTitle = React.forwardRef<React.ComponentRef<"h1">, React.ComponentProps<"h1">>((props, ref) => {
  const dialog = useDialogContext();

  return (
    <h1
      ref={ref}
      id={`${dialog.id}_dialog_title`}
      {...props}
      style={{
        margin: 0,
        fontSize: "1.4rem",
        fontWeight: 700,
        color: "rgb(30, 30, 70)",
        ...props.style,
      }}
    />
  );
});

export const DialogBody = React.forwardRef<React.ComponentRef<"div">, React.ComponentProps<"div">>((props, ref) => {
  const dialog = useDialogContext();

  return (
    <div
      ref={ref}
      id={`${dialog.id}_dialog_desc`}
      {...props}
      style={{
        lineHeight: "1.33em",
        color: "rgb(80, 80, 100)",
        ...props.style,
      }}
    />
  );
});

export const DialogActions = React.forwardRef<React.ComponentRef<"div">, React.ComponentProps<"div">>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      style={{
        display: "flex",
        justifyContent: "end",
        gap: 8,
        ...props.style,
      }}
    />
  );
});

export const Button = React.forwardRef<React.ComponentRef<"button">, React.ComponentProps<"button">>((props, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      style={{
        borderRadius: 4,
        background: "white",
        border: "1px solid #dddddd",
        fontSize: "1em",
        padding: "6px 12px",
        ...props.style,
      }}
    />
  );
});

export const PrimaryButton = React.forwardRef<React.ComponentRef<typeof Button>, React.ComponentProps<typeof Button>>(
  (props, ref) => {
    return (
      <Button
        ref={ref}
        {...props}
        style={{ background: "dodgerblue", color: "white", border: "transparent", ...props.style }}
      />
    );
  },
);

export const DangerButton = React.forwardRef<React.ComponentRef<typeof Button>, React.ComponentProps<typeof Button>>(
  (props, ref) => {
    return (
      <Button
        ref={ref}
        {...props}
        style={{ background: "red", color: "white", border: "transparent", ...props.style }}
      />
    );
  },
);
