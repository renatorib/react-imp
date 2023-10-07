import React from "react";
import { styled, setup } from "goober";

setup(React.createElement);

export const DialogBody = styled("div", React.forwardRef)`
  line-height: 1.33em;
  color: rgb(80, 80, 100);
`;
