import { useCallback, useState } from "react";

/**
 * Defines a toggle value alongside a toggler function to change it
 *
 * @param defaultState initial toggle value
 * @returns [toggle, togglerFunction]
 */
function useToggle(defaultState = false): [boolean, () => void] {
  const [toggle, setToggle] = useState(defaultState);
  const toggler = useCallback(() => {
    setToggle((toggle) => !toggle);
  }, [toggle]);

  return [toggle, toggler];
}

export default useToggle;
