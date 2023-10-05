import React from "react";
import Head from "next/head";

import { Imp, alert, confirm, custom } from "../src";
import { dialogStack } from "../src/dialog";

const onConfirm = () => console.log("Confirmed");
const onCancel = () => console.log("Canceled");
const onClose = () => console.log("Closed");
// const onInput = (input: string) => console.log("Input:", input);

export default function App() {
  const [stack] = dialogStack.useStore();
  return (
    <>
      <Head>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `
              body {
                font-family: Inter, "sans-serif";
                padding: 0;
                margin: 0;
              }

              .imp-backdrop[data-animated] {
                transition: all var(--duration, 100ms) ease;
                opacity: 0;
              }
              .imp-backdrop[data-enter] {
                opacity: 100;
              }

              .imp-dialog[data-animated] {
                transition: all var(--duration, 100ms) ease;
                transform: scale(0.8) translateY(-10px);
              }
              .imp-dialog[data-enter] {
                transform: scale(1) translateY(0);
              }
              .imp-dialog[data-leave] {
                transform: scale(0.8) translateY(-10px);
              }
            `,
          }}
        />
      </Head>
      <div>
        <pre>{JSON.stringify(stack)}</pre>
      </div>
      <div style={{ height: 20000, marginTop: 150 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() =>
              alert({
                title: "Success!",
                message: "Your payment has been successfully processed. We have emailed your receipt.",
                onClose,
              })
            }
          >
            alert
          </button>

          <button
            onClick={() =>
              confirm({
                title: "Are you sure?",
                message: "This action is irreversible. You can't go back!",
                danger: true,
                onConfirm,
                onCancel,
              })
            }
          >
            confirm
          </button>

          <button
            onClick={() =>
              custom((dialog) => (
                <span>
                  <div style={{ paddingBottom: 100 }}>
                    Custom and <b>bold</b>
                  </div>
                  <button onClick={() => dialog.close()}>Close</button>
                  <button
                    onClick={() =>
                      custom((dialog) => (
                        <span>
                          Nested! <button onClick={() => dialog.close()}>Close</button>
                        </span>
                      ))
                    }
                  >
                    Nested
                  </button>
                </span>
              ))
            }
          >
            custom
          </button>
        </div>

        <Imp />
      </div>
    </>
  );
}
