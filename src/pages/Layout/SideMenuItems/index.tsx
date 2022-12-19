import { Accordion, Nav } from "react-bootstrap";
import { Item } from "sidebar-config";
import styled from "styled-components";
import SideMenuItem from "../SideMenuItem";

export type SideMenuItemsProps = {
  items: Item[];
  level?: number;
};

const StyledAccordion = styled(Accordion)`
  --bs-accordion-inner-border-radius: none;
  color: var(--bs-secondary);
  .nav-link,
  .accordion-button {
    border-left: 4px solid transparent;
  }

  .nav-link:hover,
  .nav-link.active,
  .accordion-button:hover,
  .accordion-button:not(.collapsed) {
    border-color: var(--bs-primary);
  }

  .accordion-button:hover {
    color: var(--bs-primary);
  }
`;

function SideMenuItems({ items, level }: SideMenuItemsProps) {
  return (
    <StyledAccordion>
      {items.map((props) => (
        // eslint-disable-next-line react/prop-types
        <Nav.Item key={props.label}>
          <SideMenuItem {...props} level={level ?? 1} />
        </Nav.Item>
      ))}
    </StyledAccordion>
  );
}

export default SideMenuItems;
