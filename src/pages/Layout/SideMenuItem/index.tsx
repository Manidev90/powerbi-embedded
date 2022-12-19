import { Item } from "sidebar-config";
import SideMenuCategory from "./Category";
import SideMenuLink from "./Link";

export type SideMenuItemProps = Item & {
  level: number;
};

function SideMenuItem(props: SideMenuItemProps) {
  switch (props.type) {
    case "link":
      return <SideMenuLink {...props} />;
    case "category":
      return <SideMenuCategory {...props} />;
    default:
      throw new Error("Invalid element type");
  }
}

export default SideMenuItem;
