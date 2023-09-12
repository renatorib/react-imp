import React from "react";

export const Title = React.forwardRef<React.ComponentRef<"h1">, React.ComponentProps<"h1">>((props, ref) => (
  <h1 ref={ref} {...props} style={{ margin: 0, marginBottom: 12, fontSize: "1.4rem", ...props.style }} />
));
