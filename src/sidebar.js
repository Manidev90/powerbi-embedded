import url from "./utils/url";

/** @type {import("sidebar-config").SidebarConfig}*/
export default {
  "/core-insights": [
    {
      type: "link",
      label: "Overview",
      href: url("CIOverview"),
    },
    {
      type: "link",
      label: "Assets",
      href: url("assets"),
    },
    {
      type: "link",
      label: "Monitoring",
      href: url("monitoring"),
    },
    {
      type: "link",
      label: "Patching",
      href: url("patching"),
    },
    {
      type: "link",
      label: "Backups",
      href: url("backups"),
    },
    {
      type: "link",
      label: "Antivirus",
      href: url("antivirus"),
    },
    {
      type: "link",
      label: "CI Risk Index",
      href: url("riskIndex"),
    },
    {
      type: "link",
      label: "Incident Clustering",
      href: "incident-clustering",
    },
  ],
  "/integrated-delivery": [
    {
      type: "link",
      label: "Overview",
      href: url("IDOverview"),
    },
    {
      type: "category",
      label: "Backup",
      items: [
        {
          type: "link",
          label: "CommVault",
          href: url("commvault"),
        },
        {
          type: "link",
          label: "Rubrik",
          href: url("rubrik"),
        },
      ],
    },
    {
      type: "category",
      label: "Storage",
      items: [
        {
          type: "link",
          label: "Pure Storage",
          href: url("pure-storage"),
        },
        {
          type: "link",
          label: "Nasuni",
          href: url("nasuni"),
        },
      ],
    },
    {
      type: "category",
      label: "OS",
      items: [
        {
          type: "link",
          label: "Truesight",
          href: url("truesight"),
        },
        {
          type: "link",
          label: "Solar Winds",
          href: url("solar-winds"),
        },
        {
          type: "link",
          label: "Opsramp",
          href: url("opsramp"),
        },
      ],
    },
    {
      type: "category",
      label: "Virtualization",
      items: [
        {
          type: "link",
          label: "Rv Tools",
          href: url("rv-tools"),
        },
      ],
    },
  ],
};
