import React from "react";
import { styled, setup } from "goober";
import { useDialogContext } from "./dialog-context";

setup(React.createElement);

const StyledDialogTitle = styled("h1", React.forwardRef)`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: rgb(30, 30, 70);
`;

export const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof StyledDialogTitle>,
  React.ComponentProps<typeof StyledDialogTitle>
>((props, ref) => {
  const dialog = useDialogContext();
  return <StyledDialogTitle ref={ref} id={`${dialog.id}_dialog_title`} {...props} />;
});
