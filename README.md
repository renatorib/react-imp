# React Imp

Pluggable easy to use imperative dialogs/callouts.

- Accessible.
- Customizable.
- Lightweight.
- Easy to use.

<p align="center">
  <img src="./assets/react-imp-example.gif" />
</p>

## Getting Started

Install

```
yarn add react-imp
```

Basic usage

```tsx
import { Imp, confirm } from "react-imp";

export default function App() {
  const handleDeleteItem = () => api.deleteItem();

  return (
    <div>
      <Item
        onDelete={() =>
          confirm({
            title: "Are you sure?",
            message: "This action is irreversible. You can't go back!",
            danger: true,
            onConfirm: handleDeleteItem,
          })
        }
      />
      <Imp />
    </div>
  );
}
```

Creating reusable guards

```tsx
import { confirm } from "react-imp";

export const areYouSure = (cb: () => any) => () =>
  confirm({
    title: "Are you sure?",
    message: "This action is irreversible. You can't go back!",
    danger: true,
    onConfirm: cb,
  });
```

```tsx
import { Imp } from "react-imp";
import { areYouSure } from "../imp-guards";

export default function App() {
  const handleDeleteItem = () => api.deleteItem();

  return (
    <div>
      <Item onDelete={areYouSure(handleDeleteItem)} />
      <Imp />
    </div>
  );
}
```

## Built-in callers

```tsx
import { confirm, alert, custom } from "react-imp";
```

### confirm

> types

```tsx
const confirm: (props: {
  title?: string | undefined;
  danger?: boolean | undefined;
  message?: string | undefined;
  onConfirm: () => any;
  onCancel?: (() => any) | undefined;
  onClose?: (() => any) | undefined;
}) => void;
```

> example

```tsx
confirm({
  title: "Are you sure?",
  message: "This action is irreversible. You can't go back!",
  danger: true,
  onConfirm: () => console.log("Confirmed"),
  onCancel: () => console.log("Canceled"),
  onClose: () => console.log("Closed"),
});
```

### alert

```tsx
import { alert } from "react-imp";
```

> types

```tsx
const alert: (props: {
  title?: string | undefined;
  message?: string | undefined;
  onClose?: (() => any) | undefined;
}) => void;
```

> example

```tsx
alert({
  title: "Success!",
  message: "Your payment has been successfully processed. We have emailed your receipt.",
  onClose: () => console.log("Closed"),
});
```

### custom

> types

```tsx
const custom: (props: (item: Omit<CallerComponentProps, "props">) => React.ReactNode) => void;
```

> example

```tsx
custom((item) => (
  <span>
    <div>
      Custom and <b>bold</b>
    </div>
    <button onClick={() => item.close()}>Close</button>
  </span>
));
```

## Create your callers

You can implement your own callers, with your own props and UI.  
Below is an example of how you can implement your version of the alert and confirm.

```tsx
import { createCaller } from "react-imp";
import {
  Dialog,
  DialogDismiss,
  DialogTitle,
  DialogActions,
  DialogBody,
  Button,
  PrimaryButton,
  DangerButton,
} from "react-imp/dialog";

export const alert = createCaller<{
  title?: string;
  message?: string;
  onClose?: () => any;
}>((item) => (
  <Dialog open={item.isOpen} onClose={item.handleClose(onClose)}>
    <DialogDismiss />
    {item.props.title && <DialogTitle>{item.props.title}</DialogTitle>}
    {item.props.message && <DialogBody>{item.props.message}</DialogBody>}
    <DialogActions>
      <PrimaryButton onClick={item.handleClose(onClose)}>Ok</PrimaryButton>
    </DialogActions>
  </Dialog>
));

export const confirm = createCaller<{
  title?: string;
  message?: string;
  danger?: boolean;
  onConfirm?: () => any;
  onCancel?: () => any;
  onClose?: () => any;
}>((item) => (
  <Dialog open={item.isOpen} onClose={item.handleClose(item.props.onClose)}>
    <DialogDismiss />
    {item.props.title && <DialogTitle>{item.props.title}</DialogTitle>}
    {item.props.message && <DialogBody>{item.props.message}</DialogBody>}
    <DialogActions>
      <Button onClick={item.handleClose(item.props.onCancel)}>Cancel</Button>
      {item.props.danger ? (
        <DangerButton onClick={item.handleClose(item.props.onConfirm)}>Confirm</DangerButton>
      ) : (
        <PrimaryButton onClick={item.handleClose(item.props.onConfirm)}>Confirm</PrimaryButton>
      )}
    </DialogActions>
  </Dialog>
));
```

You can also separate the Component if you intend to build something reusable:

```tsx
import { createCaller, CallerComponentProps } from "react-imp";
import { Dialog /*, ... */ } from "react-imp/dialog";

function AlertDialog(
  item: CallerComponentProps<{
    title?: string;
    message?: string;
    onClose?: () => any;
  }>,
) {
  return (
    <Dialog open={item.isOpen} onClose={() => item.close()}>
      <DialogTitle>{item.props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{item.props.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={item.handleClose(item.props.onDisagree)}>Disagree</Button>
        <Button onClick={item.handleClose(item.props.onAgree)} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// prop types inferred from AlertDialog!
export const alert = createCaller(AlertDialog);
//           ^? const alert: (props: {
//                title?: string | undefined;
//                message?: string | undefined;
//                onClose?: (() => any) | undefined;
//              }) => void
```

## Headless

If you are already using a UI library with a Dialog component, you can create your own callers using it instead of using ours.  
By importing from `react-imp/headless` you also reduce the bundle size by avoiding react-imp UI dependencies.

See below an example creating a caller with MUI.

```tsx
import { createCaller } from "react-imp/headless";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const alert = createCaller<{
  title: string;
  message: string;
  onClose?: () => any;
}>((item) => (
  <Dialog open={item.isOpen} onClose={() => item.close()}>
    {item.props.title && <DialogTitle>{item.props.title}</DialogTitle>}
    {item.props.message && (
      <DialogContent>
        <DialogContentText>{item.props.message}</DialogContentText>
      </DialogContent>
    )}
    <DialogActions>
      <Button onClick={item.handleClose(item.props.onClose)}>Ok</Button>
    </DialogActions>
  </Dialog>
));
```

## Custom render

You can customize the caller render if you want to.  
The default render is `(Component, props) => <Component {...props} />`

```tsx
import { Imp } from "react-imp";

export function App() {
  return (
    <>
      <Imp
        render={(Component, props) => (
          <CustomWrapper>
            <Component {...props} />
          </CustomWrapper>
        )}
      />
    </>
  );
}
```

## Channels

You can create different channels with different renderers to your callers.

```tsx
import { Imp, createCaller } from "react-imp";

function Toast(props) {}
function Dialog(props) {}

const toast = createCaller(Toast, { channel: "toasts" });
const confirm = createCaller(Dialog, { channel: "dialogs" });

export function App() {
  return (
    <>
      <Imp channel="toasts" />
      <Imp channel="dialogs" />
    </>
  );
}
```

# Acknowledgement

Some inspirations for the project were:

- [react-hot-toast](https://react-hot-toast.com/): Inspired me by their API simplicity.
- [Ariakit](https://ariakit.org/): Learned a lot from Ariakit to build the Dialog component and all its a11y concerns.

# Author

© renatorib, Released under the MIT License.

> [Website](https://rena.to) · [GitHub @reantorib](https://github.com/renatorib) · [Twitter @renatoribz](https://twitter.com/renatoribz)
