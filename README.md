# React Imp

Pluggable easy to use imperative dialogs.

- Accessible.
- Customizable.
- Lightweight.
- Easy to use.

## Example

1. First you need to place `<Imper />` in root of your application. If you use Next.js, it should placed in `pages/_app` (pages router) or `app/layout` (app router)

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Imper />
      </body>
    </html>
  );
}
```

2. Just call the type function from anywhere!

**Confirm**

```tsx
import { confirm } from "react-imp";

export default function Page() {
  const handleDeleteItem = () => {
    /* ... */
  };

  return <Item onDelete={() => confirm({ title: "Are you sure?", danger: true, onConfirm: handleDeleteItem })} />;
}
```

**Alert**

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

**Custom**

```tsx
import { Imper, alert } from "react-imp";

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

## Customizable

Create your own callable functions

1. Create your type function

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
    Component: function MyCustomDialog(dialog) {
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

2. Use it anywhere!

```tsx
import { agreement } from "./custom-imp";

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

## Credits

- ariakit: Dialog component inspirations
- react-hot-toast: api and store inspirations
