import { useEffect, useState } from "react";

/**
 * Matches a media query string.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia MDN}
 *
 * @param query CSS media query
 * @return whether or not the query matches.
 */
function useMedia(query: string): boolean {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mql = matchMedia(query);
    // Set initial match state
    setMatch(mql.matches);

    // Listen to changes on the matching status
    const handleChange = (ev: MediaQueryListEvent) => {
      setMatch(ev.matches);
    };

    mql.addEventListener("change", handleChange);

    // Clean up when the component unmounts
    return () => {
      mql.removeEventListener("change", handleChange);
    };
  }, [query]);

  return match;
}

export default useMedia;
