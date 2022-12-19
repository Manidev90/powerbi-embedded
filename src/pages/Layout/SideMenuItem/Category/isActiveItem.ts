import { matchPath } from "react-router-dom";
import { Item } from "sidebar-config";

/**
 *
 *
 * @param item SideMenuItem
 * @param fromRoute route at which the links start ie. /core-insights/
 * @param fromPathname The full pathname
 * @returns true if any link inside item matches pathname
 */
function isActiveItem(
  item: Item,
  fromRoute: string,
  fromPathname: string
): boolean {
  // Item links are relative, to compare them with fromPathName
  // we need to append the route from were they came from
  if (item.type === "link") {
    const fullItemPathName = fromRoute + "/" + item.href;
    return Boolean(matchPath(fullItemPathName, fromPathname));
  }

  // Traverse the sidebar tree to see if there's any nested active links
  return item.items.some((item) => isActiveItem(item, fromRoute, fromPathname));
}

export default isActiveItem;
