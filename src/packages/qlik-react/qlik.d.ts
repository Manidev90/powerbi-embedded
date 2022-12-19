/**
 * Type definition for sense-utilities
 *
 * @author Brian Uribe
 */
declare module "enigma.js/sense-utilities" {
  /** This object describes the configuration that is sent into `buildUrl(config)`*/
  export interface SenseConfiguration {
    /**
     * The app ID. If omitted, only the global object is returned. Otherwise both global and app object are returned. */
    appId?: string;

    /** Whether to open the app without data.
     * */
    noData?: boolean;

    /**
     * Set to false if an unsecure WebSocket should be used.
     *
     * @defaultValue true.
     * */
    secure?: boolean;

    /**
     * Host address.
     * */
    host?: string;

    /**
     * Port to connect to.
     * */
    port?: number;

    /**
     * The absolute base path to use when connecting. Used for proxy prefixes.
     *
     * @defaultValue '/'
     */
    prefix?: string;

    /**
     * The subpath.
     */
    subpath?: string;

    /**
     * Used to instruct Proxy to route to the correct receiver.
     */
    route?: string;

    /**
     * Identity to use.
     */
    identity?: string;

    /**
     * Used to add parameters to the WebSocket URL.
     */
    urlParams?: unknown;

    /**
     * A value in seconds that QIX Engine should keep the session
     * alive after socket disconnect (only works if QIX Engine supports it).
     */
    ttl?: number;
  }

  namespace SenseUtilities {
    /**
     * Function used to build a URL.
     *
     * @param urlConfig The URL configuration object.
     * @returns the websocket URL.
     */
    function buildUrl(urlConfig: SenseConfiguration): string;
  }

  export default SenseUtilities;
}
