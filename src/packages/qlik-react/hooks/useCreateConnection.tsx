import { SenseConfiguration } from "enigma.js/sense-utilities";
import { useEffect, useState } from "react";
import connectToApp from "../utils/connectToApp";

// Make appId and host required
export type EngineAppConfiguration = SenseConfiguration & {
  appId: string;
};

/**
 * @returns global app connection to Qlik's engine.
 */
function useCreateConnection(config: EngineAppConfiguration) {
  const [app, setApp] = useState<EngineAPI.IApp>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    connectToApp(config)
      .then((app) => {
        setApp(app);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
  }, []);

  return { app, error };
}

export default useCreateConnection;
