import React from "react";

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
