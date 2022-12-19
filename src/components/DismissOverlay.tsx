import { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";

type DismissOverlayProps = ComponentPropsWithoutRef<"div"> & {
  /**Controls the overlay rendering */
  show?: boolean;
};

const Overlay = styled.div`
  background: transparent;
  position: fixed;
  inset: 0;
  z-index: 1;
`;

/**
 * Full screen transparent overlay useful for temporaly blocking scrolling,
 * and handling outside clicks.
 */
export default function DismissOverlay(props: DismissOverlayProps) {
  const { show, ...rest } = props;
  return <>{show && <Overlay {...rest} />}</>;
}
