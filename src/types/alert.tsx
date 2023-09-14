import React from "react";
import { dialog } from "../store";
import { DialogActions, PrimaryButton, Dialog, DialogTitle, DialogDescription } from "../ui";

export const alert = (props: { title?: string; message: string; onClose?: () => any }) =>
  dialog({
    props,
    Component: function AlertDialog(dialog) {
      return (
        <Dialog open={true} onClose={dialog.handleClose(props.onClose)}>
          {dialog.props.title && <DialogTitle>{dialog.props.title}</DialogTitle>}
          <DialogDescription>{dialog.props.message}</DialogDescription>
          <DialogActions>
            <PrimaryButton onClick={dialog.handleClose(props.onClose)}>Ok</PrimaryButton>
          </DialogActions>
        </Dialog>
      );
    },
  });
