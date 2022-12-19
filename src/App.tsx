import { InteractionStatus, InteractionType } from "@azure/msal-browser";
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "react-router-dom";
import config from "./auth.config";

import * as bootstrap from "bootstrap";
import { useEffect } from "react";
import type {} from "styled-components/cssprop";

// ECO Feedback needs Bootstrap to be available Globally
window.bootstrap = bootstrap;

const ONE_HOUR_IN_MS = 60 * 60 * 1000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Tokens expired after 1 hour, so it should be safe for us to not refetch until them
      // https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-configurable-token-lifetimes
      staleTime: ONE_HOUR_IN_MS,
    },
  },
});

function App() {
  const { instance, inProgress } = useMsal();

  // Initialize Eco Feedback with the user credentials
  useEffect(() => {
    if (inProgress !== InteractionStatus.None) {
      // User has not signed in yet
      return;
    }
    const account = instance.getActiveAccount();
    if (account) {
      window.initializeEcoOptions(account.name, account.username);
    }
  }, [instance, inProgress]);

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={config}
    >
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </MsalAuthenticationTemplate>
  );
}

export default App;
