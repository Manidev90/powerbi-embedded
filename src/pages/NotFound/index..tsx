import { Stack } from "react-bootstrap";
import styled from "styled-components";

const TextWrapper = styled.div`
  text-align: center;
`;

const StyledStack = styled(Stack)`
  position: fixed;
  display: grid;
  inset: 0;
  place-items: center;
`;

function NotFound() {
  return (
    <StyledStack>
      <TextWrapper>
        <h1 className="fw-light text-primary">Oops! 404</h1>
        <p className="fs-6">The page you where looking for does not exist.</p>
      </TextWrapper>
    </StyledStack>
  );
}

export default NotFound;
