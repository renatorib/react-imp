import React from "react";
import { DialogProps, createCaller } from "../core/store";
import { Dialog } from "../dialog";

function CustomDialog(dialog: DialogProps<(dialog: Omit<DialogProps, "props">) => React.ReactNode>) {
  const { props: render, ...restDialog } = dialog;
  return (
    <Dialog open={dialog.open} onClose={dialog.handleClose()}>
      {render(restDialog)}
    </Dialog>
  );
}

export const custom = createCaller(CustomDialog);
