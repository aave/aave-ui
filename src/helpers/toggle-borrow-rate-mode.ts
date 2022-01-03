import { InterestRate } from '@aave/contract-helpers';
import { NavigateFunction } from 'react-router';

export const toggleBorrowRateMode = (
  navigate: NavigateFunction,
  reserveID: string,
  borrowRateMode: InterestRate,
  underlyingAsset: string
) => {
  navigate(
    `/interest-swap/${underlyingAsset}-${reserveID}/confirmation?borrowRateMode=${borrowRateMode}`
  );
};
