import { Store } from "./store";
import type { Dialog, DialogOptions } from "./types";

export * from "./types";

export const store = new Store({
  dialogs: [] as Dialog[],
});

const random = (len = 5) => (Math.random() * Math.pow(10, len)).toFixed(0);
export const dialog = <P = any>(dialog: DialogOptions<P>) => {
  const createdAt = Date.now();
  const id = `${random()}.${createdAt}`;
  store.setState((state) => ({
    ...state,
    dialogs: [...state.dialogs, { id, createdAt, props: dialog.props ?? null, ...dialog }],
  }));
};

export const removeDialog = (id: string) => {
  store.setState((state) => ({
    ...state,
    dialogs: state.dialogs.filter((dialog) => dialog.id !== id),
  }));
};
