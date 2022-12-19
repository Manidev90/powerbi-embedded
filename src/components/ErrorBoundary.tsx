import Unauthorized from "../pages/Unauthorized";

function ErrorBoundary() {
  // TODO: Handle Different type of errors
  // const error = useRouteError();

  return <Unauthorized />;
}

export default ErrorBoundary;
