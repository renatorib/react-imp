import React from "react";
import { store, removeDialog } from ".";

export const ImpRenderer = () => {
  const state = store.useStore();

  const rendered = state.dialogs.map((dialog) => {
    const close = () => removeDialog(dialog.id);
    return (
      <dialog.Component
        {...dialog}
        close={close}
        handleClose={(callback) => () => {
          callback?.();
          close();
        }}
      />
    );
  });

  return <>{rendered}</>;
};
