import React from "react";

import { ImpRenderer, alert, confirm } from "../src";

const onConfirm = () => console.log("Confirmed");
const onCancel = () => console.log("Canceled");
const onClose = () => console.log("Closed");
// const onInput = (input: string) => console.log("Input:", input);

export default function App() {
  return (
    <div style={{ fontFamily: "sans-serif" }}>
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
      </div>

      <ImpRenderer />
    </div>
  );
}
