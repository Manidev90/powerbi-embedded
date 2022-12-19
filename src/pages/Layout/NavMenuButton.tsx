import { Dropdown } from "react-bootstrap";
import styled from "styled-components";

interface SVGImage extends React.FC<React.SVGProps<SVGSVGElement>> {
  title?: string | undefined;
}

interface NavMenuButtonProps {
  className?: string;
  Icon: SVGImage;
  children: React.ReactNode;
}

const StyledDropdown = styled(Dropdown)`
  margin: auto 0;
  .dropdown-menu {
    position: absolute;
    top: 3.1em !important;
    box-shadow: 0px 3px 6px #00000029;
    border: none !important;
    border-radius: 0 !important;
    width: 300px;
    padding: 10px !important;
    margin-top: 0 !important;
  }
  .dropdown-item {
    // Display ellipsis for long emails and user names
    /* max-width: 25ch; */
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
      background: none;
    }
  }
`;

function NavMenuButton({ Icon, children, className }: NavMenuButtonProps) {
  return (
    <StyledDropdown className={className}>
      <Dropdown.Toggle variant="accent">
        <Icon />
      </Dropdown.Toggle>
      <Dropdown.Menu align="end">{children}</Dropdown.Menu>
    </StyledDropdown>
  );
}

export default NavMenuButton;
