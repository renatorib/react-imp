import React from "react";
import { dialog } from "../store";
import { DialogActions, Button, PrimaryButton, Dialog, DialogTitle, DialogDescription } from "../ui";
import { DangerButton } from "../ui/button";

export const confirm = (props: {
  title?: string;
  danger?: boolean;
  message: string;
  onConfirm: () => any;
  onCancel?: () => any;
}) =>
  dialog({
    props,
    Component: function ConfirmDialog(dialog) {
      return (
        <Dialog open={true}>
          {dialog.props.title && <DialogTitle>{dialog.props.title}</DialogTitle>}
          <DialogDescription>{dialog.props.message}</DialogDescription>
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
    },
  });
