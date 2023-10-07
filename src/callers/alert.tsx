import React from "react";

import { CallerComponentProps, createCaller } from "../imp-store/imp-store";
import { DialogActions, PrimaryButton, Dialog, DialogTitle, DialogBody, DialogDismiss } from "../dialog";

function AlertDialog(item: CallerComponentProps<{ title?: string; message?: string; onClose?: () => any }>) {
  const { title, message, onClose } = item.props;

  return (
    <Dialog open={item.isOpen} onClose={item.handleClose(onClose)}>
      <DialogDismiss />
      {title && <DialogTitle>{title}</DialogTitle>}
      {message && <DialogBody>{message}</DialogBody>}
      <DialogActions>
        <PrimaryButton onClick={item.handleClose(onClose)}>Ok</PrimaryButton>
      </DialogActions>
    </Dialog>
  );
}

export const alert = createCaller(AlertDialog);
