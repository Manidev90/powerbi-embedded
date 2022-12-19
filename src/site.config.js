/** @type {import("site-config").SiteConfig}*/
export default {
  headerLinks: [
    { label: "Core Insights", to: "/core-insights" },
    { label: "Integrated Delivery", to: "/integrated-delivery" },
  ],
  content: [
    {
      // Core Insights
      workspaces: {
        dev: "bb4c962a-f7c1-4f94-9a1a-7c9dcbdbc354",
        qa: "dbf295df-5924-4edf-9a2f-1c11d8a3b52a",
        stg: "15adcfff-6b96-42f4-b7fd-d8b6b397474c",
        prod: "dddd5e84-c186-4ac4-89fd-9fd6b533a2ec",
      },
      elements: [
        {
          type: "dashboard",
          resourceName: "CIOverview",
          id: {
            dev: "530713ce-1189-4dee-92b9-47286e1b090e",
            qa: "b5e6e225-2d69-43fc-bbed-ba48ce930d74",
            stg: "42209083-ebef-4b91-a528-ff0c8c616179",
            prod: "b7c8c502-7e65-478d-ad8c-2c4e8db19c81",
          },
        },
        {
          type: "report",
          id: {
            dev: "b4956a70-2e76-40b7-8a20-daa9c411cf35",
            qa: "2b38f233-ab60-4d9e-ad3f-70223866b1c6",
            stg: "9f4fa4e4-8954-46e1-89d3-8e008b41bd67",
            prod: "12511251-4e6d-4422-b2f7-819f515420de",
          },
          pages: {
            assets: "ReportSection7e072bb911e28abb6943",
            backups: "ReportSection08965a529d1c2df6dc52",
            monitoring: "ReportSectionc7bfb60d1f9526ddd622",
            patching: "ReportSection03479753e7d73543ad01",
            antivirus: "ReportSectiond4a65e06ea1ea3e7a57b",
          },
          qnaReportId: {
            dev: "f8ddd7bf-0b59-48d7-b736-3f7ee71bf086",
            qa: "3a679e17-0d43-48bd-a699-8562bf8719ce",
            stg: "139d7679-2689-4b3c-a564-6760f88cf10c",
            prod: "24c2f445-c022-43db-999e-e09e57064441",
          },
        },
        {
          type: "report",
          id: {
            dev: "b1863007-eb47-4612-816d-88c6e6b0309a", //STG
            qa: "27eb3575-fca1-438c-af73-5a4026e6722e",
            stg: "b1863007-eb47-4612-816d-88c6e6b0309a", //STG
            prod: "f096a7ce-a905-402b-b96c-2d1a0f4bcc3e",
          },
          pages: {
            riskIndex: "ReportSectionb3f3e16c58b0ea07e52d",
          },
          qnaReportId: {
            dev: "f8ddd7bf-0b59-48d7-b736-3f7ee71bf086",
            qa: "3a679e17-0d43-48bd-a699-8562bf8719ce",
            stg: "139d7679-2689-4b3c-a564-6760f88cf10c",
            prod: "24c2f445-c022-43db-999e-e09e57064441",
          },
        },
      ],
    },
    // Integrated Delivery
    {
      workspaces: {
        dev: "22ae953c-cfa1-4fa2-ba05-3ef52aca1b09",
        qa: "ba403e94-773a-4c1c-9350-ddbd9f68ed72",
        stg: "4df96960-fc87-4f8e-be5a-9e73341454e2",
        prod: "589d7faf-c6ac-43ae-acb9-84414831fd6a",
      },
      elements: [
        {
          type: "dashboard",
          resourceName: "IDOverview",
          id: {
            dev: "fca36f65-7910-4e72-9fa3-5b875f82a643",
            qa: "56464627-4b17-4fb7-9a12-1897a603d44c",
            stg: "0bad22c7-14d6-40f7-abec-a6cee9b70df6",
            prod: "daf1beef-2b62-4a0d-b04a-629b388e44ee",
          },
        },
        {
          type: "report",
          id: {
            dev: "de0f3ef6-978c-4649-ac19-6164ae71149c",
            qa: "13310a64-c07f-46c1-804a-8eb0c1f22a7c",
            stg: "029e7a89-d460-4765-9033-1d5e0d2fddc5",
            prod: "824f930b-d9ee-4d2c-b66f-6ad926f1d7bc",
          },
          pages: {
            commvault: "ReportSectionc25fc8e7648c5050d3e9",
            rubrik: "ReportSectionabad9558d83934e3d00c",
            "pure-storage": "ReportSection384deb83472e86b80307",
            nasuni: "ReportSection73f0084bfddc701a388a",
            truesight: "ReportSectionc38962f36d1a9e6699f2",
            "solar-winds": "ReportSection42ab762dbb5bb7b4ed4b",
            "rv-tools": "ReportSection3dacdfeebb988fe235f0",
            opsramp: "ReportSection417cd0a2cf9b1bb00d4e",
          },
        },
      ],
    },
  ],
};
