import React from "react";
import { dialog, DialogProps } from "../store";
import { Dialog } from "../ui";

export const custom = (render: (dialog: DialogProps<{}>) => React.ReactNode) =>
  dialog({
    Component: function CustomDialog(dialog) {
      return (
        <Dialog open={true} onClose={dialog.close}>
          {render(dialog)}
        </Dialog>
      );
    },
  });
