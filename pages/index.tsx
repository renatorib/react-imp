import React from "react";

import { Imper, confirm, alert, prompt, custom } from "../src";

const onConfirm = () => console.log("Confirmed");
const onCancel = () => console.log("Canceled");
const onClose = () => console.log("Closed");
const onInput = (input: string) => console.log("Input:", input);

const myAlert = (message: string) =>
  custom({
    render: (dialog) => (
      <div>
        <div style={{ color: "red", marginBottom: 8 }}>{message}</div>
        <button onClick={dialog.close}>Ok</button>
      </div>
    ),
  });

export default function App() {
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {/* <button onClick={() => confirm({ message: "Are you sure?", onConfirm, onCancel })}>confirm</button> */}

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

        {/* <button onClick={() => prompt({ title: "Create new team", message: "What is the name of the team?", onInput })}>
                  prompt
          </button> */}

        <button onClick={() => myAlert("Custom alert!!!")}>custom</button>
      </div>

      <Imper />
    </div>
  );
}
