export type AlertDialog = {
  type: "alert";
  title?: string;
  message: string;
  onClose?: Function;
};

export type ConfirmDialog = {
  type: "confirm";
  title?: string;
  message: string;
  onConfirm: Function;
  onCancel?: Function;
  onClose?: Function;
};

export type PromptDialog = {
  type: "prompt";
  title?: string;
  message: string;
  placeholder?: string;
  onInput?: (input: string) => any;
  onCancel?: Function;
};

export type CustomDialog = {
  type: "custom";
  render: (props: Dialog & { close: () => any }) => React.ReactNode;
};

export type DialogAll = /* AlertDialog | ConfirmDialog | PromptDialog | */ CustomDialog;
export type DialogTypes = DialogAll["type"];
export type DialogByType<T extends DialogTypes> = Extract<DialogAll, { type: T }>;
export type DialogOptions<T extends DialogTypes> = Omit<DialogByType<T>, "type">;
export type Dialog = DialogAll & { id: string; createdAt: number };
