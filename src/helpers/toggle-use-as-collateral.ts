import queryString from 'querystring';
import { NavigateFunction } from 'react-router';

export const toggleUseAsCollateral = (
  navigate: NavigateFunction,
  reserveId: string | undefined,
  asCollateral: boolean | undefined,
  underlyingAsset: string | undefined
) => {
  const query = queryString.stringify({ asCollateral });
  navigate(`/usage-as-collateral/${reserveId}/confirmation?${query}`);
};
