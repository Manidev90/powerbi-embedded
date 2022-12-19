import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import {
  AccountInfo,
  InteractionRequiredAuthError,
  InteractionStatus,
} from "@azure/msal-browser";
import config from "../auth.config";

function useAccessToken() {
  const { instance, inProgress } = useMsal();
  const [accessToken, setAccessToken] = useState<string>();
  useEffect(() => {
    async function getToken() {
      if (inProgress === InteractionStatus.None) {
        const tokenRequest = {
          account: instance.getActiveAccount() as AccountInfo,
          scopes: config.scopes,
        };
        try {
          // Acquire an access token
          const result = await instance.acquireTokenSilent(tokenRequest);
          setAccessToken(result.accessToken);
        } catch (e) {
          if (e instanceof InteractionRequiredAuthError) {
            // Redirect user to login screen
            instance.acquireTokenRedirect(tokenRequest);
          }
          throw e;
        }
      }
    }
    getToken();
  }, [inProgress, instance]);

  return accessToken;
}

export default useAccessToken;
