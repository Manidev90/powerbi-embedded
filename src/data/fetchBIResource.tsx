import { EmbedType } from "powerbi-client-react";
import { IEmbedParam } from "embed-config";
import powerBIFetch from "./powerBIFetch";

export interface IResponseBase {
  id: string;
  webUrl: string;
  users: unknown[];
  subscriptions: unknown[];
}

export interface IReportResponse extends IResponseBase {
  reportType: string;
  name: string;
  embedUrl: string;
  isFromPbix: boolean;
  isOwnedByMe: boolean;
  datasetId: string;
  datasetWorkspaceId: string;
}

export interface IDashboardResponse extends IResponseBase {
  displayName: string;
  embedUrl: string;
  isReadOnly: boolean;
}

export interface IDatasetResponse extends IResponseBase {
  qnaEmbedURL: string;
}

export type IResponse = IDatasetResponse | IDashboardResponse | IReportResponse;

function getComponentDetailsEndpoint(embedParam: IEmbedParam) {
  switch (embedParam.type) {
    case EmbedType.Report:
      return `/reports/${embedParam.id}`;
    case EmbedType.Dashboard:
      return `/dashboards/${embedParam.id}`;
    // case EmbedType.Tile:
    //   return `/dashboards/${embedParam.resourceId}/tiles/${embedParam.resourceId}`;
    case EmbedType.Qna:
      return `/datasets/${embedParam.datasetIds[0]}`;
    default:
      throw new Error("Endpoint not implemented");
  }
}

async function fetchEmbedDetails(embedParam: IEmbedParam) {
  const endpoint = getComponentDetailsEndpoint(embedParam);
  const response = await powerBIFetch.get<IResponse>(endpoint);

  return response.data;
}

export default fetchEmbedDetails;
