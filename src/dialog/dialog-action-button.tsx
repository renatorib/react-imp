import React from "react";
import { setup, styled } from "goober";

setup(React.createElement);

export const Button = styled("button", React.forwardRef)`
  transition-duration: 150ms;
  transition-timing-function: ease-out;
  transition-properties: color, background, border-color;
  will-change: color, background, border-color;

  border-radius: 4px;
  background: white;
  border: 1px solid #e4e4e4;
  font-size: 1em;
  padding: 6px 12px;

  &:hover {
    background: #e4e4e4;
  }
  &:active {
    background: #d4d4d4;
  }
`;

export const CloseButton = styled(Button, React.forwardRef)`
  border-radius: 100%;
  border-color: transparent;
  opacity: 20%;

  &:hover {
    opacity: 100%;
    background: white;
  }
  &:active {
    background: #d4d4d4;
  }
`;

export const PrimaryButton = styled(Button, React.forwardRef)`
  color: white;
  border-color: transparent;
  background: rgb(65, 105, 225);
  box-shadow: 0 3px 15px rgba(35, 60, 150, 0.25);
  &:hover {
    background: rgb(50, 80, 180);
  }
  &:active {
    background: rgb(35, 60, 150);
  }
`;

export const DangerButton = styled(Button, React.forwardRef)`
  color: white;
  border-color: transparent;
  background: rgb(220, 20, 60);
  box-shadow: 0 3px 15px rgba(160, 10, 30, 0.25);
  &:hover {
    background: rgb(195, 15, 45);
  }
  &:active {
    background: rgb(160, 10, 30);
  }
`;
