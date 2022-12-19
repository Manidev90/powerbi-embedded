import cn from "classnames";
import { useState } from "react";
import { Dropdown, DropdownProps } from "react-bootstrap";
import styles from "./styles/NavMenuDropdown.module.scss";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

interface NavMenuDropdownProps extends DropdownProps {
  title: string;
  // Icon: SVGImage;
}

function NavMenuDropdown({
  title,
  drop,
  align,
  // Icon,
  ...props
}: NavMenuDropdownProps) {
  //For Side menu removed icon and icon class
  // const iconClass = cn(styles["menu-icon"], "ms-auto");
  const [show, setShow] = useState(false);
  const toggleMenu = () => setShow(!show);
  const toggleClass = cn(
    "dropdown-item d-flex py-2",
    styles.titles,
    styles.toggle
  );
  const menuClass = cn(styles.indent, styles.elevation);

  return (
    <Dropdown
      // Controls the direction where the dropdown should "drop"
      drop={drop ?? "down"}
      show={show}
      // Toggle the menu on and off when the user hovers over the dropdown
      onClick={toggleMenu}
      // onMouseLeave={toggleMenu}
      // Adds any other remaining props that were passed
      {...props}
    >
      <Dropdown.Toggle as="a" className={toggleClass}>
        {title}
        {show ? (
          <MdOutlineKeyboardArrowUp className={styles.arrowIconClass} />
        ) : (
          <MdOutlineKeyboardArrowDown className={styles.arrowIconClass} />
        )}
        {/* <Icon className={iconClass} /> */}
      </Dropdown.Toggle>

      <Dropdown.Menu className={menuClass} align={align ?? "start"}>
        {props.children}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default NavMenuDropdown;
