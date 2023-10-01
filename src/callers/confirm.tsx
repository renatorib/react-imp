import React from "react";
import { DialogProps, createCaller } from "../core/store";
import { DialogActions, Button, DangerButton, PrimaryButton, Dialog, DialogTitle, DialogBody } from "../dialog";

function ConfirmDialog(
  dialog: DialogProps<{
    title?: string;
    danger?: boolean;
    message: string;
    onConfirm: () => any;
    onCancel?: () => any;
    onClose?: () => any;
  }>,
) {
  return (
    <Dialog open={dialog.open} onClose={dialog.handleClose(dialog.props.onClose)}>
      {dialog.props.title && <DialogTitle>{dialog.props.title}</DialogTitle>}
      <DialogBody>{dialog.props.message}</DialogBody>
      <DialogActions>
        <Button onClick={dialog.handleClose(dialog.props.onCancel)}>Cancel</Button>
        {dialog.props.danger ? (
          <DangerButton onClick={dialog.handleClose(dialog.props.onConfirm)}>Confirm</DangerButton>
        ) : (
          <PrimaryButton onClick={dialog.handleClose(dialog.props.onConfirm)}>Confirm</PrimaryButton>
        )}
      </DialogActions>
    </Dialog>
  );
}

export const confirm = createCaller(ConfirmDialog);
