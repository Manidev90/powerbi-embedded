import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import Layout from "./pages/Layout";
import sidebar from "./sidebar";
import siteConfig from "./site.config";
import firstSidebarLink from "./utils/firstSidebarLink";

const IncidentClustering = lazy(() => import("./pages/IncidentClustering"));
const ErrorBoundary = lazy(() => import("./components/ErrorBoundary"));
const NotFound = lazy(() => import("./pages/NotFound/index."));
const ReportTemplate = lazy(() => import("./components/ReportTemplate"));
const DashboardTemplate = lazy(() => import("./pages/DashboardTemplate"));

// Add template routes to the paths specified in the sidebar configuration
// so that every top-level path can render any embedded template component.
const ALL_ROUTES: RouteObject[] = Object.entries(sidebar).map(
  ([path, item]) => ({
    // react-router uses relative paths  remove leading '/'
    // to match 'core-insights' instead of '/core-insights'
    path: path.replace(/^\/*/, ""),
    children: [
      {
        path: ":workspaceId/report/:reportId/:section",
        element: <ReportTemplate />,
        errorElement: <ErrorBoundary />,
        // Optional Qna
        children: [{ path: ":qnaId", element: <ReportTemplate /> }],
      },
      {
        path: ":workspaceId/dashboard/:dashboardId",
        element: <DashboardTemplate />,
        errorElement: <ErrorBoundary />,
      },
      // Redirect users to the first link to support paths such as /core-insights/ && /integrated-delivery/
      {
        path: "",
        element: <Navigate to={firstSidebarLink(item) ?? ""} replace />,
      },
    ],
  })
);

const { headerLinks } = siteConfig;
const firstTab = headerLinks[0];

const APP_ROUTES: RouteObject[] = [
  {
    path: "*",
    element: <Layout />,
    children: [
      ...ALL_ROUTES,
      // TODO: Combine Qlik-Template with all routes
      {
        path: "core-insights",
        children: [
          { path: "incident-clustering", element: <IncidentClustering /> },
        ],
      },
      // Assuming the first tab is the homepage
      { path: "", element: <Navigate to={firstTab.to} replace /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export default APP_ROUTES;
