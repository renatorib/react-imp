import { useSyncExternalStore } from "react";

type AnyNoFn = boolean | string | number | null | undefined | Record<string | symbol, any> | Array<any>;

export class Store<State extends AnyNoFn> {
  constructor(public state: State) {
    this.subscribe = this.subscribe.bind(this);
    this.getState = this.getState.bind(this);
    this.setState = this.setState.bind(this);
    this.useStore = this.useStore.bind(this);
  }

  private listeners = new Set<(state: State) => any>();
  private subscribe(listener: (state: State) => any) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  setState(updater: State | ((state: State) => State)) {
    this.state = typeof updater === "function" ? updater(this.state) : updater;
    this.listeners.forEach((listener) => listener(this.state));
  }

  getState() {
    return this.state;
  }

  useStore() {
    const state = useSyncExternalStore(this.subscribe, this.getState, this.getState);
    return [state, this.setState] as const;
  }
}

export class ArrayStore<T = any> extends Store<T[]> {
  push(item: T) {
    return this.setState((state) => [...state, item]);
  }
  remove(predicate: (item: T) => boolean) {
    return this.setState((state) => state.filter((item) => !predicate(item)));
  }
  update(predicate: (item: T) => boolean, updater: (item: T) => T) {
    return this.setState((state) =>
      state.map((item) => {
        if (!predicate(item)) return item;
        return updater(item);
      }),
    );
  }
}
