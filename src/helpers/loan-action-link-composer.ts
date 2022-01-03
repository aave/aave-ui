import { InterestRate } from '@aave/contract-helpers';

export function loanActionLinkComposer(
  action: 'borrow' | 'repay',
  reserveId: string,
  debtType: InterestRate
): string {
  return `/${action}/${reserveId}?debtType=${debtType}`;
}
