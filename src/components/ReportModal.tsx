import { IReportEmbedConfiguration } from "powerbi-client";
import { Modal, ModalProps } from "react-bootstrap";
import { IReportParam } from "embed-config";

import { DisplayOption } from "powerbi-models";
import styled from "styled-components";
import Report, { BASE_CONFIG } from "./Report";

interface ReportModalProps extends ModalProps {
  /**The title that will be displayed on the modal's header */
  title: string;
  /**PowerBI Embedding parameters for this report */
  params: IReportParam;
}

const config: IReportEmbedConfiguration = {
  ...BASE_CONFIG,
};

config.settings = {
  ...BASE_CONFIG.settings,
  customLayout: { displayOption: DisplayOption.ActualSize },
};

const StyledReport = styled(Report)`
  min-height: 30vh;
  // 16:9 Aspect ratio
  height: calc(75vw * 9 / 16) !important;
  max-height: 90vh;
`;

const ModalContainer = styled(ModalWithClassName)`
  @media (min-width: 768px) {
    max-width: 75vw !important;
  }
`;

// Renaming Modal's dialogClassName prop to className so it can be used with styled-components
function ModalWithClassName({ className, ...props }: ModalProps) {
  return <Modal dialogClassName={className} {...props} />;
}
/**
 * Bootstrap's modal wrapper that embeds a PowerBi Report in the body
 */
function ReportModal(props: ReportModalProps) {
  const { title, params, ...rest } = props;

  return (
    <ModalContainer {...rest}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <StyledReport params={params} embedConfig={config} />
      </Modal.Body>
    </ModalContainer>
  );
}

export default ReportModal;
