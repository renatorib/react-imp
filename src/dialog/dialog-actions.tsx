import React from "react";
import { styled, setup } from "goober";

setup(React.createElement);

export const DialogActions = styled("div", React.forwardRef)`
  display: flex;
  justify-content: end;
  gap: 8px;
`;
