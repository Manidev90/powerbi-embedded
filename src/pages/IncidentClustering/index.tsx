import styled, { css } from "styled-components/macro";
import Heading from "../../components/Heading";
import Visualization from "../../packages/qlik-react/components/Visualization";
import EngineConnection from "../../packages/qlik-react/contexts/EngineConnection";
import QlikLoginRedirect from "./QlikLoginRedirect";
import Toolbar from "./Toolbar";

//#region Styling
const gutter = "30px";

const borderStyle = css`
  border: 1px solid var(--qlik-card-border-color);
  border-radius: var(--qlik-card-border-radius);
`;

const firstColumn = css`
  grid-column: 1 / 3;
`;

const secondColumn = css`
  grid-column: 3 / 4;
`;

const fullWidth = css`
  grid-column: 1 / 4;
`;

const Header = styled.div`
  margin-bottom: ${gutter};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 31rem;
  gap: ${gutter};
`;

const Card = styled(Visualization)`
  padding: 0.5rem;
  ${borderStyle}

  :hover {
    box-shadow: var(--qlik-card-box-shadow);
  }
`;
//#endregion

function IncidentClustering() {
  return (
    <EngineConnection
      host="icsanalytics.portal.nttdataservices.com"
      appId="c724efe4-7031-4b1b-af6e-93c362c4e73f"
      port={443}
    >
      <QlikLoginRedirect endpoint="https://nucleus.portal.nttdataservices.com" />
      <Header>
        <Heading>Incident Clustering - Event Generated</Heading>
        <Toolbar css={borderStyle} />
      </Header>
      <Grid>
        <Card render={{ type: "barchart", id: "Jejur" }} css={firstColumn} />
        <Card render={{ type: "table", id: "CrGnHXK" }} css={secondColumn} />
        <Card render={{ type: "table", id: "tBzhHT" }} css={firstColumn} />
        <Card render={{ type: "table", id: "hNmSDm" }} css={secondColumn} />
        <Card render={{ type: "pivot-table", id: "SSwsXTU" }} css={fullWidth} />
      </Grid>
    </EngineConnection>
  );
}

export default IncidentClustering;
