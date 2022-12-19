import { useEffect, useRef } from "react";
import equal from "fast-deep-equal/react";

const isPrimitive = (value: unknown) => value !== Object(value);

/**
 * Functions the same way as React.useEffect, but uses deep equality instead of a
 * referential equality check.
 */
function useDeepEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList
) {
  if (process.env.NODE_ENV === "development") {
    if (deps.length === 0) {
      console.warn(
        "useDeepEffect must be used with a non-empty dependency list. Use useEffect instead."
      );
    }
    if (deps.every(isPrimitive)) {
      console.warn(
        "useDeepEffect must be used not be used with primitive dependencies. Use useEffect instead."
      );
    }
  }

  const dependencies = useRef(deps);

  if (!equal(dependencies.current, deps)) {
    dependencies.current = deps;
  }

  useEffect(() => {
    const destructor = effect();
    return () => {
      destructor?.();
    };
  }, [dependencies.current]);
}

export default useDeepEffect;
