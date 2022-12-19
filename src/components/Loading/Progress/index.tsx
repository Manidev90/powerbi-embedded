import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import styled from "styled-components";
import NucleusLogo from "../../NucleusLogo";

export type LoadingProgressProps = {
  variant?: "overlay";
  className?: string;
  isLoaded: boolean;
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bs-body-bg);
  z-index: 1; //Below navigation bar and dropdowns
`;

const Wrapper = styled.div`
  display: inline-block;
`;

function LoadingProgress(props: LoadingProgressProps) {
  const duration = 11;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tick = 100 / duration;

    const timer = setTimeout(() => {
      setProgress(Math.min(progress + tick, 100));
    }, 1000);

    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <>
      {!props.isLoaded && (
        <Overlay className={props.className}>
          <Wrapper>
            <NucleusLogo />
            <ProgressBar animated striped now={progress} variant="accent" />
          </Wrapper>
        </Overlay>
      )}
    </>
  );
}

export default LoadingProgress;
