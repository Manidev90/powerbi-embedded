import { ForwardedRef, RefCallback } from "react";

/**
 * Combines multiple React refs into a single one.
 */
function mergeRefs<T>(...refs: Array<ForwardedRef<T>>): RefCallback<T> {
  return (node: T) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") ref(node);
      else ref.current = node;
    });
  };
}

export default mergeRefs;
