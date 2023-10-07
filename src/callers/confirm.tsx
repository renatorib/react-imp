import React from "react";
import { CallerComponentProps, createCaller } from "../imp-store/imp-store";
import {
  DialogActions,
  Button,
  DangerButton,
  PrimaryButton,
  Dialog,
  DialogTitle,
  DialogBody,
  DialogDismiss,
} from "../dialog";

function ConfirmDialog(
  item: CallerComponentProps<{
    title?: string;
    danger?: boolean;
    message?: string;
    onConfirm: () => any;
    onCancel?: () => any;
    onClose?: () => any;
  }>,
) {
  return (
    <Dialog open={item.isOpen} onClose={item.handleClose(item.props.onClose)}>
      <DialogDismiss />
      {item.props.title && <DialogTitle>{item.props.title}</DialogTitle>}
      {item.props.message && <DialogBody>{item.props.message}</DialogBody>}
      <DialogActions>
        <Button onClick={item.handleClose(item.props.onCancel)}>Cancel</Button>
        {item.props.danger ? (
          <DangerButton onClick={item.handleClose(item.props.onConfirm)}>Confirm</DangerButton>
        ) : (
          <PrimaryButton onClick={item.handleClose(item.props.onConfirm)}>Confirm</PrimaryButton>
        )}
      </DialogActions>
    </Dialog>
  );
}

export const confirm = createCaller(ConfirmDialog);
