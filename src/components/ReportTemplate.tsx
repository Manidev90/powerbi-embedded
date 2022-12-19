import { IReportParam } from "embed-config";
import { Page, Report as BIReport } from "powerbi-client";
import { EmbedType, EventHandler } from "powerbi-client-react";
import { IPage } from "powerbi-models";
import { useEffect, useReducer } from "react";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ExportDropdown from "./ExportDropdown";
import FloatingButton from "./FloatingButton";
import Heading from "./Heading";
import Loading from "./Loading/Progress";
import Report from "./Report";
import QnaModal from "./ReportModal";

const HORIZONTAL_MARGIN = 30;

//#region Type definitions
export interface ReportTemplateProps {
  // /**Title to display as heading text*/
  // pageTitle: string;
  /**Name of the report section to display. Usually in the format ReportSection08965a529d1c2df6dc52 */
  activePageName?: string;
  /** the params designated for a report (ex CoreInsights reportParams is EmbedParams.CIreport) */
  reportParams: IReportParam;
  /** the params designated for a qna of a paticular report (ex QNA CoreInsights reportParams is EmbedParams.CIqna) */
  qnaParams: IReportParam;
  // /**the name of the qna for that report (ex for CoreInsights is  "Core Insights Q & A") */
  // qnaTitle: string;
}

enum ActionType {
  pageHeightUpdate,
  tabChange,
  reportLoaded,
  qnaToggled,
  reportRendered,
}

interface ReportTemplateState {
  report?: BIReport;
  pages: IPage[];
  showQna: boolean;
  isLoaded: boolean;
  style?: React.CSSProperties;
  isRendered: boolean;
}

type ReportTemplateAction =
  | { type: ActionType.reportLoaded; report: BIReport; pages: IPage[] }
  | { type: ActionType.pageHeightUpdate; height: number }
  | { type: ActionType.reportRendered }
  | { type: ActionType.qnaToggled; showQna: boolean }
  | { type: ActionType.tabChange };
//#endregion

//#region Styling
const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
//#endregion

const initialState: ReportTemplateState = {
  report: undefined,
  pages: [],
  // Controls the visibility of the qna modal window
  showQna: false,
  // CSS classes that apply to the current active tab
  style: undefined,
  // Controls which tab should be active
  isLoaded: false,
  isRendered: true,
};

function reducer(
  prevState: ReportTemplateState,
  action: ReportTemplateAction
): ReportTemplateState {
  switch (action.type) {
    case ActionType.reportLoaded:
      return {
        ...prevState,
        report: action.report,
        pages: action.pages,
        isLoaded: true,
      };
    case ActionType.pageHeightUpdate:
      return {
        ...prevState,
        style: {
          height: action.height + "px",
        },
      };
    case ActionType.tabChange:
      return {
        ...prevState,
        isRendered: false,
      };
    case ActionType.reportRendered:
      return {
        ...prevState,
        isRendered: true,
      };
    case ActionType.qnaToggled:
      return { ...prevState, showQna: action.showQna };
    default:
      throw new Error("Invalid action type");
  }
}

/**
 * Calculate the report's page height based on the current window width,
 * while maintaining its aspect ratio.
 *
 * @param page Powerbi Report page
 * @returns calculated height or undefined if the report didn't have a default size.
 */
function computeHeight(page: Page) {
  const height = page.defaultSize.height ?? window.innerHeight;
  const width = page.defaultSize.width ?? window.innerWidth;

  const aspectRatio = height / width;
  const currentWidth = window.innerWidth - HORIZONTAL_MARGIN * 2;
  return aspectRatio * currentWidth;
}

/**
 * Template powerbi report page, with tab navigation for paginated reports.
 */
function ReportTemplate() {
  // const { activePageName, qnaParams, reportParams } = props;

  const [state, dispatch] = useReducer(reducer, initialState);

  const { workspaceId, section: activePageName, reportId, qnaId } = useParams();

  const toggleModal = () =>
    dispatch({ type: ActionType.qnaToggled, showQna: !state.showQna });

  /**
   * Runs when the report loads for the first time
   * since the handle click is not selected when the report is loaded or refreshed. It uses
   * urlParams.section instead of eventKey in order to check what tab should be selected based on the url entry.
   */
  const handleReportLoaded: EventHandler = (event, embed) => {
    const report = embed as BIReport;
    report.getPages().then((pages) => {
      dispatch({
        type: ActionType.reportLoaded,
        report: report,
        pages: pages,
      });
    });
  };

  /**
   * Is used to change the height of the page to reflect the size of the window when the tab is changed and page is loaded.
   * This is out of the handleSelect and handleReportLoaded because the report page needs to be set in order to get the height and adjust the window size.
   */
  // TODO Move this logic to a hook
  useEffect(() => {
    const getHeight = async () => {
      if (!state.report) return;
      const activeReportPage = await state.report.getActivePage();
      const pageHeight = computeHeight(activeReportPage);

      if (pageHeight) {
        dispatch({ type: ActionType.pageHeightUpdate, height: pageHeight });
      }
    };
    getHeight();
  }, [state.report, activePageName]);

  const handleReportRendered = () => {
    dispatch({ type: ActionType.reportRendered });
  };

  const currentPage = state.pages.find((page) => page.name === activePageName);
  const pageTitle = currentPage?.displayName ?? "Untitled Page";

  const embedParams: IReportParam = {
    type: EmbedType.Report,
    workspaceId: workspaceId as string,
    id: reportId as string,
  };

  const qnaParams: IReportParam = {
    type: EmbedType.Report,
    workspaceId: workspaceId as string,
    id: qnaId ?? "",
  };

  return (
    <>
      <Loading isLoaded={state.isLoaded} />
      {/* css working for Core insights reports */}
      <PageHeader>
        <Heading className="mb-0">{pageTitle}</Heading>

        {process.env.REACT_APP_DEPLOY_ENV !== "prod" && (
          <ExportDropdown
            pages={state.pages}
            reportId={reportId as string}
            //  defaultBookmarkState can be passed to capture current report state
          />
        )}
      </PageHeader>
      <Report
        onLoaded={handleReportLoaded}
        onRendered={handleReportRendered}
        activePage={activePageName}
        params={embedParams}
        style={state.style}
      />

      {qnaId && (
        <QnaModal
          title={pageTitle + " Q & A"}
          params={qnaParams}
          show={state.showQna}
          onHide={toggleModal}
        />
      )}

      <FloatingButton
        title="Interactive QnA"
        onClick={toggleModal}
        Icon={RiQuestionAnswerLine}
      />
    </>
  );
}

export default ReportTemplate;
