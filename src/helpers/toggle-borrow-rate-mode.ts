import { InterestRate } from '@aave/contract-helpers';
import { NavigateFunction } from 'react-router';

export const toggleBorrowRateMode = (
  navigate: NavigateFunction,
  reserveID: string,
  borrowRateMode: InterestRate,
  underlyingAsset: string
) => {
  navigate(`/interest-swap/${reserveID}/confirmation?borrowRateMode=${borrowRateMode}`);
};
