import { Accordion } from "react-bootstrap";
import { useHref, useLocation } from "react-router-dom";
import { Category } from "sidebar-config";
import styled, { css } from "styled-components";
import SideMenuItems from "../../SideMenuItems/index";
import isActiveItem from "./isActiveItem";

export type SideMenuCategoryProps = Category & {
  level: number;
};

type HeaderStyles = {
  $isActive?: boolean;
  $level: number;
};

const AccordionItem = styled(Accordion.Item)`
  background: none;
  :not(:focus) {
    border: none;
  }
`;

const AccordionHeader = styled(Accordion.Header)<HeaderStyles>`
  .accordion-button {
    padding: 0.75em 0.5em 0.75em var(--sidemenu-level-indentation);
    background: none;
    box-shadow: none;

    // Caret icon margin
    ::after {
      margin-left: 1rem;
    }

    ${({ $isActive }) =>
      $isActive &&
      css`
        color: var(--bs-primary);
        border-color: var(--bs-primary) !important;
      `}

    // Indentation
    ${({ $level }) => css`
      --level: ${$level};
      padding-left: calc(var(--level) * var(--sidemenu-level-indentation));
    `}
  }
`;

const AccordionBody = styled(Accordion.Body)`
  padding: 0;
`;

function SideMenuCategory(props: SideMenuCategoryProps) {
  const { level, ...item } = props;
  const { label, items } = item;
  const { pathname } = useLocation();
  const currentRoute = useHref("", { relative: "route" });

  const isActive = isActiveItem(item, currentRoute, pathname);

  return (
    <AccordionItem eventKey={label}>
      <AccordionHeader $isActive={isActive} $level={level}>
        {label}
      </AccordionHeader>
      <AccordionBody>
        <SideMenuItems items={items} level={level + 1} />
      </AccordionBody>
    </AccordionItem>
  );
}

export default SideMenuCategory;
