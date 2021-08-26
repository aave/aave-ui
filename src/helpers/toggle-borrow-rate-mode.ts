import { History } from 'history';
import { InterestRate } from '@aave/protocol-js';

export const toggleBorrowRateMode = (
  history: History,
  symbol: string,
  reserveID: string,
  borrowRateMode: InterestRate
) => {
  history.push(
    `/interest-swap/${symbol}-${reserveID}/confirmation?borrowRateMode=${borrowRateMode}`
  );
};
