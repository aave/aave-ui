import { InterestRate } from '@aave/contract-helpers';

export function loanActionLinkComposer(
  action: 'borrow' | 'repay',
  underlyingAsset: string,
  debtType: InterestRate
): string {
  return `/${action}/${underlyingAsset}?debtType=${debtType}`;
}
