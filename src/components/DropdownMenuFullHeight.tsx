import { forwardRef, useEffect, useRef } from "react";
import { Dropdown } from "react-bootstrap";
import { DropdownMenuProps } from "react-bootstrap/esm/DropdownMenu";
import mergeRefs from "../utils/mergeRefs";

const FullHeightMenu = forwardRef<HTMLDivElement | null, DropdownMenuProps>(
  (props, ref) => {
    const { children, style, className, "aria-labelledby": labeledBy } = props;
    const menuRef = useRef<HTMLDivElement | null>(null);
    const refs = mergeRefs(ref, menuRef);

    // Calculate dropdown height everytime it opens
    useEffect(() => {
      const menuDiv = menuRef.current;
      if (menuDiv) {
        const top = menuDiv.getBoundingClientRect().top;
        menuDiv.style.maxHeight = `calc(100vh - ${top}px)`;
      }
    }, [menuRef.current, props]);

    return (
      <div
        ref={refs}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        {children}
      </div>
    );
  }
);

FullHeightMenu.displayName = "FullHeightMenu";

const DropdownMenu = forwardRef<HTMLDivElement | null, DropdownMenuProps>(
  (props: DropdownMenuProps, ref) => {
    return <Dropdown.Menu ref={ref} as={FullHeightMenu} {...props} />;
  }
);

DropdownMenu.displayName = "DropdownMenu";

export default DropdownMenu;
