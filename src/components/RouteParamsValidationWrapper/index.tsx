import React from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import {
  ComputedUserReserve,
  FormatUserSummaryAndIncentivesResponse,
  valueToBigNumber,
} from '@aave/math-utils';
import BigNumber from 'bignumber.js';

import { ComputedReserveData, useAppDataContext } from '../../libs/pool-data-provider';
import Preloader from '../basic/Preloader';
import ErrorPage from '../ErrorPage';

import messages from './messages';
import { useProtocolDataContext } from '../../libs/protocol-data-provider';
import { API_ETH_MOCK_ADDRESS } from '@aave/contract-helpers';

export interface ValidationWrapperComponentProps {
  currencySymbol: string;
  amount?: BigNumber;
  walletBalance: BigNumber;
  walletBalanceUSD: BigNumber;
  isWalletBalanceEnough: boolean;
  user?: FormatUserSummaryAndIncentivesResponse;
  poolReserve: ComputedReserveData;
  userReserve?: ComputedUserReserve;
  userEmodeCategoryId: number;
}

interface RouteParamValidationWrapperProps {
  withUserReserve?: boolean;
  withWalletBalance?: boolean;
  withAmount?: boolean;
  allowLimitAmount?: boolean; // -1 for sending everything
}

export default function routeParamValidationHOC({
  withUserReserve,
  withWalletBalance,
  withAmount,
  allowLimitAmount,
}: RouteParamValidationWrapperProps) {
  return (ChildComponent: React.ComponentType<ValidationWrapperComponentProps>) => () => {
    const intl = useIntl();
    const params = useParams();
    const [search] = useSearchParams();
    const { networkConfig } = useProtocolDataContext();
    const underlyingAsset = params.underlyingAsset as string;
    const isWrapped = underlyingAsset.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase();

    const { walletBalances, userEmodeCategoryId, reserves, user, userId, loading } =
      useAppDataContext();

    const poolReserve = reserves.find((res) =>
      !isWrapped
        ? res.underlyingAsset === underlyingAsset
        : res.symbol.toLowerCase() === networkConfig.wrappedBaseAssetSymbol?.toLowerCase()
    );
    const userReserve =
      userId && user
        ? user.userReservesData.find((userReserve) =>
            !isWrapped
              ? userReserve.reserve.underlyingAsset === underlyingAsset
              : userReserve.reserve.symbol.toLowerCase() ===
                networkConfig.wrappedBaseAssetSymbol?.toLowerCase()
          )
        : undefined;

    const currencySymbol = isWrapped ? networkConfig.baseAsset : poolReserve?.symbol || '';

    if (loading) {
      return <Preloader withText={true} />;
    }

    if (!poolReserve) {
      // TODO: 404
      return <Navigate to="/" />;
    }
    if (!userReserve && withUserReserve) {
      return <Navigate to="/" />;
      // TODO: 404 || redirect || ?
    }

    const txnAsset = isWrapped ? API_ETH_MOCK_ADDRESS.toLowerCase() : underlyingAsset;

    const walletBalance = valueToBigNumber(walletBalances[txnAsset]?.amount || '0');
    let isWalletBalanceEnough = true;

    let amount = undefined;
    if (withAmount) {
      const _amount = search.get('amount');
      if (_amount) {
        amount = valueToBigNumber(_amount);
      }
      if (
        !amount ||
        amount.isNaN() ||
        !((allowLimitAmount && amount.eq('-1')) || amount.isPositive())
      ) {
        // TODO: amount invalid
        return <ErrorPage description={intl.formatMessage(messages.error)} buttonType="back" />;
      }
      if (
        withWalletBalance &&
        (walletBalance.eq(0) || (!amount.eq('-1') && amount.gt(walletBalance)))
      ) {
        // TODO: wallet balance is too low
        isWalletBalanceEnough = false;
      }
    }

    const walletBalanceUSD = valueToBigNumber(walletBalances[txnAsset]?.amountUSD || '0');

    const props = {
      poolReserve: { ...poolReserve, underlyingAsset: txnAsset },
      userReserve,
      amount,
      user: userId ? user : undefined,
      walletBalance,
      walletBalanceUSD,
      isWalletBalanceEnough,
      currencySymbol,
      userEmodeCategoryId,
    };
    return <ChildComponent {...props} />;
  };
}
