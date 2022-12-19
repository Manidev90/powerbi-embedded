import React from "react";
import styled from "styled-components";
import AccountSelection from "./AccountSelection";
import TimeframeSelection from "./TimeframeSelection";

const Container = styled.div`
  display: flex;
  background: var(--bs-white);
  justify-content: space-between;
  border: 1px solid var(--qlik-card-border-color);
  border-radius: var(--qlik-card-border-radius);
`;

function Toolbar(props: React.ComponentPropsWithoutRef<"div">) {
  // eslint-disable-next-line react/prop-types
  const { className, ...rest } = props;
  return (
    <Container className={`${className} px-3 py-2`} {...rest}>
      <AccountSelection />
      <TimeframeSelection />
    </Container>
  );
}

export default Toolbar;
