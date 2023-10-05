import React from "react";

import { CallerComponentProps, createCaller } from "../imp-store/imp-store";
import { DialogActions, PrimaryButton, Dialog, DialogTitle, DialogBody } from "../dialog";

function AlertDialog(item: CallerComponentProps<{ title?: string; message: string; onClose?: () => any }>) {
  const { title, message, onClose } = item.props;

  return (
    <Dialog open={item.isOpen} onClose={item.handleClose(onClose)}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogBody>{message}</DialogBody>
      <DialogActions>
        <PrimaryButton onClick={item.handleClose(onClose)}>Ok</PrimaryButton>
      </DialogActions>
    </Dialog>
  );
}

export const alert = createCaller(AlertDialog);
