import React from "react";
import { CallerComponentProps, createCaller } from "../imp-store/imp-store";
import { Dialog } from "../dialog";

function CustomDialog(item: CallerComponentProps<(item: Omit<CallerComponentProps, "props">) => React.ReactNode>) {
  const { props: render, ...itemWithoutProps } = item;
  return (
    <Dialog open={item.isOpen} onClose={item.handleClose()}>
      {render(itemWithoutProps)}
    </Dialog>
  );
}

export const custom = createCaller(CustomDialog);
