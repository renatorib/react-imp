import React from "react";
import { impStore, hide } from "./imp-store";
import type { CallerComponent, CallerComponentProps } from "./imp-store";

type ImpProps = {
  unmountTimeout?: number;
  render?: <P = any>(Component: CallerComponent<P>, props: CallerComponentProps<P>) => React.ReactNode;
  channel?: string;
};

export const Imp = (props: ImpProps) => {
  const { unmountTimeout = 500, render = (Component, props) => <Component {...props} /> } = props;
  const [dialogs] = impStore.useStore();
  const dialogsToRender = props.channel ? dialogs.filter((d) => d.channel === props.channel) : dialogs;

  return (
    <>
      {dialogsToRender.map((dialog) => {
        const { id, Component } = dialog;
        const close = (timeout = unmountTimeout) => hide(id, timeout);
        const rendered = render(Component, {
          ...dialog,
          close,
          handleClose:
            (cb, timeout = unmountTimeout) =>
            () => (cb?.(), close(timeout)),
        });
        return <>{rendered}</>;
      })}
    </>
  );
};
