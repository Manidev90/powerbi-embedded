import React from "react";
import { IEmbedParam } from "embed-config";
import useRequires from "../hooks/useRequires";

interface RequiresProps {
  /** Embed parameters that this resource must use */
  params: IEmbedParam[];
  /** When provided at least one embed parameter must be available*/
  some?: boolean;
  children: React.ReactNode;
}

/**
 * Returns children only if all the embed parameters are available.
 * When {@link RequiresProps.some some} is provided. It returns children when
 * at least one parameter is available.
 */
function Requires(props: RequiresProps) {
  const shouldRender = useRequires(props.params, props.some);
  if (shouldRender.hasAccess) {
    return <>{props.children}</>;
  }
  return <></>;
}

export default Requires;
