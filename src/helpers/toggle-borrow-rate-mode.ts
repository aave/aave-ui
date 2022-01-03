import { InterestRate } from '@aave/contract-helpers';
import { NavigateFunction } from 'react-router';

export const toggleBorrowRateMode = (
  navigate: NavigateFunction,
  reserveID: string,
  borrowRateMode: InterestRate
) => {
  navigate(`/interest-swap/${reserveID}/confirmation?borrowRateMode=${borrowRateMode}`);
};
