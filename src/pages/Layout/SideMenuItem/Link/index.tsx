import { Nav } from "react-bootstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Link } from "sidebar-config";
import styled, { css } from "styled-components";

export type SideMenuLinkProps = Link & {
  level: number;
};

export const NavLink = styled(Nav.Link)`
  ${({ $level }) => css`
    --level: ${$level};
    --bs-navbar-nav-link-padding-x: calc(
      var(--level) * var(--sidemenu-level-indentation)
    );
  `}
  padding-block: 0.625em;
`;

function SideMenuLink(props: SideMenuLinkProps) {
  const { href, level } = props;
  return (
    <NavLink forwardedAs={RouterNavLink} to={href} end $level={level}>
      {props.label}
    </NavLink>
  );
}

export default SideMenuLink;
