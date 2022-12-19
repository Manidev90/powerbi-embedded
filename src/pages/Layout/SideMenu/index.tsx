import React, { useRef } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import DismissOverlay from "../../../components/DismissOverlay";

const SIDEBAR_WIDTH = "300px";

export type SidebarProps = {
  /**Current visibility of the sidebar */
  isOpen?: boolean;
  /**Toggle function that toggles isOpen ON and OFF.
   * This is necessary for the sidebar to close itself when the user clicks outside of it.* */
  toggleIsOpen: () => void;
};

type WrapperProps = {
  $isOpen?: boolean;
};

const SideMenu = styled(Navbar)<WrapperProps>`
  --sidemenu-level-indentation: 1.25em; // Every item is positioned at indentation * level
  position: fixed;
  top: 4rem;
  right: -${SIDEBAR_WIDTH}; // Position sidebar off the screen
  bottom: 0;
  width: ${SIDEBAR_WIDTH};
  z-index: 2;
  transition: transform 0.5s cubic-bezier(0, 0, 0.2, 1);

  // Slide in when the sidebar is open
  ${(props) =>
    props.$isOpen &&
    css`
      transform: translateX(-${SIDEBAR_WIDTH});
    `}

  background: var(--bs-white);
  padding: 0 !important;
  min-height: 100%;
  margin-top: -4px;
  box-shadow: 1px 7px 7px 1px #c3c3c3;
  overflow: auto;
  align-items: flex-start;
`;

const Dismiss = styled(DismissOverlay)`
  z-index: 2;
`;

function Sidebar({ isOpen, toggleIsOpen }: SidebarProps) {
  const sideMenuRef = useRef<HTMLDivElement>(null);

  const handleLinkClicked = (event: React.MouseEvent<HTMLElement>) => {
    if (!isOpen) {
      // Somehow a link was clicked with the sidebar closed...
      return;
    }

    const element = event.target;
    if (element instanceof HTMLElement && element.matches("a")) {
      toggleIsOpen();
    }
  };

  return (
    <>
      <Dismiss show={isOpen} onClick={toggleIsOpen} />
      <SideMenu
        variant="light"
        ref={sideMenuRef}
        $isOpen={isOpen}
        onClick={handleLinkClicked}
      >
        <Container fluid className="gx-0">
          <Nav className="flex-column w-100">
            <Outlet />
          </Nav>
        </Container>
      </SideMenu>
    </>
  );
}

export default Sidebar;
