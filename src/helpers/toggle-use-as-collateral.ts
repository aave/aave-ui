import queryString from 'querystring';
import { History } from 'history';

export const toggleUseAsCollateral = (
  history: History,
  symbol: string | undefined,
  reserveId: string | undefined,
  asCollateral: boolean | undefined
) => {
  const query = queryString.stringify({ asCollateral });
  history.push(`/usage-as-collateral/${symbol}-${reserveId}/confirmation?${query}`);
};
