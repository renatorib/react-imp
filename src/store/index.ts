import { random } from "../utils";
import { Store } from "./store";
import type { Dialog, DialogAll } from "./types";

export * from "./types";

export const store = new Store({
  dialogs: [] as Dialog[],
});

export const addDialog = (dialog: DialogAll) => {
  const createdAt = Date.now();
  const id = `${random()}.${createdAt}`;
  store.setState((state) => ({
    ...state,
    dialogs: [...state.dialogs, { id, createdAt, ...dialog }],
  }));
};

export const removeDialog = (id: string) => {
  store.setState((state) => ({
    ...state,
    dialogs: state.dialogs.filter((dialog) => dialog.id !== id),
  }));
};
