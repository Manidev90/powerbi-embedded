import { useQuery } from "@tanstack/react-query";
import { IDashboardEmbedConfiguration } from "powerbi-client";
import { EmbedProps, EventHandler, PowerBIEmbed } from "powerbi-client-react";
import { TokenType } from "powerbi-models";
import styled from "styled-components";
import fetchEmbedDetails, { IDashboardResponse } from "../data/fetchBIResource";
import { IEmbedParam } from "embed-config";
import useAccessToken from "../hooks/useAccessToken";

export type DashboardEvents = {
  /**Fired when the dashboards loads */
  onLoaded?: EventHandler;
  /**Fired when the user clicks any tile inside the dashboard*/
  onTileClicked?: EventHandler;
};
/**
 * Dashboard takes every prop that {@link EmbedProps PowerBIEmbed} takes except embedConfig
 * so we are omitting only this property.
 *
 * @see {@link https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys}
 */
export type DashboardProps = Omit<
  EmbedProps,
  "embedConfig" | "eventHandlers" | "cssClassName"
> &
  DashboardEvents & {
    className?: string;
    params: IEmbedParam;
    /**when supplied it overrides the default embed configuration */
    embedConfig?: IDashboardEmbedConfiguration;
  };

export const BASE_CONFIG: Readonly<IDashboardEmbedConfiguration> = {
  type: "dashboard",
  tokenType: TokenType.Aad,
  pageView: "fitToWidth",
};

const Wrapper = styled.div`
  position: relative;
`;

function Dashboard(props: DashboardProps) {
  const { params, embedConfig, onTileClicked, onLoaded, className, ...rest } =
    props;

  const accessToken = useAccessToken();

  // Fetch embed url
  const { data: resource, error } = useQuery([params, accessToken], () =>
    fetchEmbedDetails(params)
  );

  if (error) {
    throw error;
  }

  const config = {
    ...BASE_CONFIG,
    // Override defaults with the provided configuration
    ...embedConfig,
    // Inject accessToken and embedUrl
    accessToken: accessToken,
    embedUrl: (resource as IDashboardResponse)?.embedUrl,
  };

  const handlers: EmbedProps["eventHandlers"] = new Map([
    ["loaded", (...args) => onLoaded?.(...args)],
    ["tileClicked", (...args) => onTileClicked?.(...args)],
  ]);

  return (
    <Wrapper className={className}>
      <PowerBIEmbed embedConfig={config} eventHandlers={handlers} {...rest} />
    </Wrapper>
  );
}

export default Dashboard;
