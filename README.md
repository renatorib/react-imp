# React Imp

Pluggable easy to use imperative dialogs/callouts.

- Accessible.
- Customizable.
- Lightweight.
- Easy to use.

## Getting Started

1. First you need to place `<Imp />` in root of your application.

_If you use Next.js, it should placed in `pages/_app` (pages router) or `app/layout` (app router)_

```tsx
import { Imp } from "react-imp";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Imp />
      </body>
    </html>
  );
}
```

2. Just call the caller function from anywhere!

**confirm**

```tsx
import { confirm } from "react-imp";

export default function Page() {
  const handleDeleteItem = () => {
    /* ... */
  };

  return <Item onDelete={() => confirm({ title: "Are you sure?", danger: true, onConfirm: handleDeleteItem })} />;
}
```

**alert**

```tsx
import { alert } from "react-imp";

export default function Page() {
  return (
    <Payment
      onSuccess={() =>
        alert({
          title: "Success!",
          message: "Your payment has been successfully processed. We have emailed your receipt.",
        })
      }
    />
  );
}
```

**custom**

```tsx
import { custom } from "react-imp";

export default function Page() {
  return (
    <button
      onClick={() =>
        custom((item) => (
          <span>
            Custom and <b>bold</b>
            <button onClick={() item.close()}>Close</button>
          </span>
        ))
      }
    >
      custom
    </button>
  );
}
```

## Headless

You can create your fully customizable imperative dialog with your own props, rules and UI. You can even use the Dialog component from your favorite lib.
See below an example using MUI dialog:

First, create your caller function with `createCaller(Component)`

```tsx
import { createCaller } from "react-imp/headless";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const agreement = createCaller<{
  title: string;
  message: string;
  onAgree: () => any;
  onDisagree?: () => any;
}>((item) => (
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
));
```

You can also separate the Component if you intend to build something reusable:

```tsx
import { createCaller, CallerComponentProps } from "react-imp";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function AgreementDialog(
  item: CallerComponentProps<{
    title: string;
    message: string;
    onAgree: () => any;
    onDisagree?: () => any;
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

// prop types inferred from AgreementDialog!
export const agreement = createCaller(AgreementDialog);
```

Then use it anywhere!

```tsx
import { agreement } from "../anywhere/in/my/app";

export default function Page() {
  function request() {
    agreement({
      title: "Use Google's location service?",
      message:
        "Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.",
      onAgree: () => console.log("Request approved"),
    });
  }

  return <button onClick={request}>Request location</button>;
}
```

## Custom Render

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
