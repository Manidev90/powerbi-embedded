import { useCallback, useState } from "react";

/**
 * Creates a list of toggles, which can be used to known whether or not an option is selected.
 *
 * Example use cases: Todo List, Configuration Options, Dropdown of checkboxes.
 *
 * @param defaultItems when present all the items in this list will be toggled by default.
 * @returns [isOptionCheckedFunction, togglerFunction]
 */
function useToggleList<T>(
  defaultItems?: T[]
): [(item: T) => boolean, (item: T) => void] {
  const [checkedItems, setCheckedItems] = useState(() => new Set(defaultItems));

  // Return whether or not this item is present in the set
  const isToggled = useCallback(
    (item: T) => checkedItems.has(item),
    [checkedItems]
  );

  // Remove an item if it is present in the set, add it otherwise
  const toggler = useCallback(
    (item: T) => {
      const checked = new Set(checkedItems);
      if (checked.has(item)) checked.delete(item);
      else checked.add(item);

      setCheckedItems(checked);
    },
    [checkedItems]
  );

  return [isToggled, toggler];
}

export default useToggleList;
