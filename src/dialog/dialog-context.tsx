import { createContext } from "../utils/context";

type DataProps = {
  [k: `data-${string}`]: boolean | string | undefined;
};

export const [DialogContext, useDialogContext] = createContext<{
  id: string;
  open: boolean;
  onClose: () => void;

  stackIndex: number;
  isTopmost: boolean;
  isBottommost: boolean;

  scrollOn: "backdrop" | "dialog";
  animated: boolean;
  duration: number;
}>();
