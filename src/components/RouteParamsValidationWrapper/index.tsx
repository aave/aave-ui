import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';
import { useIntl } from 'react-intl';
import { BigNumber, valueToBigNumber } from '@aave/protocol-js';

import { ComputedReserveData, useAppDataContext } from '../../libs/pool-data-provider';
import { CurrencyRouteParamsInterface } from '../../helpers/router-types';
import Preloader from '../basic/Preloader';
import ErrorPage from '../ErrorPage';

import messages from './messages';
import { ComputedUserReserve, FormatUserSummaryAndIncentivesResponse } from '@aave/math-utils';

export interface ValidationWrapperComponentProps
  extends Pick<RouteComponentProps, 'history' | 'location'> {
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
  return (ChildComponent: React.ComponentType<ValidationWrapperComponentProps>) =>
    ({ match, location, history }: RouteComponentProps<CurrencyRouteParamsInterface>) => {
      const intl = useIntl();
      const underlyingAsset = match.params.underlyingAsset.toUpperCase();
      const reserveId = match.params.id;

      const { walletBalances, userEmodeCategoryId, reserves, user, loading } = useAppDataContext();

      const poolReserve = reserves.find((res) =>
        reserveId
          ? res.id === reserveId
          : res.underlyingAsset.toLowerCase() === underlyingAsset.toLowerCase()
      );
      const userReserve = user
        ? user.userReservesData.find((userReserve) =>
            reserveId
              ? userReserve.reserve.id === reserveId
              : userReserve.reserve.underlyingAsset.toLowerCase() === underlyingAsset.toLowerCase()
          )
        : undefined;

      const currencySymbol = poolReserve?.symbol || '';

      if (loading) {
        return <Preloader withText={true} />;
      }

      if (!poolReserve) {
        // TODO: 404
        return <Redirect to="/" />;
      }
      if (!userReserve && withUserReserve) {
        return <Redirect to="/" />;
        // TODO: 404 || redirect || ?
      }

      const walletBalance = valueToBigNumber(
        walletBalances[poolReserve.underlyingAsset]?.amount || '0'
      );
      let isWalletBalanceEnough = true;

      let amount = undefined;
      if (withAmount) {
        const query = queryString.parse(location.search);
        if (typeof query.amount === 'string') {
          amount = valueToBigNumber(query.amount);
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

      const walletBalanceUSD = valueToBigNumber(
        walletBalances[poolReserve.underlyingAsset]?.amountUSD || '0'
      );

      const props = {
        poolReserve,
        userReserve,
        amount,
        user,
        walletBalance,
        walletBalanceUSD,
        isWalletBalanceEnough,
        currencySymbol,
        underlyingAsset,
        history,
        location,
        userEmodeCategoryId,
      };
      return <ChildComponent {...props} />;
    };
}
