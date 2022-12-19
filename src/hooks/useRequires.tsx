import { useQueries, UseQueryResult } from "@tanstack/react-query";
import fetchEmbedDetails, { IResponse } from "../data/fetchBIResource";
import { IEmbedParam } from "embed-config";
import useAccessToken from "./useAccessToken";
interface UnauthorizedTypes {
  hasAccess: boolean;
  isLoading: boolean;
}

/**
 * Attempts to  fetch embed details for the provided list of embed parameters.
 * If all responses come back without an error it evaluates to true.
 *
 * When "some" is provided if at least 1 embed parameter it will return true.
 *
 * @param params Powerbi Embed params
 * @param some return true if at least one embed parameter's response has no errors.
 */
function useRequires(params: IEmbedParam[], some?: boolean): UnauthorizedTypes {
  const token = useAccessToken();
  // Fetch component details for every param, we'll listen for any error codes
  const result = useQueries({
    queries: params.map((param) => ({
      queryKey: [param, token],
      queryFn: () => fetchEmbedDetails(param),
    })),
  });

  const hasAccess = (res: UseQueryResult<IResponse | null>) =>
    !res.isLoading && !res.isError && res.data;

  return {
    hasAccess: some ? result.some(hasAccess) : result.every(hasAccess),
    isLoading: result.some((response) => response.isLoading),
  };
}

export default useRequires;
