import enigma from "enigma.js";
import schema from "enigma.js/schemas/12.1306.0.json";
import SenseUtilities from "enigma.js/sense-utilities";
import { EngineAppConfiguration } from "../hooks/useCreateConnection";

/**
 * Creates an app connection with Qlik's Engine.
 *
 * @param config
 */
async function connectToApp(config: EngineAppConfiguration) {
  const senseUrl = SenseUtilities.buildUrl(config);
  const session: EngineAPI.IGlobal = await enigma
    .create({ schema, url: senseUrl })
    .open();

  return await session.openDoc(config.appId);
}

export default connectToApp;
