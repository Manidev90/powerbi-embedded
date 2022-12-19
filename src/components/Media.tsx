import useMedia from "../hooks/useMedia";

export interface MediaProps {
  /**CSS media query string  */
  query: string;
  children: React.ReactNode;
}

/**
 * Wrapper component that only renders its children when the
 * media query string matches.
 */
function Media({ query, children }: MediaProps) {
  const match = useMedia(query);
  return <>{match && children}</>;
}

export default Media;
