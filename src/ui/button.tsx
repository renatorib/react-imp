import React from "react";

export const Button = React.forwardRef<React.ComponentRef<"button">, React.ComponentProps<"button">>((props, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      style={{
        borderRadius: 6,
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
        style={{ background: "blue", color: "white", border: "transparent", ...props.style }}
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
