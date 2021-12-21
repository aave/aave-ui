import BigNumber from 'bignumber.js';

export type FaucetTableItem = {
  id: string;
  symbol: string;
  walletBalance: BigNumber;
  userId?: string;
  underlyingAsset: string;
};
