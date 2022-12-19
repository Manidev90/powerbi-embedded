import url from "../url";

test("Correctly formats report urls from a configuration file", () => {
  expect(url("Core Insights", "report")).toBe(
    "/my-tab/12345/report/section123456/12345"
  );
});

export {};
