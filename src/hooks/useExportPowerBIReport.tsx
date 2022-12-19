import { useMutation, useQuery } from "@tanstack/react-query";
import equal from "fast-deep-equal/react";
import { useCallback, useRef, useState } from "react";
import powerBIFetch from "../data/powerBIFetch";
import saveAs from "../utils/saveAs";

/**
 * @see https://docs.microsoft.com/en-us/rest/api/power-bi/reports/export-to-file#fileformat
 */
export type FileFormat =
  | "ACCESSIBLEPDF"
  | "CSV"
  | "DOCX"
  | "IMAGE"
  | "MHTML"
  | "PDF"
  | "PNG"
  | "PPTX"
  | "XLSX"
  | "XML";

/**
 * @see https://docs.microsoft.com/en-us/rest/api/power-bi/reports/export-to-file#export
 */
export type Export = {
  /**The export to file job ID */
  id: string;
  status: ExportState;
  percentComplete: number;
  reportName: string;
};

/**
 * The current state of the export to file job.
 * @see https://docs.microsoft.com/en-us/rest/api/power-bi/reports/get-export-to-file-status#export
 */
export type ExportState =
  | "Failed"
  | "NotStarted"
  | "Running"
  | "Succeeded"
  | "Undefined";

export type postExportRequestParams = {
  reportId: string;
  fileFormat: FileFormat;
  powerBIReportConfiguration?: PowerBIReportExportConfiguration;
};

/**
 * @see https://learn.microsoft.com/en-us/rest/api/power-bi/reports/export-to-file#powerbireportexportconfiguration
 */
export type PowerBIReportExportConfiguration = {
  pages: ExportReportPage[];
  defaultBookmark?: PageBookmark;
};

/**
 * @see https://learn.microsoft.com/en-us/rest/api/power-bi/reports/export-to-file#powerbireportexportconfiguration
 */

export type ExportReportPage = {
  bookmark?: ExportReportPage;
  pageName: string;
  visualName?: string;
};

export type PageBookmark = {
  name?: string;
  state?: string;
};

const MAX_RETRIES = 3;
const DEFAULT_RETRY_AFTER_SECS = 5;

/**
 * Initiates an export job
 */
async function postExportRequest({
  reportId,
  fileFormat,
  powerBIReportConfiguration,
}: postExportRequestParams) {
  const endpoint = `/reports/${reportId}/ExportTo`;
  const response = await powerBIFetch.post<Export>(endpoint, {
    format: fileFormat,
    powerBIReportConfiguration: powerBIReportConfiguration,
  });

  return response.data;
}

function usePollExportStatus(reportId?: string, exportId?: string) {
  const endpoint = `/reports/${reportId}/exports/${exportId}`;
  const fetcher = () => powerBIFetch.get<Export>(endpoint);

  const { data: response } = useQuery(
    ["export status", reportId, exportId],
    fetcher,
    {
      // Run this query only when we have an export id and a reportId available
      enabled: Boolean(reportId && exportId),
      // Poll until success or failure
      refetchInterval: (response) => {
        const SEC_TO_MS = 1000;
        const status = response?.data.status;
        let retryAfter = Number(response?.headers["retry-after"]);
        // Retry-After header is not always populated. Wait a set amount instead
        if (isNaN(retryAfter)) {
          retryAfter = DEFAULT_RETRY_AFTER_SECS;
        }

        return status === "Succeeded" || status === "Failed"
          ? 0
          : retryAfter * SEC_TO_MS;
      },
      refetchIntervalInBackground: true,
    }
  );

  return response?.data;
}

/**
 * Downloads a finished export job.
 *
 * @returns download link
 */
function useDownloadExport(reportId: string, exportResponse?: Export) {
  const exportLink = `/reports/${reportId}/exports/${exportResponse?.id}/file`;

  const downloader = async () => {
    const { data: file } = await powerBIFetch.get<Blob>(exportLink, {
      responseType: "blob",
    });
    return URL.createObjectURL(file);
  };

  const { data } = useQuery(
    ["export download", exportResponse?.id],
    downloader,
    {
      enabled: Boolean(exportResponse && exportResponse.status === "Succeeded"),
      onSuccess: (downloadLink) => {
        saveAs(downloadLink, exportResponse?.reportName);
      },
    }
  );

  return data;
}

function useExportPowerBIReport(reportId: string, fileFormat: FileFormat) {
  const prevConfig = useRef<PowerBIReportExportConfiguration>();
  const [exportId, setExportId] = useState("");

  // Request PowerBI to initiate an export job
  const { mutate, isLoading } = useMutation(postExportRequest, {
    mutationKey: [reportId, exportId],
    onSuccess: (exportInfo) => {
      setExportId(exportInfo.id);
    },
    retry: MAX_RETRIES,
  });

  const exportResponse = usePollExportStatus(reportId, exportId);

  // Automatically download when the export has finished.
  const downloadLink = useDownloadExport(reportId, exportResponse);

  const initiateExport = useCallback(
    (config?: PowerBIReportExportConfiguration) => {
      if (!equal(config, prevConfig.current)) {
        prevConfig.current = config;
      }
      // Configuration has not changed attempt to download from cache
      else if (downloadLink) {
        saveAs(downloadLink, exportResponse?.reportName);
        return;
      }

      // If there's no export's running and the configuration has changed
      if (exportResponse?.status !== "Running") {
        mutate({
          reportId: reportId,
          fileFormat: fileFormat,
          powerBIReportConfiguration: config,
        });
      }
    },
    [reportId, fileFormat, exportResponse, downloadLink, prevConfig.current]
  );

  return {
    exporter: initiateExport,
    isRunning: !isLoading && exportResponse?.status === "Running",
    progress: exportResponse?.percentComplete ?? 0,
  };
}

export default useExportPowerBIReport;
