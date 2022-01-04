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
    const underlyingAsset = params.underlyingAsset as string;

    const { walletBalances, userEmodeCategoryId, reserves, user, loading } = useAppDataContext();

    const poolReserve = reserves.find((res) => res.underlyingAsset === underlyingAsset);
    const userReserve = user
      ? user.userReservesData.find(
          (userReserve) => userReserve.reserve.underlyingAsset === underlyingAsset
        )
      : undefined;

    const currencySymbol = poolReserve?.symbol || '';

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

    const walletBalance = valueToBigNumber(walletBalances[underlyingAsset]?.amount || '0');
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

    const walletBalanceUSD = valueToBigNumber(walletBalances[underlyingAsset]?.amountUSD || '0');

    const props = {
      poolReserve,
      userReserve,
      amount,
      user,
      walletBalance,
      walletBalanceUSD,
      isWalletBalanceEnough,
      currencySymbol,
      userEmodeCategoryId,
    };
    return <ChildComponent {...props} />;
  };
}
