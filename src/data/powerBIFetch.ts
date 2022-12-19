import { InteractionRequiredAuthError } from "@azure/msal-browser";
import axios from "axios";
import { msalInstance } from "../auth.config";
import config from "../auth.config";

/**
 * Axios instance for API calls directed to https://api.powerbi.com/v1.0/myorg .
 * The access token is added on every request using the scopes from {@link config.scopes PowerBIScopes}
 * */
const powerBIFetch = axios.create({
  baseURL: "https://api.powerbi.com/v1.0/myorg",
});

// Add Authorization header on every request
powerBIFetch.interceptors.request.use(async (requestConfig) => {
  const request = {
    scopes: config.scopes,
  };
  // Retrieve access Token and insert it in the authorization header
  try {
    const authResult = await msalInstance.acquireTokenSilent(request);
    requestConfig.headers = {
      ...requestConfig.headers,
      Authorization: `Bearer ${authResult.accessToken}`,
    };
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      msalInstance.acquireTokenRedirect(request);
    }
  }
  return requestConfig;
});

export default powerBIFetch;
