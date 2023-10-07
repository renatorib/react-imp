import React from "react";
import { createPortal } from "react-dom";

export function Portal({ children, container }: { container?: HTMLElement; children?: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(children, container ?? document.body);
}
