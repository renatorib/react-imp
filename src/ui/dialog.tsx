import React from "react";

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

type DialogProps = {
  open: boolean;
  onClose?: () => any;
  Backdrop?: (props: React.ComponentProps<"div">) => JSX.Element;
};

export const Dialog = React.forwardRef<React.ComponentRef<"div">, React.ComponentProps<"div"> & DialogProps>(
  ({ open, onClose, Backdrop = BackdropComp, ...props }, ref) => {
    if (!open) return null;

    return (
      <Backdrop onClick={onClose}>
        <div
          ref={ref}
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
          }}
          role="dialog"
        />
      </Backdrop>
    );
  },
);
