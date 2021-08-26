import { BorrowRateMode } from '../../libs/pool-data-provider/graphql';

export interface HistoryItemTypes {
  type?:
    | 'Deposit'
    | 'Borrow'
    | 'RedeemUnderlying'
    | 'Repay'
    | 'Swap'
    | 'UsageAsCollateral'
    | 'LiquidationCall'
    | 'OriginationFeeLiquidation'
    | 'RebalanceStableBorrowRate';
  symbol?: string;
  date: number;

  amount?: number | string;
  amountInUsd?: number | string;

  condition?: boolean;
  borrowRate?: number | string;
  borrowRateMode?: BorrowRateMode;

  collateralAmountSymbol?: string;
  collateralAmount?: number | string;
  collateralAmountInUsd?: number | string;

  transactionLink: string;
}
