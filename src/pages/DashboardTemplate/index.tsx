import { EmbedType } from "powerbi-client-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Dashboard from "../../components/Dashboard";
import Heading from "../../components/Heading";
import Loading from "../../components/Loading";
import { IDashboardParam } from "embed-config";

const StyledDashboard = styled(Dashboard)`
  height: calc(9 / 16 * 74vw);
  padding: 0;
`;

function DashboardTemplate() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { workspaceId, dashboardId } = useParams();

  const embedParams: IDashboardParam = {
    type: EmbedType.Dashboard,
    id: dashboardId as string,
    workspaceId: workspaceId as string,
  };

  return (
    <>
      <Loading isLoaded={isLoaded} />
      <Heading className="mb-2 ms-1">Overview</Heading>
      <StyledDashboard
        params={embedParams}
        onLoaded={() => {
          setIsLoaded(true);
        }}
      />
    </>
  );
}

export default DashboardTemplate;
