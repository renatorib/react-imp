import React from "react";
import { store, hide } from "./store";

type ImpProps = {
  unmountTimeout?: number;
};

export const Imp = (props: ImpProps) => {
  const { unmountTimeout = 500 } = props;
  const [dialogs] = store.useStore();

  return (
    <>
      {dialogs.map((dialog) => {
        const { id, Component } = dialog;
        const close = () => hide(id, unmountTimeout);
        return <Component key={id} {...dialog} close={close} handleClose={(cb) => () => (cb?.(), close())} />;
      })}
    </>
  );
};
