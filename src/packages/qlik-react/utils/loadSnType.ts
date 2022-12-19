import * as stardust from "@nebula.js/stardust";
import { requireFrom } from "d3-require";

/**
 *  Loads Qlik's visualization module at run time.
 *
 * @see {@link https://github.com/qlik-oss/nebula.js/blob/master/docs/embed-configuration.md#loading-on-the-fly Nebula Doc - Loading on the fly}
 */
const loadSnType = requireFrom(
  async (visualModuleName) =>
    `https://unpkg.com/@nebula.js/sn-${visualModuleName}`
).alias({
  "@nebula.js/stardust": stardust,
});

export default loadSnType;
