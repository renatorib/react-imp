type DialogCommonProps = {
  id: string;
  open: boolean;
};

type DialogComponent<P = any> = (props: DialogProps<P>) => JSX.Element;

export type DialogItem<P = any> = DialogCommonProps & {
  Component: DialogComponent<P>;
  props: P;
};

export type DialogProps<P = any> = DialogCommonProps & {
  close: () => any;
  handleClose: (callback?: () => any) => () => any;
  props: P;
};

export type DialogOptions<P = any> = {
  Component: DialogComponent<P>;
  props?: P;
};
