import { ArrayStore } from "../utils/store";
import { equal, randomStr } from "../utils/misc";
import type { DialogItem, DialogOptions } from "./types";

export * from "./types";

export const store = new ArrayStore([] as DialogItem[]);

export const call = <P = any>(dialog: DialogOptions<P>) => {
  const id = randomStr();
  store.push({ id, open: false, props: dialog.props ?? undefined, Component: dialog.Component });
  requestAnimationFrame(() => store.update(equal("id", id), (item) => ({ ...item, open: true })));
};

export const createCaller = <P = any>(Component: DialogOptions<P>["Component"]) => {
  return (props: P) => call({ props, Component });
};

export const hide = (id: string, removalTimeout = 500) => {
  store.update(equal("id", id), (item) => ({ ...item, open: false }));
  setTimeout(() => store.remove(equal("id", id)), removalTimeout);
};
