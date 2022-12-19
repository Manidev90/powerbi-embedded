import { Item } from "sidebar-config";

/**
 * Navigates the sidebar tree to retrive the first link's url
 *
 * @return url or null when there are no links.
 */
function firstSidebarLink(items: Item[]): string | null {
  for (const item of items) {
    switch (item.type) {
      case "link":
        return item.href;
      case "category":
        return firstSidebarLink(item.items);
    }
  }
  return null;
}

export default firstSidebarLink;
