import React from "react";
import { useDialogId } from "./dialog";

export const DialogDescription = React.forwardRef<React.ComponentRef<"p">, React.ComponentProps<"p">>((props, ref) => {
  const id = useDialogId();

  return (
    <p
      ref={ref}
      id={`dialog_${id}_desc`}
      {...props}
      style={{
        marginBlock: "1rem",
        ...props.style,
      }}
    />
  );
});
