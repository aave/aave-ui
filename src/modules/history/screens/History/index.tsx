import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { ETH_DECIMALS, normalize, valueToBigNumber } from '@aave/protocol-js';
import queryString from 'query-string';

import { unPrefixSymbol, useStaticPoolDataContext } from '../../../../libs/pool-data-provider';
import {
  BorrowRateMode,
  UserHistoryQuery,
  useUserHistoryQuery,
} from '../../../../libs/pool-data-provider/graphql';
import Preloader from '../../../../components/basic/Preloader';
import Pagination from '../../../../components/basic/Pagination';
import ScreenWrapper from '../../../../components/wrappers/ScreenWrapper';
import NoDataPanelWithInfo from '../../../../components/NoDataPanelWithInfo';
import HistoryContent from '../../components/HistoryContent';

import messages from './messages';
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';

const ITEMS_PER_PAGE = 50;

export default function History() {
  const intl = useIntl();
  const location = useLocation();
  const history = useHistory();
  const { currentMarketData, networkConfig } = useProtocolDataContext();
  const { marketRefPriceInUsd, userId, rawReserves } = useStaticPoolDataContext();
  const query = queryString.parse(location.search);
  const page = query.page ? Number(query.page) : 0;

  const { data, loading } = useUserHistoryQuery({
    skip: !userId,
    pollInterval: 30 * 1000,
    variables: {
      id: userId?.toLowerCase() || '',
      pool: currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
      skip: page * ITEMS_PER_PAGE,
      first: ITEMS_PER_PAGE,
    },
  });

  const handlePageChange = (previous: boolean) => {
    let nextPage = page;
    if (previous && page > 0) {
      nextPage -= 1;
    } else if (!previous && data?.userTransactions.length === ITEMS_PER_PAGE) {
      nextPage += 1;
    }
    if (nextPage !== page) {
      history.push(
        `${location.pathname}?${queryString.stringify({ ...query, page: nextPage.toString() })}`
      );
    }
  };

  const historyFormattedData = data
    ? data.userTransactions.map((historyItem: UserHistoryQuery['userTransactions'][0]) => {
        let amountDecimals: number = 0;
        let amount: number | string = 0;
        let symbol: string = '';
        let borrowRate: number = 0;
        let borrowRateMode: BorrowRateMode | undefined = undefined;
        let condition: boolean | undefined = undefined;
        let collateralDecimals: number = 0;
        let collateralAmount: number | string = 0;
        let collateralAmountSymbol: string = '';
        let reserveETHPrice: number | string | undefined = undefined;

        // help functions
        const amountNormalize = (amount: number, decimals: number) =>
          normalize(valueToBigNumber(amount), decimals);
        const ethPrice = (symbol: string) =>
          normalize(
            rawReserves.find((reserve) => reserve.symbol === symbol)
              ?.priceInMarketReferenceCurrency || '0',
            ETH_DECIMALS
          );

        if (
          historyItem.__typename === 'Deposit' ||
          historyItem.__typename === 'Borrow' ||
          historyItem.__typename === 'Repay' ||
          historyItem.__typename === 'RedeemUnderlying' ||
          historyItem.__typename === 'Swap' ||
          historyItem.__typename === 'UsageAsCollateral'
        ) {
          symbol = historyItem.reserve.symbol;
        }

        if (
          historyItem.__typename === 'Deposit' ||
          historyItem.__typename === 'Borrow' ||
          historyItem.__typename === 'Repay' ||
          historyItem.__typename === 'RedeemUnderlying'
        ) {
          reserveETHPrice = ethPrice(symbol);
        }

        if (
          historyItem.__typename === 'Deposit' ||
          historyItem.__typename === 'Borrow' ||
          historyItem.__typename === 'RedeemUnderlying'
        ) {
          amountDecimals = historyItem.reserve.decimals;
          amount = amountNormalize(historyItem.amount, amountDecimals);
        }

        switch (historyItem.__typename) {
          case 'Borrow':
            borrowRate = valueToBigNumber(normalize(historyItem.borrowRate, 27)).toNumber();
            borrowRateMode = historyItem.borrowRateMode;
            break;

          case 'Repay':
            amountDecimals = historyItem.reserve.decimals;
            amount = amountNormalize(historyItem.amount, amountDecimals);
            break;

          case 'Swap':
            condition = historyItem.borrowRateModeFrom === BorrowRateMode.Variable;
            break;

          case 'UsageAsCollateral':
            condition = historyItem.fromState;
            break;

          case 'LiquidationCall':
            amountDecimals = historyItem.principalReserve.decimals;
            amount = amountNormalize(historyItem.principalAmount, amountDecimals);
            symbol = historyItem.principalReserve.symbol;
            collateralDecimals = historyItem.collateralReserve.decimals;
            collateralAmount = amountNormalize(historyItem.collateralAmount, collateralDecimals);
            collateralAmountSymbol = historyItem.collateralReserve.symbol;
            reserveETHPrice = ethPrice(symbol);
            break;
        }

        const amountInUsd =
          amount && reserveETHPrice
            ? valueToBigNumber(amount)
                .multipliedBy(reserveETHPrice)
                .multipliedBy(marketRefPriceInUsd)
            : undefined;

        return {
          type: historyItem.__typename,
          date: historyItem.timestamp,
          amount,
          amountInUsd: amount && amountInUsd && amountInUsd.toNumber(),
          symbol: unPrefixSymbol(symbol, currentMarketData.aTokenPrefix),
          borrowRate,
          borrowRateMode,
          condition,
          collateralAmount,
          collateralAmountSymbol,
          transactionLink: networkConfig.explorerLinkBuilder({ tx: historyItem.id.split(':')[0] }),
        };
      })
    : [];

  return (
    <ScreenWrapper
      pageTitle={intl.formatMessage(messages.pageTitle)}
      isTitleOnDesktop={true}
      withMobileGrayBg={true}
    >
      {loading ? (
        <Preloader withText={true} />
      ) : !!historyFormattedData.length ? (
        <>
          <HistoryContent data={historyFormattedData} />

          {!(page === 0 && data && data.userTransactions.length < ITEMS_PER_PAGE) && (
            <Pagination
              page={page}
              pageChange={handlePageChange}
              nextButtonDisabled={data && data.userTransactions.length < ITEMS_PER_PAGE}
            />
          )}
        </>
      ) : (
        <NoDataPanelWithInfo
          title={intl.formatMessage(messages.noDataTitle)}
          description={intl.formatMessage(messages.noDataDescription)}
          buttonTitle={intl.formatMessage(messages.deposit)}
          infoTextDescription={intl.formatMessage(messages.infoDescription)}
          linkTo="/deposit"
        />
      )}
    </ScreenWrapper>
  );
}
