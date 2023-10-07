import React from "react";
import { styled, setup } from "goober";

setup(React.createElement);

export const DialogTitle = styled("h1", React.forwardRef)`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: rgb(30, 30, 70);
`;
