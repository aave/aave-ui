import { InterestRate } from '@aave/protocol-js';

export function loanActionLinkComposer(
  action: 'borrow' | 'repay',
  reserveId: string,
  debtType: InterestRate,
  underlyingAsset: string
): string {
  return `/${action}/${underlyingAsset}-${reserveId}?debtType=${debtType}`;
}
