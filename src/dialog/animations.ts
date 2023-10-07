import { css } from "goober";

export const fade = css`
  &[data-animated] {
    transition: all var(--duration, 100ms) ease;
    opacity: 0;
  }
  &[data-enter] {
    opacity: 100;
  }
`;

export const scale = css`
  &[data-animated] {
    transition: all var(--duration, 100ms) ease;
    transform: scale(0.9);
  }
  &[data-enter] {
    transform: scale(1);
  }
`;

export const slide = css`
  &[data-animated] {
    transition: all var(--duration, 100ms) ease;
    transform: translateY(-100px);
  }
  &[data-enter] {
    transform: translateY(0);
  }
  &[data-leave] {
    transform: translateY(+100px);
  }
`;
