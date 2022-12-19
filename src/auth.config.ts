import {
  PublicClientApplication,
  LogLevel,
  EventMessage,
  EventType,
  AuthenticationResult,
} from "@azure/msal-browser";

const PowerBiScopes = {
  Report: {
    Read: "https://analysis.windows.net/powerbi/api/Report.Read.All",
  },
  Dashboard: {
    Read: "https://analysis.windows.net/powerbi/api/Dashboard.Read.All",
  },
  Workspace: {
    Read: "https://analysis.windows.net/powerbi/api/Workspace.Read.All",
  },
  Dataset: {
    Read: "https://analysis.windows.net/powerbi/api/Dataset.Read.All",
  },
};

const config = {
  appId: "81484abc-8b73-41b1-8e18-0ef5c471b83a",
  authority:
    "https://login.microsoftonline.com/421794ae-eea0-4420-ab1a-a70e1841652c",
  redirectUri:
    // See https://create-react-app.dev/docs/adding-custom-environment-variables/ for more info
    process.env.NODE_ENV !== "production"
      ? `/signin-oidc`
      : `${process.env.PUBLIC_URL}/signin-oidc`,
  scopes: [
    PowerBiScopes.Report.Read,
    PowerBiScopes.Dashboard.Read,
    PowerBiScopes.Workspace.Read,
    PowerBiScopes.Dataset.Read,
  ],
};

// Microsoft Authentication Library configuration settings.
export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: config.appId,
    authority: config.authority,
    redirectUri: config.redirectUri,
  },
  system: {
    loggerOptions: {
      loggerCallback: (
        level: LogLevel,
        message: string,
        containsPii: boolean
      ): void => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
      piiLoggingEnabled: false,
    },
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true,
  },
});

// Check if there are already accounts in the browser session
// If so, set the first account as the active account
const accounts = msalInstance.getAllAccounts();
if (accounts && accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event: EventMessage) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    // Set the active account - this simplifies token acquisition
    const authResult = event.payload as AuthenticationResult;
    msalInstance.setActiveAccount(authResult.account);
  }
});

export default config;
