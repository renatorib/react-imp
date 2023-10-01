import React from "react";

type AnyNoFn = boolean | string | number | null | undefined | Record<string | symbol, any> | Array<any>;

export function createContext<Value extends AnyNoFn>(value?: Value) {
  const context = React.createContext(value);

  function useContext() {
    const value = React.useContext(context);
    if (!value) throw new Error("Can't use useContext outside Provider");
    return value;
  }

  return [context, useContext] as const;
}
