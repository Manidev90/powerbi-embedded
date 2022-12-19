import React from "react";
import Media from "./Media";

/**
 * Defines bootstrap-based layout breakpoints
 *
 * @see {@link https://react-bootstrap.github.io/layout/breakpoints/breakpoints Bootstrap Docs}
 */
export const breakpoints: Record<string, number> = {
  xsmall: 0,
  small: 576,
  medium: 768,
  large: 992,
  xlarge: 1200,
  xxlarge: 1400,
};

interface BreakpointBaseProps {
  children?: React.ReactNode;
  [key: string]: number | React.ReactNode;
}

interface BreakpointUpProps extends BreakpointBaseProps {
  /** Match a screen width greater or equal to the breakpoint*/
  up: boolean;
  down?: never;
}
interface BreakpointDownProps extends BreakpointBaseProps {
  up?: never;
  /** Match a screen width strictly smaller than the breakpoint*/
  down: boolean;
}

export function Breakpoint(props: BreakpointUpProps | BreakpointDownProps) {
  const rule = props.up ? "min-width" : "max-width";
  let breakpoint: number | undefined;

  for (const key of Object.keys(props)) {
    if (key in breakpoints) {
      breakpoint = breakpoints[key];
      break;
    }
  }

  if (breakpoint === undefined) {
    console.error(
      "Invalid breakpoint: the provided breakpoint is not defined."
    );
    return <></>;
  }

  if (props.down) {
    // We don't want to include the same breakpoint for both up and down
    // or they would render together
    --breakpoint;
  }

  const query = `(${rule}: ${breakpoint}px)`;
  return <Media query={query}>{props.children}</Media>;
}

export default Breakpoint;
