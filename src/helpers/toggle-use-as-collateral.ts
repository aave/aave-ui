import { NavigateFunction } from 'react-router';
import { createSearchParams } from 'react-router-dom';

export const toggleUseAsCollateral = (
  navigate: NavigateFunction,
  asCollateral: boolean | undefined,
  underlyingAsset: string | undefined
) => {
  navigate({
    pathname: `/usage-as-collateral/${underlyingAsset}/confirmation`,
    search: createSearchParams({ asCollateral: asCollateral ? 'true' : 'false' }).toString(),
  });
};
