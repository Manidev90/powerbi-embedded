import { Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import styled from "styled-components";
import { ReactComponent as HomeIcon } from "../../assets/home-alt.svg";
import siteConfig from "../../site.config";
import BrandText from "./BrandText";
import NavTabs from "./NavTabs";
import NotificationIcon from "./NotificationIcon";
import ProfileIcon from "./ProfileIcon";
import SideMenuToggle from "./SideMenu/Toggle";

interface NavbarProps {
  logo: string;
  brandText: string;
  onMenuClick: () => void;
}

const NavbarWrapper = styled(Navbar)`
  position: relative;
  padding: 0 1.875rem !important;
  z-index: 2;
`;

const NavbarToggle = styled(Navbar.Toggle)``;

const IconStack = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  align-self: stretch;
  // Icons dimensions
  svg {
    height: 24px;
    color: var(--bs-secondary);
    stroke: var(--bs-secondary);
  }
  // Leave enough padding for hover background on all buttons
  button,
  [role="button"] {
    padding-inline: 0.5rem;
  }
`;

function HomeButton() {
  return (
    <Button
      as="a"
      href="https://nucleus.portal.nttdataservices.com/"
      title="Home"
      variant="accent"
    >
      <HomeIcon title="Home" />
    </Button>
  );
}

function MainNavbar(props: NavbarProps) {
  const { logo, brandText, onMenuClick } = props;
  const { headerLinks } = siteConfig;

  return (
    <header>
      <NavbarWrapper bg="accent" expand="md" variant="dark">
        <NavbarToggle
          className="me-1"
          id="navbar-toggler"
          aria-labelledby="nav-title"
        />
        <BrandText logo={logo} brandText={brandText} />
        <NavTabs className="align-items-center mx-auto" tabList={headerLinks} />
        <IconStack>
          <NotificationIcon />
          <ProfileIcon />
          <HomeButton />
          <SideMenuToggle onClick={onMenuClick} />
        </IconStack>
        {/* <NavBarSideAccordion onMenuClick={onMenuClick} /> */}
      </NavbarWrapper>
    </header>
  );
}

export default MainNavbar;
