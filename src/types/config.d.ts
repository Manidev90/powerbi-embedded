declare module "site-config" {
  export type EnvironmentIds = Record<string, string>;
  export type EmbedInfo =
    | {
        type: "dashboard";
        resourceName: string;
        id: EnvironmentIds;
      }
    | {
        type: "report";
        id: EnvironmentIds;
        pages: Record<string, string>;
        qnaReportId?: EnvironmentIds;
      };
  type NavLink = {
    label: string;
    resourceName: string;
    to: string;
  };
  type ContentInfo = {
    workspaces: EnvironmentIds;
    elements: EmbedInfo[];
  };
  export type SiteConfig = {
    headerLinks: NavLink[];
    content: ContentInfo[];
  };
}
declare module "sidebar-config" {
  export type Category = {
    type: "category";
    label: string;
    items: Item[];
  };
  export type Link = {
    type: "link";
    label: string;
    href: string;
  };

  export type Item = Link | Category;

  export type SidebarConfig = Record<string, Item[]>;
}
declare module "embed-config" {
  import { EmbedType } from "powerbi-client-react";
  interface IBaseParam {
    workspaceId: string;
  }
  export interface IReportParam extends IBaseParam {
    type: EmbedType.Report;
    id: string;
  }
  export interface IDashboardParam extends IBaseParam {
    type: EmbedType.Dashboard;
    id: string;
  }
  export interface IQnaParam extends IBaseParam {
    type: EmbedType.Qna;
    datasetIds: string[];
  }
  export type IEmbedParam = IQnaParam | IReportParam | IDashboardParam;
}
