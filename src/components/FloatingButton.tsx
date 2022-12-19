import cn from "classnames";
import { Button, ButtonProps } from "react-bootstrap";
import { IconType } from "react-icons";
import styled from "styled-components";

interface FloatingButtonProps extends ButtonProps {
  Icon: IconType;
}

const ButtonWithIcon = styled(Button)`
  position: fixed;
  right: 30px;
  bottom: 30px;
  border-radius: 50%;

  > svg {
    width: 24px;
    height: 24px;
  }
`;

/**
 * Iconed Material design based floating action button with text
 */
function FloatingButton(props: FloatingButtonProps) {
  const { Icon, className, ...rest } = props;
  const buttonClass = cn("shadow p-3", className);

  return (
    <ButtonWithIcon className={buttonClass} variant="accent" {...rest}>
      <Icon />
    </ButtonWithIcon>
  );
}

export default FloatingButton;
