import React from "react";
import { useDialogContext } from "./dialog-context";
import { CloseButton } from "./dialog-action-button";

export const DialogDismiss = React.forwardRef<
  React.ComponentRef<typeof CloseButton>,
  React.ComponentProps<typeof CloseButton>
>((props, ref) => {
  const dialog = useDialogContext();

  return (
    <CloseButton
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
    </CloseButton>
  );
});
