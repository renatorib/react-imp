import { ArrayStore } from "../utils/store";
import { equal, randomStr } from "../utils/misc";

export type ItemCommonProps = {
  id: string;
  isOpen: boolean;
  channel?: string;
};

export type CallerComponent<P = any> = (props: CallerComponentProps<P>) => JSX.Element;

export type Item<P = any> = ItemCommonProps & {
  Component: CallerComponent<P>;
  props: P;
};

export type CallerComponentProps<P = any> = ItemCommonProps & {
  close: (closeTimeout?: number) => any;
  handleClose: (callback?: () => any, closeTimeout?: number) => () => any;
  props: P;
};

export type CallOptions<P = any> = {
  Component: CallerComponent<P>;
  props?: P;
  channel?: string;
};

export type CreateCallerOptions<P = any> = Omit<CallOptions<P>, "Component" | "props">;

export const impStore = new ArrayStore([] as Item[]);

let _id = 1;
const getId = () => String(++_id);
export const call = <P = any>(options: CallOptions<P>) => {
  const id = getId();
  impStore.push({
    id,
    isOpen: false,
    props: options.props ?? undefined,
    Component: options.Component,
    channel: options.channel,
  });
  requestAnimationFrame(() => impStore.update(equal("id", id), (item) => ({ ...item, isOpen: true })));
};

export const createCaller = <P = any>(Component: CallOptions<P>["Component"], options?: CreateCallerOptions<P>) => {
  return (props: P) => call({ props, Component, ...options });
};

export const hide = (id: string, removalTimeout = 500) => {
  impStore.update(equal("id", id), (item) => ({ ...item, isOpen: false }));
  setTimeout(() => impStore.remove(equal("id", id)), removalTimeout);
};
