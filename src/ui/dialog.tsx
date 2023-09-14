import React, { createContext, useContext, useId } from "react";

export const DialogIdContext = createContext<string>("");
export const useDialogId = () => useContext(DialogIdContext);

export const Backdrop = React.forwardRef<React.ComponentRef<"div">, React.ComponentProps<"div">>(
  ({ children, ...props }, ref) => {
    return (
      <>
        <div
          ref={ref}
          role="presentation"
          {...props}
          style={{
            zIndex: 9999,
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: "rgba(0, 0, 0, 0.05)",
            display: "grid",
            placeItems: "center",
            backdropFilter: "blur(2px)",
            ...props.style,
          }}
        />
        {children}
      </>
    );
  },
);

const BackdropComp = Backdrop;

export const Dialog = React.forwardRef<
  React.ComponentRef<"div">,
  React.ComponentProps<"div"> & {
    open: boolean;
    onClose?: () => any;
    Backdrop?: (props: React.ComponentProps<"div">) => JSX.Element;
  }
>(({ open, onClose, Backdrop = BackdropComp, ...props }, ref) => {
  const id = useId();
  if (!open) return null;

  return (
    <DialogIdContext.Provider value={id}>
      <Backdrop onClick={onClose}>
        <div
          ref={ref}
          aria-labelledby={`dialog_${id}_title`}
          aria-describedby={`dialog_${id}_desc`}
          role="dialog"
          {...props}
          style={{
            zIndex: 9999,
            position: "relative",
            inset: "auto",
            maxHeight: "auto",
            top: "10vh",
            bottom: "10vh",
            margin: "auto",
            padding: 20,
            background: "white",
            borderRadius: 12,
            width: "fit-content",
            maxWidth: "90vw",
            boxShadow: "0 20px 40px -10px rgb(0 0 0 / 0.15)",
            ...props.style,
          }}
        />
      </Backdrop>
    </DialogIdContext.Provider>
  );
});
