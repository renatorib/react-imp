import React from "react";
import { canUseDOM } from "./dom";

export const useSafeLayoutEffect = canUseDOM() ? React.useLayoutEffect : React.useEffect;

export function afterTimeout(timeoutMs: number, cb?: () => void) {
  const timeoutId = setTimeout(() => cb?.(), timeoutMs);
  return () => clearTimeout(timeoutId);
}

export function afterPaint(cb: () => void) {
  let raf = requestAnimationFrame(() => {
    raf = requestAnimationFrame(cb);
  });
  return () => cancelAnimationFrame(raf);
}

export function documentListener<T extends keyof DocumentEventMap>(
  event: T | T[],
  handler: (ev: DocumentEventMap[T]) => any,
) {
  const events = [event].flat() as T[];
  events.forEach((ev) => document.addEventListener(ev, handler));
  return () => {
    events.forEach((ev) => document.removeEventListener(ev, handler));
  };
}
