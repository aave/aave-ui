import { BigNumber } from '@aave/protocol-js';

export type FaucetTableItem = {
  id: string;
  symbol: string;
  walletBalance: BigNumber;
  userId?: string;
  underlyingAsset: string;
};
