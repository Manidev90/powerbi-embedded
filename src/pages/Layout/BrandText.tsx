import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
import SubBrandText from "./SubBrandText";
import { Link } from "react-router-dom";

const NavbarBrand = styled(Navbar.Brand)`
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  margin-right: 0;
  font-weight: bold;
`;

const BrandLink = styled.span`
  color: #fff;
  padding: 0;
  display: inline-block;
  font-size: 1.125rem;
`;

function BrandText(props: { logo: string; brandText: string }) {
  const { logo, brandText } = props;

  return (
    <NavbarBrand>
      <Nav.Link className="d-inline-block" to="/" as={Link}>
        <img className="me-3" src={logo} height="40px" alt="nucleus logo" />
        <BrandLink className="d-none d-lg-inline">{brandText}</BrandLink>
      </Nav.Link>
      <SubBrandText />
    </NavbarBrand>
  );
}

export default BrandText;
