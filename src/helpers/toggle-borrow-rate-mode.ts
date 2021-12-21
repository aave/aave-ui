import { InterestRate } from '@aave/contract-helpers';
import { History } from 'history';

export const toggleBorrowRateMode = (
  history: History,
  reserveID: string,
  borrowRateMode: InterestRate,
  underlyingAsset: string
) => {
  history.push(
    `/interest-swap/${underlyingAsset}-${reserveID}/confirmation?borrowRateMode=${borrowRateMode}`
  );
};
