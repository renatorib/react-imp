import React from "react";
import { dialog } from "../store";
import { Actions, PrimaryButton, Title, Dialog } from "../ui";

export const alert = (props: { title?: string; message: string; onClose?: () => any }) =>
  dialog({
    props,
    Component: function AlertDialog(dialog) {
      return (
        <Dialog open={true} onClose={dialog.close}>
          {dialog.props.title && <Title>{dialog.props.title}</Title>}
          <p>{dialog.props.message}</p>
          <Actions>
            <PrimaryButton onClick={dialog.close}>Ok</PrimaryButton>
          </Actions>
        </Dialog>
      );
    },
  });
