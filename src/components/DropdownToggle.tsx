import React from "react";
import { Button, ButtonProps, Dropdown } from "react-bootstrap";
import { DropdownToggleProps } from "react-bootstrap/esm/DropdownToggle";
import { MdOutlineKeyboardArrowDown as Caret } from "react-icons/md";
import styled from "styled-components";

const ToggleButton = styled(Button)`
  svg:last-child {
    margin-left: 0.5rem;
    transition: transform 250ms ease;
  }
  &[aria-expanded="true"] {
    svg:last-child {
      transform: rotate(180deg);
    }
  }
`;

const Toggle = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { children, ...rest } = props;
    return (
      <ToggleButton ref={ref} {...rest}>
        {children}
        <Caret />
      </ToggleButton>
    );
  }
);

Toggle.displayName = "Toggle";

const DropdownToggle = (props: DropdownToggleProps) => {
  return <Dropdown.Toggle {...props} as={Toggle} />;
};

export default DropdownToggle;
