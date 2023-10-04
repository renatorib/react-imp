import React from "react";

import { DialogProps, createCaller } from "../store/store";
import { DialogActions, PrimaryButton, Dialog, DialogTitle, DialogBody } from "../dialog";

function AlertDialog(dialog: DialogProps<{ title?: string; message: string; onClose?: () => any }>) {
  const { title, message, onClose } = dialog.props;

  return (
    <Dialog open={dialog.open} onClose={dialog.handleClose(onClose)}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogBody>{message}</DialogBody>
      <DialogActions>
        <PrimaryButton onClick={dialog.handleClose(onClose)}>Ok</PrimaryButton>
      </DialogActions>
    </Dialog>
  );
}

export const alert = createCaller(AlertDialog);
