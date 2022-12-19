import { RefObject, useEffect } from "react";

function useOnClickOutside(
  ref: RefObject<HTMLElement>,
  handler: (e: MouseEvent) => unknown
) {
  useEffect(() => {
    const container = ref.current;

    const handleOutsideClik: typeof handler = (event) => {
      const element = event.target as HTMLElement;
      if (!container?.contains(element)) {
        handler(event);
      }
    };
    document.addEventListener("click", handleOutsideClik);

    return () => {
      document.removeEventListener("click", handleOutsideClik);
    };
  }, [ref, handler]);
}

export default useOnClickOutside;
