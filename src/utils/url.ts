import { generatePath } from "react-router-dom";
import { EmbedInfo, EnvironmentIds } from "site-config";
import config from "../site.config";

type WorkspaceToEmbedInfo = [EnvironmentIds, EmbedInfo];

const nameToEmbedInfo = new Map<string, WorkspaceToEmbedInfo>();

for (const contentInfo of config.content) {
  const { workspaces, elements } = contentInfo;
  for (const element of elements) {
    switch (element.type) {
      case "report": {
        for (const name in element.pages) {
          nameToEmbedInfo.set(name, [workspaces, element]);
        }
        break;
      }
      case "dashboard":
        {
          nameToEmbedInfo.set(element.resourceName, [workspaces, element]);
        }
        break;
    }
  }
}

/**
 * Build the correct url pattern for a embed parameter.
 *
 * @param resourceName The name specified for this parameter on the site configuration.
 * @returns formatted URL string
 */
function url(resourceName: string) {
  const env = process.env.REACT_APP_DEPLOY_ENV;
  const embedInfo = nameToEmbedInfo.get(resourceName);

  if (!embedInfo) {
    throw new Error(
      `Embed configuration for '${resourceName}'\
       is not present on the site configuration.`
    );
  }

  const [workspaces, params] = embedInfo;
  const workspaceId = workspaces[env];

  switch (params.type) {
    case "report": {
      // TODO: Combine this into a function such as generateReportUrl()
      const reportId = params.id[env];
      const section = params.pages[resourceName];
      const qnaId = params.qnaReportId?.[env];

      if (qnaId) {
        return generatePath(":workspaceId/report/:reportId/:section/:qnaId", {
          workspaceId,
          reportId,
          section,
          qnaId,
        });
      }

      return generatePath(":workspaceId/report/:reportId/:section", {
        workspaceId,
        reportId,
        section,
      });
    }

    case "dashboard": {
      const dashboardId = params.id[env];

      return generatePath(":workspaceId/dashboard/:dashboardId", {
        dashboardId,
        workspaceId,
      });
    }
    default:
      throw new Error(`Unrecognized resource type ${params}.`);
  }
}

export default url;
