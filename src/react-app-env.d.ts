/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="react-scripts" />
namespace NodeJS {
  interface ProcessEnv {
    /** Environment where the code is currently deployed*/
    readonly REACT_APP_DEPLOY_ENV: "dev" | "qa" | "stg" | "prod";
    /** Relative Path where the code resides i.e /cloudhybrid, dev/cloudhybrid, etc... */
    readonly REACT_APP_BASENAME: string;
    /** ECO Feedback API endpoint where feedback messages will be directed to*/
    readonly REACT_APP_ECO_API_ENDPOINT: string;
  }
}
interface Window {
  /**Initialize global ECO Feedback script*/
  initializeEcoOptions: (username: string | undefined, email: string) => void;
  /**Global bootstrap instance (Required by ECO Feedback) */
  bootstrap: unknown;
}
