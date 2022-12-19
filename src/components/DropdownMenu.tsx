import React from "react";
import { Dropdown } from "react-bootstrap";
import { DropdownMenuProps } from "react-bootstrap/esm/DropdownMenu";
import styled, { css } from "styled-components";

type MenuProps = DropdownMenuProps & {
  /**Increase menu width */
  wide?: boolean;
};

const Wrapper = styled.div<MenuProps>`
  border: none;
  border-radius: 0;
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%);
  margin-top: 0;

  ${(props) =>
    props.wide &&
    css`
      min-width: 300px;
      width: 300px;
    `}
`;

/**
 * @deprecated use react-boostrap Dropdown.Menu instead
 */
const Menu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  (props, ref) => {
    const { children, ...rest } = props;
    return (
      <Wrapper ref={ref} {...rest}>
        {children}
      </Wrapper>
    );
  }
);

Menu.displayName = "DropdownMenu";

const DropdownMenu = (props: MenuProps) => (
  <Dropdown.Menu as={Menu} {...props} />
);

export default DropdownMenu;
