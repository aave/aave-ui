import queryString from 'querystring';
import { History } from 'history';

export const toggleUseAsCollateral = (
  history: History,
  reserveId: string | undefined,
  asCollateral: boolean | undefined,
  underlyingAsset: string | undefined
) => {
  const query = queryString.stringify({ asCollateral });
  history.push(`/usage-as-collateral/${underlyingAsset}-${reserveId}/confirmation?${query}`);
};
