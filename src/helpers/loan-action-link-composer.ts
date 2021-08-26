import { InterestRate } from '@aave/protocol-js';

export function loanActionLinkComposer(
  action: 'borrow' | 'repay',
  symbol: string,
  reserveId: string,
  debtType: InterestRate
): string {
  return `/${action}/${symbol}-${reserveId}?debtType=${debtType}`;
}
