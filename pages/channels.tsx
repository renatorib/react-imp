import React from "react";

import { Imp, CallerComponentProps, createCaller, impStore } from "../src";

function Test(item: CallerComponentProps<string>) {
  return (
    <div>
      <span>{item.props}</span>
      <button onClick={() => item.close(0)}>x</button>
    </div>
  );
}

const channelA = createCaller(Test, { channel: "A" });
const channelB = createCaller(Test, { channel: "B" });

export default function App() {
  const [items] = impStore.useStore();
  return (
    <>
      <div style={{ height: 20000, marginTop: 150 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => channelA("Test on channel A")}>Channel A</button>
        </div>
        <Imp
          channel="A"
          render={(Component, props) => (
            <div style={{ color: "blue" }}>
              <Component {...props} />
            </div>
          )}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => channelB("Test on channel B")}>Channel B</button>
        </div>
        <Imp
          channel="B"
          render={(Component, props) => (
            <div style={{ color: "green" }}>
              <Component {...props} />
            </div>
          )}
        />
        <pre>{JSON.stringify(items, null, 2)}</pre>
      </div>
    </>
  );
}
