import { Stack } from "react-bootstrap";
import { BsShieldLock } from "react-icons/bs";
import styled from "styled-components";

const Circle = styled.div`
  border-radius: 50%;
  background: var(--bs-gray-200);
  padding: 3.5rem;
`;

const ShieldIcon = styled(BsShieldLock)`
  width: 80px;
  height: auto;
`;

const TextWrapper = styled.div`
  text-align: center;
`;

const StyledStack = styled(Stack)`
  position: fixed;
  inset: 0;
  justify-content: center;
  align-items: center;
`;

export default function Unauthorized() {
  return (
    <StyledStack gap={3}>
      <Circle>
        <ShieldIcon />
      </Circle>
      <TextWrapper>
        <h3>Access Restricted</h3>
        <h5 className="fw-light">
          It would appear you do not have access to view this page.
        </h5>
      </TextWrapper>
    </StyledStack>
  );
}
