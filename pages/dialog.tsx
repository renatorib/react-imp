import React from "react";

import {
  Dialog,
  DialogBody,
  DialogActions,
  PrimaryButton,
  Button,
  DialogDismiss,
  DialogTitle,
  dialogStack,
  DangerButton,
} from "../src/dialog";

export default function App() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [stack] = dialogStack.useStore();

  return (
    <>
      <div style={{ height: 50 }}>
        <header
          style={{ position: "sticky", inset: 0, height: 50, width: "100%", background: "black", color: "white" }}
        >
          <div style={{ maxWidth: 800, margin: "0 auto", padding: 15 }}>Fixed Header</div>
        </header>
      </div>

      <div style={{ height: 20000, padding: 10 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "start", gap: 8 }}>
          <button onClick={() => setOpen(true)}>open 1</button>
          <button onClick={() => setOpen2(true)}>open 2</button>
          <button
            onClick={() => {
              setOpen(true);
              setOpen2(true);
            }}
          >
            open 1 then 2
          </button>
          <button
            onClick={() => {
              setOpen2(true);
              requestAnimationFrame(() => setOpen(true));
            }}
          >
            open 2 then 1
          </button>
          <button onClick={() => setOpen3(true)}>3: scroll on backdrop</button>
          <button onClick={() => setOpen4(true)}>4: scroll on dialog</button>

          {state(false, ([open, setOpen]) => (
            <>
              <button onClick={() => setOpen(true)}>buttons</button>
              <Dialog open={open} onClose={() => setOpen(false)} animation={false}>
                <DialogDismiss />
                <DialogTitle>Labore, beatae fugit</DialogTitle>

                <DialogBody>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, beatae fugit natus nihil facere sit
                  laborum maiores quam deleniti neque iure vitae saepe ipsam optio.
                </DialogBody>

                <DialogActions>
                  <Button onClick={() => setOpen(true)}>Button</Button>
                  <PrimaryButton onClick={() => setOpen(true)}>PrimaryButton</PrimaryButton>
                  <DangerButton onClick={() => setOpen(true)}>DangerButton</DangerButton>
                </DialogActions>
              </Dialog>
            </>
          ))}

          {state(false, ([open, setOpen]) => (
            <>
              <button onClick={() => setOpen(true)}>no animation/transition</button>
              <DemoDialog open={open} onClose={() => setOpen(false)} animation={false} />
            </>
          ))}

          {state(false, ([open, setOpen]) => (
            <>
              <button onClick={() => setOpen(true)}>animation=fade</button>
              <DemoDialog open={open} onClose={() => setOpen(false)} animation="fade" />
            </>
          ))}

          {state(false, ([open, setOpen]) => (
            <>
              <button onClick={() => setOpen(true)}>animation=slide</button>
              <DemoDialog open={open} onClose={() => setOpen(false)} animation="slide" />
            </>
          ))}

          {state(false, ([open, setOpen]) => (
            <>
              <button onClick={() => setOpen(true)}>animation=slide duration=500</button>
              <DemoDialog open={open} onClose={() => setOpen(false)} animation="slide" duration={500} />
            </>
          ))}
        </div>
        <div>
          <pre>{JSON.stringify(stack)}</pre>
        </div>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogDismiss />
        <DialogTitle>Dialog 1</DialogTitle>

        <DialogBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, beatae fugit natus nihil facere sit laborum
          maiores quam deleniti neque iure vitae saepe ipsam optio eos dolorem consectetur quas. Vel?
        </DialogBody>

        <DialogBody>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus commodi fugiat debitis, non dolor
          deserunt fugit itaque minima, sunt odit dolorem porro totam voluptas consequuntur, maiores sequi ducimus
          omnis. Sed. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos amet vitae molestiae sint rerum
          corporis doloremque officiis, hic consectetur maiores illo iure! Impedit accusamus magnam, recusandae numquam
          deserunt laborum veritatis!
        </DialogBody>

        <DialogActions>
          <Button onClick={() => setOpen2(true)}>Nested dialog 2</Button>
          <PrimaryButton onClick={() => setOpen(false)}>Ok</PrimaryButton>
        </DialogActions>
      </Dialog>

      <Dialog open={open2} onClose={() => setOpen2(false)}>
        <DialogDismiss />
        <DialogTitle>Dialog 2</DialogTitle>

        <DialogBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, beatae fugit natus nihil facere sit laborum
          maiores quam deleniti neque iure vitae saepe ipsam optio eos dolorem consectetur quas. Vel?
        </DialogBody>

        <DialogActions>
          <PrimaryButton data-autofocus onClick={() => setOpen2(false)}>
            Ok
          </PrimaryButton>
        </DialogActions>
      </Dialog>

      <Dialog open={open3} onClose={() => setOpen3(false)}>
        <DialogDismiss />
        <DialogTitle>Dialog 3</DialogTitle>

        <DialogBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, beatae fugit natus nihil facere sit laborum
          maiores quam deleniti neque iure vitae saepe ipsam optio eos dolorem consectetur quas. Vel? Lorem ipsum, dolor
          sit amet consectetur adipisicing elit. Quidem sint impedit quisquam labore! Nihil facere at, accusamus ipsum
          odit inventore ab maiores, neque commodi, perferendis doloremque nobis debitis? Cupiditate, recusandae. Lorem
          ipsum, dolor sit amet consectetur adipisicing elit.
        </DialogBody>

        <DialogBody>
          Blanditiis quasi quisquam, dicta corporis ad ullam eveniet quas adipisci, autem deleniti dolores itaque omnis
          ea illum fugit cumque voluptatibus consectetur non. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Minima, odio quae. Possimus repellat aperiam consequuntur voluptatum cumque aliquid corporis, placeat, illum
          laborum accusantium architecto ducimus? Fugit tempore aut possimus consequuntur! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Iste porro tempora deleniti? Distinctio consectetur quasi dicta, pariatur
          debitis odit consequatur earum laborum quae quidem quis animi, officia repudiandae magni repellendus.
        </DialogBody>

        <DialogBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, beatae fugit natus nihil facere sit laborum
          maiores quam deleniti neque iure vitae saepe ipsam optio eos dolorem consectetur quas. Vel? Lorem ipsum, dolor
          sit amet consectetur adipisicing elit. Quidem sint impedit quisquam labore! Nihil facere at, accusamus ipsum
          odit inventore ab maiores, neque commodi, perferendis doloremque nobis debitis? Cupiditate, recusandae. Lorem
          ipsum, dolor sit amet consectetur adipisicing elit.
        </DialogBody>

        <DialogBody>
          Blanditiis quasi quisquam, dicta corporis ad ullam eveniet quas adipisci, autem deleniti dolores itaque omnis
          ea illum fugit cumque voluptatibus consectetur non. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Minima, odio quae. Possimus repellat aperiam consequuntur voluptatum cumque aliquid corporis, placeat, illum
          laborum accusantium architecto ducimus? Fugit tempore aut possimus consequuntur! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Iste porro tempora deleniti? Distinctio consectetur quasi dicta, pariatur
          debitis odit consequatur earum laborum quae quidem quis animi, officia repudiandae magni repellendus.
        </DialogBody>

        <DialogActions>
          <PrimaryButton onClick={() => setOpen3(false)}>Ok</PrimaryButton>
        </DialogActions>
      </Dialog>

      <Dialog open={open4} onClose={() => setOpen4(false)} scrollOn="dialog">
        <DialogDismiss />
        <DialogTitle>Dialog 4</DialogTitle>

        <DialogBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, beatae fugit natus nihil facere sit laborum
          maiores quam deleniti neque iure vitae saepe ipsam optio eos dolorem consectetur quas. Vel? Lorem ipsum, dolor
          sit amet consectetur adipisicing elit. Quidem sint impedit quisquam labore! Nihil facere at, accusamus ipsum
          odit inventore ab maiores, neque commodi, perferendis doloremque nobis debitis? Cupiditate, recusandae. Lorem
          ipsum, dolor sit amet consectetur adipisicing elit.
        </DialogBody>

        <DialogBody>
          Blanditiis quasi quisquam, dicta corporis ad ullam eveniet quas adipisci, autem deleniti dolores itaque omnis
          ea illum fugit cumque voluptatibus consectetur non. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Minima, odio quae. Possimus repellat aperiam consequuntur voluptatum cumque aliquid corporis, placeat, illum
          laborum accusantium architecto ducimus? Fugit tempore aut possimus consequuntur! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Iste porro tempora deleniti? Distinctio consectetur quasi dicta, pariatur
          debitis odit consequatur earum laborum quae quidem quis animi, officia repudiandae magni repellendus.
        </DialogBody>

        <DialogBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, beatae fugit natus nihil facere sit laborum
          maiores quam deleniti neque iure vitae saepe ipsam optio eos dolorem consectetur quas. Vel? Lorem ipsum, dolor
          sit amet consectetur adipisicing elit. Quidem sint impedit quisquam labore! Nihil facere at, accusamus ipsum
          odit inventore ab maiores, neque commodi, perferendis doloremque nobis debitis? Cupiditate, recusandae. Lorem
          ipsum, dolor sit amet consectetur adipisicing elit.
        </DialogBody>

        <DialogBody>
          Blanditiis quasi quisquam, dicta corporis ad ullam eveniet quas adipisci, autem deleniti dolores itaque omnis
          ea illum fugit cumque voluptatibus consectetur non. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Minima, odio quae. Possimus repellat aperiam consequuntur voluptatum cumque aliquid corporis, placeat, illum
          laborum accusantium architecto ducimus? Fugit tempore aut possimus consequuntur! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Iste porro tempora deleniti? Distinctio consectetur quasi dicta, pariatur
          debitis odit consequatur earum laborum quae quidem quis animi, officia repudiandae magni repellendus.
        </DialogBody>

        <DialogActions>
          <PrimaryButton onClick={() => setOpen4(false)}>Ok</PrimaryButton>
        </DialogActions>
      </Dialog>

      <Dialog open={open5} onClose={() => setOpen5(false)}>
        <DialogDismiss />
        <DialogTitle>Dialog 5</DialogTitle>

        <DialogBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, beatae fugit natus nihil facere sit laborum
          maiores quam deleniti neque iure vitae saepe ipsam optio.
        </DialogBody>

        <DialogActions>
          <PrimaryButton onClick={() => setOpen5(false)}>Ok</PrimaryButton>
        </DialogActions>
      </Dialog>

      <Dialog open={open5} onClose={() => setOpen5(false)}>
        <DialogDismiss />
        <DialogTitle>Dialog 5</DialogTitle>

        <DialogBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, beatae fugit natus nihil facere sit laborum
          maiores quam deleniti neque iure vitae saepe ipsam optio.
        </DialogBody>

        <DialogActions>
          <PrimaryButton onClick={() => setOpen5(false)}>Ok</PrimaryButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

function DemoDialog(props: React.ComponentProps<typeof Dialog>) {
  return (
    <Dialog {...props}>
      <DialogDismiss />
      <DialogTitle>Labore, beatae fugit</DialogTitle>

      <DialogBody>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, beatae fugit natus nihil facere sit laborum
        maiores quam deleniti neque iure vitae saepe ipsam optio.
      </DialogBody>

      <DialogActions>
        <PrimaryButton onClick={props.onClose}>Ok</PrimaryButton>
      </DialogActions>
    </Dialog>
  );
}

function state<T>(initial: T, fn: (s: [T, React.Dispatch<React.SetStateAction<T>>]) => React.ReactNode) {
  return fn(React.useState<T>(initial));
}
