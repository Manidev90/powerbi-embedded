import { useConnection } from "../../packages/qlik-react/contexts/EngineConnection";

type Props = {
  /**URL where the user will login to obtain Qlik Sense session cookie */
  endpoint: string;
};

/**
 * When unable to establish a connection,
 * it redirects users to icsanalytics authentication endpoint
 * After a succesful sign in, users will return to the current location
 * and this time connection should succeeded.
 */
function QlikLoginRedirect({ endpoint }: Props) {
  const { error } = useConnection();
  if (error && process.env.NODE_ENV === "production") {
    const authEndpoint = new URL(endpoint);
    authEndpoint.searchParams.append("returnTo", window.location.href);

    window.location.href = authEndpoint.toString();
  }
  return <></>;
}

export default QlikLoginRedirect;
