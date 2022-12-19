import { useQuery } from "@tanstack/react-query";
import cn from "classnames";
import { IQnaEmbedConfiguration } from "powerbi-client";
import { EmbedProps, EventHandler, PowerBIEmbed } from "powerbi-client-react";
import { QnaMode, TokenType } from "powerbi-models";
import styled from "styled-components";
import fetchEmbedDetails, { IDatasetResponse } from "../data/fetchBIResource";
import { IQnaParam } from "embed-config";
import useAccessToken from "../hooks/useAccessToken";
import styles from "./styles/Qna.module.scss";

export type QnaEvents = {
  /**The visualRendered event is raised when a visual is rendered after a question is
   * entered and an answer displays. */
  onVisualRendered?: EventHandler;
};

export type QnaProps = Omit<
  EmbedProps,
  "embedConfig" | "eventHandlers" | "cssClassName"
> &
  QnaEvents & {
    params: IQnaParam;
    /**when supplied it overrides the default embed configuration */
    embedConfig?: Partial<IQnaEmbedConfiguration>;
    className?: string;
  };

export const BASE_CONFIG: Readonly<Omit<IQnaEmbedConfiguration, "datasetIds">> =
  {
    type: "qna",
    tokenType: TokenType.Aad,
    viewMode: QnaMode.Interactive,
  };

function PowerBiQna(props: QnaProps) {
  const { params, className, embedConfig, onVisualRendered, ...rest } = props;

  const accessToken = useAccessToken();

  const { data: resource, error } = useQuery([params, accessToken], () =>
    fetchEmbedDetails(params)
  );

  if (error) {
    throw error;
  }

  // Add dataset id to the base configuration
  const config: IQnaEmbedConfiguration = {
    ...BASE_CONFIG,
    ...embedConfig,
    accessToken: accessToken,
    embedUrl: (resource as IDatasetResponse).qnaEmbedURL,
    datasetIds: params.datasetIds,
  };

  const eventHandlers: Map<string, EventHandler> = new Map([
    ["visualRendered", (...args) => onVisualRendered?.(...args)],
  ]);

  return (
    <PowerBIEmbed
      {...rest}
      embedConfig={config}
      cssClassName={cn(styles.container, className)}
      eventHandlers={eventHandlers}
    />
  );
}

const Qna = styled(PowerBiQna)`
  position: relative;
  // Make iframe use 100% of the space
  > iframe {
    position: absolute;
    inset: 0;
  }
`;

export default Qna;
