import React from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/math-utils';

import { useAppDataContext } from '../../../../libs/pool-data-provider';
import ScreenWrapper from '../../../../components/wrappers/ScreenWrapper';
import Preloader from '../../../../components/basic/Preloader';
import FaucetAssetTable from '../../components/FaucetAssetTable';

import messages from './messages';

import { FaucetTableItem } from '../../components/FaucetAssetTable/types';
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';

export default function FaucetMain() {
  const intl = useIntl();
  const { networkConfig } = useProtocolDataContext();
  const { reserves, userId, walletBalances } = useAppDataContext();

  if (!walletBalances) {
    return <Preloader />;
  }

  const listData = reserves
    .filter(
      (reserve) =>
        reserve.symbol.toUpperCase() !== networkConfig.baseAssetSymbol &&
        !reserve.isFrozen &&
        reserve.symbol.toUpperCase() !== 'WETH' &&
        reserve.symbol.toUpperCase() !== 'WFTM' &&
        reserve.symbol.toUpperCase() !== 'WONE' &&
        reserve.symbol.toUpperCase() !== 'WAVAX' &&
        reserve.symbol.toUpperCase() !== 'WMATIC'
    )
    .map<FaucetTableItem>((reserve) => {
      const walletBalance = valueToBigNumber(
        walletBalances[reserve.underlyingAsset]?.amount || '0'
      );
      return {
        ...reserve,
        walletBalance,
      };
    });

  return (
    <ScreenWrapper
      pageTitle={intl.formatMessage(messages.pageTitle)}
      isTitleOnDesktop={true}
      withMobileGrayBg={true}
    >
      <FaucetAssetTable listData={listData} userId={userId} />
    </ScreenWrapper>
  );
}
