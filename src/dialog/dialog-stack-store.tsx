import { ArrayStore } from "../utils/store";

/**
 * Global store to track stacked dialogs order.
 * E.g: Esc should close only topmost dialog when more than 1 is rendered, not all
 * so we need to know who is the topmost.
 */
export const dialogStack = new ArrayStore([] as string[]);
