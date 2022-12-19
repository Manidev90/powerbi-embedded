import { Stack } from "react-bootstrap";
import styled from "styled-components";
import useExportPowerBIReport, {
  ExportReportPage,
  PageBookmark,
  PowerBIReportExportConfiguration,
} from "../../../hooks/useExportPowerBIReport";
import ExcelIcon from "../../../assets/excel-icon.png";
import PDFIcon from "../../../assets/pdf-icon.svg";
import PowerPointIcon from "../../../assets/powerpoint-icon.png";

type ExportOptionsProps = {
  reportId: string;
  pageBookmark?: PageBookmark;
  pagesToExport: ExportReportPage[];
  setIsMenuVisible: (show: boolean) => void;
};

const IconButton = styled.button`
  background: none;
  margin: 0;
  padding: 0;
  border: none;
  :disabled {
    filter: grayscale();
  }
  > img {
    width: 21px;
    height: 21px;
  }
`;

function ExportOptions(props: ExportOptionsProps) {
  const { reportId, setIsMenuVisible, pageBookmark, pagesToExport } = props;
  const { exporter: asPDF, isRunning: canExportPDF } = useExportPowerBIReport(
    reportId,
    "PDF"
  );

  // const { exporter: asExcel, isRunning: canExportExcel } =
  //   useExportPowerBIReport(reportId, "XLSX");

  const { exporter: asPresentation, isRunning: canExportPresentation } =
    useExportPowerBIReport(reportId, "PPTX");

  const handleExport = (exporter: typeof asPDF) => {
    const exportConfig: PowerBIReportExportConfiguration = {
      defaultBookmark: pageBookmark,
      pages: pagesToExport,
    };
    exporter(exportConfig);
    // Close menu when the user clicks an option
    setIsMenuVisible(false);
  };

  return (
    <Stack gap={3} direction="horizontal">
      <IconButton
        type="button"
        title="Export as Excel spreadsheet (paginated reports only)"
        disabled // Exporting as excel is only supported on paginated reports
        // onClick={() => handleExport(asExcel)}
      >
        <img src={ExcelIcon} alt="Excel spreadsheet" />
      </IconButton>
      <IconButton
        type="button"
        title="Export as PowerPoint presentation"
        disabled={canExportPresentation}
        onClick={() => handleExport(asPresentation)}
      >
        <img src={PowerPointIcon} alt="PowerPoint Presentation" />
      </IconButton>
      <IconButton
        type="button"
        title="Export as PDF"
        disabled={canExportPDF}
        onClick={() => handleExport(asPDF)}
      >
        <img src={PDFIcon} alt="PDF document" />
      </IconButton>
    </Stack>
  );
}

export default ExportOptions;
