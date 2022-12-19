import { Nav, NavProps } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export type ITab = {
  /** Name of the tab */
  label: string;
  /** URL it directs to*/
  to: string;
};

export interface NavTabsProps extends NavProps {
  tabList: ITab[];
}

const NavItem = styled(Nav.Item)`
  margin-right: 2rem;
  > a {
    color: #fff !important;
    font-weight: 300;
  }
  // Add an underline when the tab is active and also on hover
  > .nav-link.active {
    font-weight: 500;
  }
  > .nav-link.active,
  .nav-link:hover {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      width: 3rem;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      border-width: 0 0 2px 0;
      border-style: solid;
    }
  }
  @media only screen and (max-width: 767.5px) {
    > a {
      display: none;
    }
  }
`;

function NavTabs({ tabList, ...props }: NavTabsProps) {
  return (
    <Nav {...props}>
      {tabList.map(({ label, to }) => (
        <NavItem key={to}>
          <Nav.Link to={to} as={NavLink}>
            {label}
          </Nav.Link>
        </NavItem>
      ))}
    </Nav>
  );
}

export default NavTabs;
