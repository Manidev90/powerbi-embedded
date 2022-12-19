import { Suspense } from "react";
import { Outlet, useRoutes } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo-transparent.png";
import useToggle from "../../hooks/useToggle";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import SideMenuItems from "./SideMenuItems/index";

import Loading from "../../components/Loading";
import sidebarConfig from "../../sidebar";

const Content = styled.main`
  overflow: auto;
  background: var(--bs-body-bg-rgb);
  width: 100%;
  padding: var(--bs-content-padding-y) var(--bs-content-padding-x);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

function Layout() {
  const [isMenuOpen, toggleIsMenuOpen] = useToggle();
  const routeToMenuItem = Object.entries(sidebarConfig);

  // TODO add validation and errors to prevent common mistakes when using the configuration
  const sidemenuItemRoutes = routeToMenuItem.map(([rootPath, items]) => ({
    path: rootPath + "/*",
    element: <SideMenuItems items={items} />,
  }));

  const SideMenues = useRoutes([
    {
      element: <SideMenu isOpen={isMenuOpen} toggleIsOpen={toggleIsMenuOpen} />,
      children: sidemenuItemRoutes,
    },
  ]);

  return (
    <Wrapper>
      <Navbar
        logo={logo}
        brandText="Command Center"
        onMenuClick={toggleIsMenuOpen}
      />

      <Content>
        <Suspense fallback={<Loading variant="blink" />}>
          <Outlet />
        </Suspense>
      </Content>
      {SideMenues}
    </Wrapper>
  );
}

export default Layout;
