import { ButtonProps, Button } from "react-bootstrap";
import { ReactComponent as MenuIcon } from "../../../../assets/burger-menu.svg";

function SideMenuToggle(props: ButtonProps) {
  const { onClick, ...rest } = props;

  const handleClick: typeof onClick = (event) => {
    // Prevent triggering twice because clicking the toggle also counts
    // as clicking outside the sidebar
    event.stopPropagation();

    onClick?.(event);
  };

  return (
    <Button onClick={handleClick} {...rest} title="Menu" variant="accent">
      <MenuIcon title="Menu" />
    </Button>
  );
}

export default SideMenuToggle;
