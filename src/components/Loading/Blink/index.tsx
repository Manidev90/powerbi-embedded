import styled, { keyframes } from "styled-components";
import NucleusLogo, { NucleusLogoProps } from "../../NucleusLogo";

export type BlinkPageLoadingProps = NucleusLogoProps & {
  variant: "blink";
};

const blink = keyframes`
  0% {
    opacity: 40%;
  }
  50% {
    opacity: 75%;
  }
  100% {
    opacity: 100%;
  }
`;

const BlinkPageLoading = styled(NucleusLogo)`
  cursor: wait;
  position: fixed;
  // Offset by 8px to match ReportTemplate loading screen's logo
  top: calc(50% - 8px);
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${blink} 750ms infinite alternate;
  z-index: 2;
`;

export default BlinkPageLoading;
