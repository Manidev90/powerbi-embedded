import React, { useContext, createContext } from "react";
import useCreateConnection, {
  EngineAppConfiguration,
} from "../hooks/useCreateConnection";

export type IEngineConnection = {
  app?: EngineAPI.IApp;
  error?: unknown;
};

export type EngineConnectionProps = EngineAppConfiguration & {
  children: React.ReactNode;
};

export const EngineConnectionContext = createContext<IEngineConnection>({});

export const EngineConfigurationContext =
  createContext<EngineAppConfiguration | null>(null);

/**
 * Initiates a connection with qlik's engine and provides it to all the components underneath.
 *
 * To allow using visualizations from different connections. It can be nested with other
 * connections, in which case it'll initiate a new connection and merge the newly provided configuration with the previous one.
 *
 * @example
 * <EngineConnection host="www.test.com" appId="1234">
 *    ...
 *    <EngineConnection appId="9876"> // Also connects to the same host
 *      ...
 *    </EngineConnection>
 * </EngineConnection>
 */
function EngineConnection(props: EngineConnectionProps) {
  const { children, ...currentConfig } = props;
  const prevConfig = useConnectionConfiguration();

  // Reuse previous configuration if any
  const config = prevConfig
    ? { ...prevConfig, ...currentConfig }
    : currentConfig;

  const connection = useCreateConnection(config);

  return (
    <EngineConnectionContext.Provider value={connection}>
      <EngineConfigurationContext.Provider value={config}>
        {children}
      </EngineConfigurationContext.Provider>
    </EngineConnectionContext.Provider>
  );
}

export function useConnection() {
  return useContext(EngineConnectionContext);
}

export function useConnectionConfiguration() {
  return useContext(EngineConfigurationContext);
}

export default EngineConnection;
