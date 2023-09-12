import React from "react";

export const Backdrop = React.forwardRef<React.ComponentRef<"div">, React.ComponentProps<"div">>((props, ref) => {
  return (
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
        background: "rgba(0, 0, 0, 0.1)",
        display: "grid",
        placeItems: "center",
        backdropFilter: "blur(4px)",
        ...props.style,
      }}
    />
  );
});
