import { InterestRate } from '@aave/contract-helpers';
import { NavigateFunction } from 'react-router';

export const toggleBorrowRateMode = (
  navigate: NavigateFunction,
  borrowRateMode: InterestRate,
  underlyingAsset: string
) => {
  navigate(`/interest-swap/${underlyingAsset}/confirmation?borrowRateMode=${borrowRateMode}`);
};
