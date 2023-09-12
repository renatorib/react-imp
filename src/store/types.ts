export type Dialog<P = any> = {
  id: string;
  createdAt: number;
  props: P;
  Component: (props: DialogProps<P>) => JSX.Element;
};

export type DialogOptions<P = any> = { props?: P } & Omit<Dialog<P>, "id" | "createdAt" | "props">;

export type DialogProps<P = any> = Dialog<P> & {
  close: () => any;
  handleClose: (callback?: () => any) => () => any;
};
