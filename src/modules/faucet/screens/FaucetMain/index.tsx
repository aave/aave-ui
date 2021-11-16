import React from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';

import { useStaticPoolDataContext } from '../../../../libs/pool-data-provider';
import ScreenWrapper from '../../../../components/wrappers/ScreenWrapper';
import Preloader from '../../../../components/basic/Preloader';
import FaucetAssetTable from '../../components/FaucetAssetTable';

import messages from './messages';

import { FaucetTableItem } from '../../components/FaucetAssetTable/types';

export default function FaucetMain() {
  const intl = useIntl();
  const { userId, rawReserves, networkConfig, walletData } = useStaticPoolDataContext();

  if (!walletData) {
    return <Preloader />;
  }

  const listData = rawReserves
    .filter(
      (reserve) => reserve.symbol.toUpperCase() !== networkConfig.baseAsset && !reserve.isFrozen
    )
    .map<FaucetTableItem>((reserve) => {
      const walletBalance =
        walletData[reserve.underlyingAsset]?.amount === '0'
          ? valueToBigNumber('0')
          : valueToBigNumber(walletData[reserve.underlyingAsset].amount).dividedBy(
              valueToBigNumber('10').pow(reserve.decimals)
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
