import { useSyncExternalStore } from "react";
import mitt from "mitt";

export class Store<State extends object> {
  constructor(private state: State) {}

  emitter = mitt<{ update: State }>();

  setState(updater: State | ((state: State) => State)) {
    this.state = typeof updater === "function" ? updater(this.state) : updater;
    this.emitter.emit("update", this.state);
  }

  useStore() {
    const state = useSyncExternalStore(
      (listener) => {
        this.emitter.on("update", listener);
        return () => this.emitter.off("update", listener);
      },
      () => this.state,
      () => this.state,
    );

    return { ...state };
  }
}
