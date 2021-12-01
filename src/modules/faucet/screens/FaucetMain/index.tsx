import React from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';

import {
  useDynamicPoolDataContext,
  useStaticPoolDataContext,
} from '../../../../libs/pool-data-provider';
import ScreenWrapper from '../../../../components/wrappers/ScreenWrapper';
import Preloader from '../../../../components/basic/Preloader';
import FaucetAssetTable from '../../components/FaucetAssetTable';

import messages from './messages';

import { FaucetTableItem } from '../../components/FaucetAssetTable/types';

export default function FaucetMain() {
  const intl = useIntl();
  const { userId, networkConfig, walletData } = useStaticPoolDataContext();
  const { reserves } = useDynamicPoolDataContext();

  if (!walletData) {
    return <Preloader />;
  }

  const listData = reserves
    .filter(
      (reserve) => reserve.symbol.toUpperCase() !== networkConfig.baseAsset && !reserve.isFrozen
    )
    .map<FaucetTableItem>((reserve) => {
      const walletBalance = valueToBigNumber(walletData[reserve.underlyingAsset]?.amount || '0');
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
