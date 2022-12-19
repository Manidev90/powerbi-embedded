import { EmbedProps, EventHandler, PowerBIEmbed } from "powerbi-client-react";
import { IReportParam } from "embed-config";

import { useQuery } from "@tanstack/react-query";
import { IReportEmbedConfiguration } from "powerbi-client";
import { BackgroundType, TokenType } from "powerbi-models";
import React from "react";
import styled from "styled-components";
import fetchEmbedDetails, { IReportResponse } from "../data/fetchBIResource";
import useAccessToken from "../hooks/useAccessToken";

export type ReportEvents = {
  /**An error event is emitted to describe a failed operation. */
  onError?: EventHandler;

  /**The buttonClicked event is raised when a user clicks on a Report button */
  onButtonClicked?: EventHandler;

  /**The commandTriggered event is raised when a user clicks on an extension command. */
  onCommandTriggered?: EventHandler;

  /**The dataHyperlinkClicked event is raised when a hyperlink is clicked, and the
   * hyperlink's behavior is set to NavigateAndRaiseEvent or RaiseEvent. */
  onDataHyperlinkClicked?: EventHandler;

  /**The dataSelected event is raised when a specific data point is selected. */
  onDataSelected?: EventHandler;

  /**The loaded event is raised when the report initializes */
  onLoaded?: EventHandler;

  /**The pageChanged event is raised whenever a page is changed. */
  onPageChanged?: EventHandler;

  /**The rendered event is raised when a report is fully rendered. */
  onRendered?: EventHandler;

  /**The saveAsTriggered event is raised when a user clicks on Save As in the UI */
  onSaveAsTriggered?: EventHandler;

  /**The saved event is raised when a save is triggered by a save or saveAs action
   * in the UI or by using the APIs.*/
  onSaved?: EventHandler;

  /**The selectionChanged event is raised whenever the user is changing the selected visual.  */
  onSelectionChanged?: EventHandler /*
  
  /**The visualClicked event is raised every time a visual is clicked. */;
  onVisualClicked?: EventHandler;

  /**The visualRendered event is raised when a visual is rendered (requires setting
   * visualRenderedEvents to true in the settings object). */
  onVisualRendered?: EventHandler;

  /**The swipeStart event is raised when the user starts a swipe in a mobile layout */
  onSwipeStart?: EventHandler;

  /**The swipeEnd event is raised when the user ends a swipe in a mobile layout */
  onSwipeEnd?: EventHandler;
};

export type ReportProps = Omit<
  EmbedProps,
  "embedConfig" | "eventHandlers" | "cssClassName"
> &
  ReportEvents & {
    className?: string;
    activePage?: string;
    params: IReportParam;
    style?: React.CSSProperties;
    /**when supplied it overrides the default embed configuration */
    embedConfig?: IReportEmbedConfiguration;
  };

/**Default embed configuration */
export const BASE_CONFIG: Readonly<IReportEmbedConfiguration> = {
  type: "report",
  tokenType: TokenType.Aad,
  settings: {
    personalBookmarksEnabled: true,
    background: BackgroundType.Transparent,
    panes: {
      filters: {
        visible: false,
      },
      pageNavigation: {
        visible: false,
      },
    },
  },
};

const ReportWrapper = styled.div`
  position: relative;
`;

const Report = React.forwardRef<HTMLDivElement, ReportProps>((props, ref) => {
  const {
    activePage,
    params,
    style,
    embedConfig,
    className,
    onButtonClicked,
    onCommandTriggered,
    onDataHyperlinkClicked,
    onDataSelected,
    onLoaded,
    onPageChanged,
    onRendered,
    onSaveAsTriggered,
    onSaved,
    onSelectionChanged,
    onVisualClicked,
    onVisualRendered,
    onSwipeStart,
    onSwipeEnd,
    onError,
    ...rest
  } = props;

  const accessToken = useAccessToken();

  const { data: resource, error } = useQuery([params, accessToken], () =>
    fetchEmbedDetails(params)
  );

  if (error) {
    throw error;
  }

  const config: IReportEmbedConfiguration = {
    ...BASE_CONFIG,
    ...embedConfig,
    pageName: activePage,
    accessToken: accessToken,
    embedUrl: (resource as IReportResponse)?.embedUrl,
  };

  const eventHandlers: Map<string, EventHandler> = new Map([
    ["buttonClicked", (...args) => onButtonClicked?.(...args)],
    ["commandTriggered", (...args) => onCommandTriggered?.(...args)],
    ["dataHyperlinkClicked", (...args) => onDataHyperlinkClicked?.(...args)],
    ["dataSelected", (...args) => onDataSelected?.(...args)],
    ["loaded", (...args) => onLoaded?.(...args)],
    ["pageChanged", (...args) => onPageChanged?.(...args)],
    ["rendered", (...args) => onRendered?.(...args)],
    ["saveAsTriggered", (...args) => onSaveAsTriggered?.(...args)],
    ["saved", (...args) => onSaved?.(...args)],
    ["selectionChanged", (...args) => onSelectionChanged?.(...args)],
    ["visualClicked", (...args) => onVisualClicked?.(...args)],
    ["visualRendered", (...args) => onVisualRendered?.(...args)],
    ["swipeStart", (...args) => onSwipeStart?.(...args)],
    ["swipeEnd", (...args) => onSwipeEnd?.(...args)],
    ["error", (...args) => onError?.(...args)],
  ]);

  return (
    <ReportWrapper style={style} ref={ref}>
      <PowerBIEmbed
        embedConfig={config}
        eventHandlers={eventHandlers}
        cssClassName={className}
        {...rest}
      />
    </ReportWrapper>
  );
});

Report.displayName = "Report";

export default Report;
