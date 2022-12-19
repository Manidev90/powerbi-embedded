import { stardust } from "@nebula.js/stardust";
import React, { useEffect, useRef } from "react";
import { useEmbed } from "../hooks/useEmbed";

type SelectionProps = React.ComponentPropsWithoutRef<"div"> & {
  fieldIdentifier: Parameters<stardust.Embed["field"]>[0];
  options?: Parameters<stardust.FieldInstance["mount"]>[1];
};

/**
 * Embed a listbox using the specified field identifier.
 *
 * @see {@link https://qlik.dev/libraries-and-tools/nebulajs/field-selections Qlik - Docs}
 */
function Selections(props: SelectionProps) {
  const { fieldIdentifier, options, ...rest } = props;
  const embed = useEmbed();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!embed || !container) {
      return;
    }
    embed.field(fieldIdentifier).then((listbox) => {
      listbox.mount(container, options);
    });
  }, [embed]);

  return <div ref={containerRef} {...rest} />;
}

export default Selections;
