import React from "react";
import { Backdrop } from "./ui/backdrop";
import { Button, PrimaryButton } from "./ui/button";
import { store, addDialog, removeDialog } from "./store";
import type { Dialog, DialogOptions } from "./store";

// export const confirm = (opts: DialogOptions<"confirm">) => addDialog({ type: "confirm", ...opts });
// export const alert = (opts: DialogOptions<"alert">) => addDialog({ type: "alert", ...opts });
// export const prompt = (opts: DialogOptions<"prompt">) => addDialog({ type: "prompt", ...opts });
// export const custom = (opts: DialogOptions<"custom">) => addDialog({ type: "custom", ...opts });

export const confirm = (opts: DialogOptions<"custom">) => addDialog({ type: "custom", ...opts });
export const alert = (opts: { title?: string; message: string; onClose?: () => any }) =>
  addDialog({
    type: "custom",
    render: (dialog) => (
      <div>
        {opts.title && <ImpDialogTitle>{opts.title}</ImpDialogTitle>}
        <p>{opts.message}</p>
        <PrimaryButton onClick={dialog.close}>Ok</PrimaryButton>
      </div>
    ),
  });
export const prompt = (opts: DialogOptions<"custom">) => addDialog({ type: "custom", ...opts });
export const custom = (opts: DialogOptions<"custom">) => addDialog({ type: "custom", ...opts });

const ImpDialog = React.forwardRef<React.ComponentRef<"div">, React.ComponentProps<"div">>((props, ref) => (
  <div ref={ref} {...props} style={{ padding: 20, background: "white", borderRadius: 12 }} role="dialog" />
));

const ImpDialogTitle = React.forwardRef<React.ComponentRef<"h1">, React.ComponentProps<"h1">>((props, ref) => (
  <h1 ref={ref} {...props} style={{ margin: 0, marginBottom: 12 }} />
));

const Imp = React.forwardRef<
  React.ComponentRef<typeof ImpDialog>,
  React.ComponentProps<typeof ImpDialog> & { dialog: Dialog }
>(({ dialog, ...props }, ref) => {
  const titleId = dialog.id + "_title";

  /* if (dialog.type === "confirm") {
    return (
      <ImpDialog ref={ref} {...props} aria-labelledby={titleId}>
        <ImpDialogTitle id={titleId}>{dialog.title ?? "Confirm"}</ImpDialogTitle>
        <div style={{ marginBottom: 12 }}>{dialog.message}</div>
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <Button
            onClick={() => {
              dialog.onCancel?.();
              removeDialog(dialog.id);
            }}
          >
            Cancel
          </Button>
          <PrimaryButton
            onClick={() => {
              dialog.onConfirm();
              removeDialog(dialog.id);
            }}
          >
            Confirm
          </PrimaryButton>
        </div>
      </ImpDialog>
    );
  }

  if (dialog.type === "prompt") {
    const promptId = dialog.id + "_prompt";
    return (
      <ImpDialog ref={ref} {...props} aria-labelledby={titleId}>
        <ImpDialogTitle id={titleId}>{dialog.title ?? "Prompt"}</ImpDialogTitle>
        <div style={{ marginBottom: 12 }}>{dialog.message}</div>
        <div style={{ marginBottom: 12 }}>
          <input type="text" id={promptId} placeholder={dialog.placeholder} />
        </div>
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <Button
            onClick={() => {
              dialog.onCancel?.();
              removeDialog(dialog.id);
            }}
          >
            Cancel
          </Button>
          <PrimaryButton
            onClick={() => {
              dialog.onInput?.((document.getElementById(promptId) as HTMLInputElement).value);
              removeDialog(dialog.id);
            }}
          >
            Confirm
          </PrimaryButton>
        </div>
      </ImpDialog>
    );
  }

  if (dialog.type === "alert") {
    return (
      <ImpDialog ref={ref} {...props} aria-labelledby={titleId}>
        <ImpDialogTitle id={titleId}>{dialog.title ?? "Alert"}</ImpDialogTitle>
        <div style={{ marginBottom: 12 }}>{dialog.message}</div>
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <PrimaryButton
            onClick={() => {
              dialog.onClose?.();
              removeDialog(dialog.id);
            }}
          >
            Ok
          </PrimaryButton>
        </div>
      </ImpDialog>
    );
  } */

  if (dialog.type === "custom") {
    return (
      <ImpDialog ref={ref} {...props}>
        {dialog.render({ ...dialog, close: () => removeDialog(dialog.id) })}
      </ImpDialog>
    );
  }

  return null;
});

export const Imper = React.forwardRef<React.ComponentRef<"div">, React.ComponentProps<"div">>((props, ref) => {
  const state = store.useStore();

  if (state.dialogs.length === 0) {
    return null;
  }

  return (
    <Backdrop {...props} ref={ref}>
      {state.dialogs.map((d) => (
        <Imp key={d.id} dialog={d} />
      ))}
    </Backdrop>
  );
});
