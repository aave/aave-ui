import { History } from 'history';
import { InterestRate } from '@aave/protocol-js';

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
