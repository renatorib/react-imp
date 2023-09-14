import React from "react";
import { dialog, DialogProps } from "../store";
import { Dialog } from "../ui";

export const custom = (render: (dialog: DialogProps<undefined>) => React.ReactNode) =>
  dialog({
    Component: function CustomDialog(dialog: DialogProps<undefined>) {
      return (
        <Dialog open={true} onClose={dialog.close}>
          {render(dialog)}
        </Dialog>
      );
    },
  });
