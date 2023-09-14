import React from "react";
import { useDialogId } from "./dialog";

export const DialogTitle = React.forwardRef<React.ComponentRef<"h1">, React.ComponentProps<"h1">>((props, ref) => {
  const id = useDialogId();

  return (
    <h1
      ref={ref}
      id={`dialog_${id}_title`}
      {...props}
      style={{ margin: 0, marginBottom: "1rem", fontSize: "1.4rem", fontWeight: 700, ...props.style }}
    />
  );
});
