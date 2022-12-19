import { stardust } from "@nebula.js/stardust";
import { useEffect, useRef } from "react";
import { useEmbed } from "../hooks/useEmbed";

type RenderFunctionParameters = Parameters<stardust.Embed["render"]>[0];

// Remove element field since we are providing our own container.
//https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as
type WithoutElementField<T> = {
  [P in keyof T as Exclude<P, "element">]: T[P];
};

type RenderConfiguration = WithoutElementField<RenderFunctionParameters>;

type VisualizationProps = React.ComponentPropsWithoutRef<"div"> & {
  render: RenderConfiguration;
};

/**
 * Render an existing visual or a custom one.
 *
 * To learn more about the available options:
 *
 * @see {@link https://qlik.dev/libraries-and-tools/nebulajs/rendering Qlik - Docs}
 */
function Visualization(props: VisualizationProps) {
  const { render: renderConfig, ...rest } = props;
  const embed = useEmbed();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (embed && containerRef.current) {
      embed.render({ element: containerRef.current, ...renderConfig });
    }
  }, [embed]);

  return <div ref={containerRef} {...rest} />;
}

export default Visualization;
