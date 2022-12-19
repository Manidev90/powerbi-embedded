import { Nav, NavLinkProps } from "react-bootstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import styled from "styled-components";

const NavLink = styled((props: NavLinkProps) => (
  <Nav.Link as={RouterNavLink} {...props} />
))``;

export default NavLink;
