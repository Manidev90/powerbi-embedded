import getId, { embedInfo } from "../powerBiIds";

test("Returns correct Id for stg environment", () => {
  process.env.REACT_APP_DEPLOY_ENV = "stg";
  const key = "CoreinsightsReportID1";

  const resourceId = getId(key);
  expect(resourceId).toStrictEqual(embedInfo[key]["stg"]);
});

test("Returns correct Id for dev environment", () => {
  process.env.REACT_APP_DEPLOY_ENV = "dev";
  const key = "CoreinsightsReportID1";

  const resourceId = getId(key);
  expect(resourceId).toStrictEqual(embedInfo[key]["dev"]);
});

test("Returns correct Id for prod environment", () => {
  process.env.REACT_APP_DEPLOY_ENV = "prod";
  const key = "CoreinsightsReportID1";

  const resourceId = getId(key);
  expect(resourceId).toStrictEqual(embedInfo[key]["prod"]);
});

test("Returns correct Id for qa environment", () => {
  process.env.REACT_APP_DEPLOY_ENV = "qa";
  const key = "CoreinsightsReportID1";

  const resourceId = getId(key);
  expect(resourceId).toStrictEqual(embedInfo[key]["qa"]);
});

test("throws exception for invalid environment", () => {
  process.env.REACT_APP_DEPLOY_ENV = undefined;
  expect(() => getId("CoreinsightsReportID1")).toThrow();
});
