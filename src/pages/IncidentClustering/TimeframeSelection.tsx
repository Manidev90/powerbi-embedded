import { Nav, NavProps } from "react-bootstrap";
import { useConnection } from "../../packages/qlik-react/contexts/EngineConnection";

const QLIK_TIMEFRAME_VARIABLE = "vTimeFrame";

function TimeframeSelection() {
  const { app } = useConnection();

  const handleTimeframeChange: NavProps["onSelect"] = async (
    newValue: string | null
  ) => {
    if (app && newValue) {
      // TODO create a useVariable hook, with the same API as useState
      const qVariable = await app.getVariableByName(QLIK_TIMEFRAME_VARIABLE);
      qVariable.setStringValue(newValue);
    }
  };

  const timeframes = [
    ["Today", "Today = {1}"],
    ["Yesterday", "Yesterday = {1}"],
    ["This Week", "ThisWeek = {1}"],
    ["This Month", "ThisMonth = {1}"],
  ];

  return (
    <>
      <Nav
        variant="pills"
        defaultActiveKey={timeframes[0][1]}
        onSelect={handleTimeframeChange}
      >
        {timeframes.map(([name, qExpression]) => (
          <Nav.Link key={name} eventKey={qExpression}>
            {name}
          </Nav.Link>
        ))}
      </Nav>
    </>
  );
}

export default TimeframeSelection;
