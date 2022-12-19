import { embed, stardust } from "@nebula.js/stardust";
import { useMemo } from "react";
import { useConnection } from "../contexts/EngineConnection";
import loadSnType from "../utils/loadSnType";

// Add Only the types that will be used
// See https://qlik.dev/libraries-and-tools/nebulajs/supported-charts#sense-chart-names
// For a list of the corresponding module names and supported charts
const visualNameToModuleName = {
  barchart: "bar-chart",
  kpi: "kpi",
  table: "table",
  "pivot-table": "pivot-table",
}; // TODO offer a way to pass the initial configuration, possible solutions, Context API or a configuration class

const visualTypes = Object.entries(visualNameToModuleName).map(
  ([visualName, moduleName]) => ({
    name: visualName,
    load: () => loadSnType(moduleName),
  })
);

const BASE_CONFIGURATION = embed.createConfiguration({
  types: visualTypes,
});

/**
 * Creates a new embed instance using the current App connection
 * and BASE_CONFIGURATION
 * @param instanceConfig
 * @returns
 */
export function useEmbed(instanceConfig?: stardust.Configuration) {
  const connection = useConnection();
  const nebula = useMemo(() => {
    if (connection?.app) {
      return BASE_CONFIGURATION(connection?.app, instanceConfig);
    }
  }, [connection, instanceConfig]);

  return nebula;
}
