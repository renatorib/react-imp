# React Imp

Pluggable easy to use imperative dialogs.

- Accessible.
- Customizable.
- Lightweight.
- Easy to use.

## Getting Started

1. First you need to place `<ImpRenderer />` in root of your application.

_If you use Next.js, it should placed in `pages/_app` (pages router) or `app/layout` (app router)_

```tsx
import { ImpRenderer } from "react-imp";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ImpRenderer />
      </body>
    </html>
  );
}
```

2. Just call the type function from anywhere!

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
        custom((dialog) => (
          <span>
            Custom and <b>bold</b>
            <button onClick={dialog.close}>Close</button>
          </span>
        ))
      }
    >
      custom
    </button>
  );
}
```

## Customization

You can create your fully customizable imperative dialog with your own props, rules and UI. You can even use the Dialog component from your favorite lib.
See below an example using MUI dialog:

First, create your type function with `dialog({ props, Component })`

```tsx
import { dialog } from "react-imp";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const agreement = (props: { title: string; message: string; onAgree: () => any; onDisagree?: () => any }) =>
  dialog({
    props,
    Component: function AgreementDialog(dialog) {
      return (
        <Dialog open={true} onClose={dialog.close}>
          <DialogTitle>{dialog.props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialog.props.message}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={dialog.handleClose(dialog.props.onDisagree)}>Disagree</Button>
            <Button onClick={dialog.handleClose(dialog.props.onAgree)} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      );
    },
  });
```

You can also separate the Component if you intend to build something reusable:

```tsx
// imports

type AgreementProps = {
  title: string;
  message: string;
  onAgree: () => any;
  onDisagree?: () => any;
};

function AgreementDialog(dialog: DialogProps<AgreementProps>) {
  return /* Dialog UI */;
}

export const agreement = (props: AgreementProps) => dialog({ props, Component: AgreementDialog });
```

Then, use it anywhere!

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

# Acknowledgement

Some inspirations for the project were:

- [react-hot-toast](https://react-hot-toast.com/) - api simplicity and store inspirations.
- [Ariakit](https://ariakit.org/): Dialog component and dialog a11y inspirations.

# Author

© renatorib, Released under the MIT License.

> [Website](https://rena.to) · [GitHub @reantorib](https://github.com/renatorib) · [Twitter @renatoribz](https://twitter.com/renatoribz)
