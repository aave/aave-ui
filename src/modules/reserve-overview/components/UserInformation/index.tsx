import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import {
  ComputedUserReserve,
  FormatUserSummaryAndIncentivesResponse,
  valueToBigNumber,
} from '@aave/math-utils';
import { useThemeContext } from '@aave/aave-ui-kit';
import BigNumber from 'bignumber.js';

import { ComputedReserveData } from '../../../../libs/pool-data-provider';
import { isAssetStable } from '../../../../helpers/config/assets-config';
import { toggleUseAsCollateral } from '../../../../helpers/toggle-use-as-collateral';
import Row from '../../../../components/basic/Row';
import Link from '../../../../components/basic/Link';
import DefaultButton from '../../../../components/basic/DefaultButton';
import Value from '../../../../components/basic/Value';
import ValuePercent from '../../../../components/basic/ValuePercent';
import CustomSwitch from '../../../../components/basic/CustomSwitch';
import GradientPlusButton from '../../../../components/basic/GradientPlusButton';
import HealthFactor from '../../../../components/HealthFactor';
import CollateralHelpModal from '../../../../components/HelpModal/CollateralHelpModal';
import BorrowTable from '../BorrowTable';
import BorrowTableItem from '../BorrowTable/BorrowTableItem';
import InfoBanner from '../../../../components/InfoBanner';
import UserEModeInfo from '../UserEModeInfo';
import EModeIconWithTooltip from '../../../../components/eMode/EModeIconWithTooltip';
import AvailableCapsHelpModal from '../../../../components/caps/AvailableCapsHelpModal';
import { CapType } from '../../../../components/caps/helper';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';
import staticStyles from './style';

interface UserInformationProps {
  user?: FormatUserSummaryAndIncentivesResponse;
  poolReserve: ComputedReserveData;
  userReserve?: ComputedUserReserve;
  symbol: string;
  walletBalance: BigNumber;
  userEmodeCategoryId: number;
}

export default function UserInformation({
  user,
  userReserve,
  poolReserve,
  symbol,
  walletBalance,
  userEmodeCategoryId,
}: UserInformationProps) {
  const intl = useIntl();
  const { currentTheme, xl, sm } = useThemeContext();
  const navigate = useNavigate();

  const [contentVisible, setContentVisibility] = useState(false);

  useEffect(() => {
    if (contentVisible && !sm) {
      setContentVisibility(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sm]);

  const totalBorrows = valueToBigNumber(userReserve?.totalBorrows || '0').toNumber();
  const underlyingBalance = valueToBigNumber(userReserve?.underlyingBalance || '0').toNumber();

  const maxUserAmountToBorrow = valueToBigNumber(
    user?.availableBorrowsMarketReferenceCurrency || 0
  ).div(poolReserve.priceInMarketReferenceCurrency);
  let availableBorrows = BigNumber.max(
    BigNumber.min(
      poolReserve.borrowCap
        ? new BigNumber(poolReserve.availableLiquidity).multipliedBy('0.995')
        : poolReserve.availableLiquidity,
      maxUserAmountToBorrow
    ),
    0
  );
  if (
    availableBorrows.gt(0) &&
    user?.totalBorrowsMarketReferenceCurrency !== '0' &&
    maxUserAmountToBorrow.lt(valueToBigNumber(poolReserve.availableLiquidity).multipliedBy('1.01'))
  ) {
    availableBorrows = availableBorrows.multipliedBy('0.99');
  }
  const formattedAvailableBorrows = availableBorrows.toString(10);

  let availableToDeposit = valueToBigNumber(walletBalance);
  if (poolReserve.supplyCap !== '0') {
    availableToDeposit = BigNumber.min(
      availableToDeposit,
      new BigNumber(poolReserve.supplyCap).minus(poolReserve.totalLiquidity).multipliedBy('0.995')
    );
  }
  const formattedAvailableDeposits =
    availableToDeposit.toNumber() <= 0 ? 0 : availableToDeposit.toString(10);

  const switcherHeight = xl && !sm ? 16 : sm ? 26 : 20;
  const switcherWidth = xl && !sm ? 30 : sm ? 50 : 40;
  const rowWeight = sm ? 'light' : 'normal';
  const elementsColor = sm ? 'white' : 'dark';

  const canBeEnabledAsCollateral =
    poolReserve.usageAsCollateralEnabled &&
    ((!poolReserve.isIsolated && !user?.isInIsolationMode) ||
      user?.isolatedReserve?.underlyingAsset === poolReserve.underlyingAsset ||
      (poolReserve.isIsolated && user?.totalCollateralMarketReferenceCurrency === '0'));

  const borrowableAssetInIsolationMode =
    user?.isInIsolationMode &&
    poolReserve.borrowableInIsolation &&
    isAssetStable(symbol) &&
    formattedAvailableBorrows &&
    !poolReserve.isFrozen;

  const isUserOnEmode = userEmodeCategoryId !== 0;
  const isReserveInEmode = isUserOnEmode && userEmodeCategoryId === poolReserve.eModeCategoryId;
  const isBorrowEnableBasedOnEmode =
    isReserveInEmode && isAssetStable(symbol) && formattedAvailableBorrows && !poolReserve.isFrozen;

  let isBorrowEnable =
    !formattedAvailableBorrows || poolReserve.borrowingEnabled || !poolReserve.isFrozen;
  if (isReserveInEmode && user?.isInIsolationMode) {
    isBorrowEnable = !!isBorrowEnableBasedOnEmode && !!borrowableAssetInIsolationMode;
  } else if (isUserOnEmode) {
    isBorrowEnable = !!isBorrowEnableBasedOnEmode;
  } else if (user?.isInIsolationMode) {
    isBorrowEnable = !!borrowableAssetInIsolationMode;
  } else {
    isBorrowEnable =
      !!formattedAvailableBorrows || poolReserve.borrowingEnabled || !poolReserve.isFrozen;
  }

  return (
    <div className="UserInformation">
      <div
        className="UserInformation__mobile-caption"
        onClick={() => setContentVisibility(!contentVisible)}
      >
        <h2>{intl.formatMessage(messages.yourInformation)}</h2>
      </div>

      <div
        className={classNames('UserInformation__content-wrapper', {
          UserInformation__contentWrapperVisible: contentVisible,
        })}
      >
        <div className="UserInformation__content-inner">
          <div className="UserInformation__info-wrapper">
            <h3>
              <span>{intl.formatMessage(messages.deposits)}</span>{' '}
              <div className="UserInformation__caption-buttons">
                <Link
                  to={`/deposit/${poolReserve.underlyingAsset}`}
                  className="ButtonLink"
                  disabled={!formattedAvailableDeposits || poolReserve.isFrozen}
                >
                  <DefaultButton
                    className="UserInformation__button"
                    title={intl.formatMessage(defaultMessages.supply)}
                    color={elementsColor}
                    disabled={!formattedAvailableDeposits || poolReserve.isFrozen}
                  />
                </Link>
                <Link
                  className={classNames({
                    UserInformation__buttonNoBorderDisabled: !underlyingBalance,
                  })}
                  to={`/withdraw/${poolReserve.underlyingAsset}`}
                  disabled={!underlyingBalance}
                >
                  <span className="UserInformation__button UserInformation__button-noBorder">
                    {intl.formatMessage(defaultMessages.withdraw)}
                  </span>
                </Link>
              </div>
            </h3>

            <div className="UserInformation__info-inner">
              <Row
                title={intl.formatMessage(messages.youAlreadyDeposited)}
                withMargin={true}
                weight={rowWeight}
                color={elementsColor}
              >
                <Value
                  value={underlyingBalance}
                  symbol={symbol}
                  minimumValueDecimals={2}
                  maximumValueDecimals={2}
                  color={elementsColor}
                />
              </Row>

              <Row
                title={intl.formatMessage(messages.walletBalance)}
                withMargin={true}
                weight={rowWeight}
                color={elementsColor}
              >
                <Value
                  value={walletBalance.toString()}
                  symbol={symbol}
                  minimumValueDecimals={2}
                  maximumValueDecimals={2}
                  color={elementsColor}
                />
              </Row>

              <Row
                title={<AvailableCapsHelpModal capType={CapType.supplyCap} color={elementsColor} />}
                withMargin={
                  (!!underlyingBalance && !user?.isInIsolationMode && !poolReserve.isIsolated) ||
                  (!user?.isInIsolationMode && poolReserve.isIsolated)
                }
                weight={rowWeight}
                color={elementsColor}
              >
                <Value
                  value={formattedAvailableDeposits}
                  symbol={symbol}
                  minimumValueDecimals={2}
                  maximumValueDecimals={2}
                  color={elementsColor}
                />
              </Row>

              {!!underlyingBalance && !user?.isInIsolationMode && (
                <Row
                  title={
                    <CollateralHelpModal
                      text={intl.formatMessage(messages.collateral)}
                      color={elementsColor}
                      lightWeight={sm}
                    />
                  }
                  withMargin={poolReserve.isIsolated}
                  weight={rowWeight}
                  color={elementsColor}
                >
                  <CustomSwitch
                    value={
                      userReserve?.usageAsCollateralEnabledOnUser &&
                      poolReserve.usageAsCollateralEnabled &&
                      canBeEnabledAsCollateral
                    }
                    offLabel={intl.formatMessage(messages.depositOffLabel)}
                    onLabel={intl.formatMessage(messages.depositOnLabel)}
                    onColor={currentTheme.green.hex}
                    offColor={
                      !canBeEnabledAsCollateral ? currentTheme.lightBlue.hex : currentTheme.red.hex
                    }
                    onSwitch={() =>
                      toggleUseAsCollateral(
                        navigate,
                        !userReserve?.usageAsCollateralEnabledOnUser,
                        poolReserve.underlyingAsset
                      )
                    }
                    disabled={!canBeEnabledAsCollateral}
                    swiperHeight={switcherHeight}
                    swiperWidth={switcherWidth}
                  />
                </Row>
              )}

              {!user?.isInIsolationMode && poolReserve.isIsolated && (
                <InfoBanner
                  text={intl.formatMessage(messages.depositIsolationWarning, { symbol })}
                  size="small"
                  withIcon={true}
                />
              )}
            </div>
          </div>

          <div
            className={classNames('UserInformation__info-wrapper', {
              UserInformation__infoWithMargin:
                (!!userReserve?.stableBorrows && userReserve?.stableBorrows !== '0') ||
                (!!userReserve?.variableBorrows && userReserve?.variableBorrows !== '0'),
            })}
          >
            <h3>
              <span>{intl.formatMessage(messages.borrows)}</span>{' '}
              {!totalBorrows && (
                <div className="UserInformation__caption-buttons">
                  <Link
                    to={`/borrow/${poolReserve.underlyingAsset}`}
                    className="ButtonLink"
                    disabled={!isBorrowEnable}
                  >
                    <DefaultButton
                      className="UserInformation__button"
                      title={intl.formatMessage(defaultMessages.borrow)}
                      color={elementsColor}
                      disabled={!isBorrowEnable}
                    />
                  </Link>
                </div>
              )}
            </h3>

            <div className="UserInformation__info-inner">
              <Row
                title={intl.formatMessage(messages.borrowed)}
                withMargin={true}
                weight={rowWeight}
                color={elementsColor}
              >
                {isBorrowEnable ? (
                  <Value
                    value={totalBorrows || 0}
                    symbol={symbol}
                    minimumValueDecimals={2}
                    maximumValueDecimals={2}
                    color={elementsColor}
                  />
                ) : (
                  <span className="UserInformation__noData">—</span>
                )}
              </Row>

              <HealthFactor
                value={user?.healthFactor || '-1'}
                titleColor={elementsColor}
                titleLightWeight={sm}
              />

              <Row
                title={intl.formatMessage(messages.loanToValue)}
                withMargin={true}
                weight={rowWeight}
                color={elementsColor}
              >
                <div className="UserInformation__rowContent">
                  {isReserveInEmode && (
                    <EModeIconWithTooltip
                      tooltipId={`${poolReserve.underlyingAsset}__loanToValue`}
                      eModeCategoryId={userEmodeCategoryId}
                    />
                  )}
                  <ValuePercent value={user?.currentLoanToValue || 0} color={elementsColor} />
                </div>
              </Row>

              {(!user?.isInIsolationMode || !!borrowableAssetInIsolationMode) && (
                <Row
                  title={
                    <AvailableCapsHelpModal capType={CapType.borrowCap} color={elementsColor} />
                  }
                  weight={rowWeight}
                  color={elementsColor}
                  withMargin={user?.isInIsolationMode}
                >
                  {poolReserve.borrowingEnabled ? (
                    <>
                      {isUserOnEmode ? (
                        <>
                          {!isReserveInEmode ? (
                            <UserEModeInfo userEmodeCategoryId={userEmodeCategoryId} />
                          ) : (
                            <div className="UserInformation__rowContent">
                              {isReserveInEmode && (
                                <EModeIconWithTooltip
                                  tooltipId={`${poolReserve.underlyingAsset}__availableBorrow`}
                                  eModeCategoryId={userEmodeCategoryId}
                                />
                              )}
                              <Value
                                value={formattedAvailableBorrows}
                                symbol={symbol}
                                minimumValueDecimals={2}
                                maximumValueDecimals={2}
                                color={elementsColor}
                              />
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="UserInformation__rowContent">
                            <Value
                              value={formattedAvailableBorrows}
                              symbol={symbol}
                              minimumValueDecimals={2}
                              maximumValueDecimals={2}
                              color={elementsColor}
                            />
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <span className="UserInformation__noData">—</span>
                  )}
                </Row>
              )}

              {user?.isInIsolationMode && !isBorrowEnable && (
                <InfoBanner
                  text={intl.formatMessage(
                    // should be executed when the user is in isolation mode, the asset can be borrowed, but due to the fact that the `Debt ceiling` is filled, borrowing is blocked
                    poolReserve.borrowableInIsolation && !formattedAvailableBorrows // TODO: perhaps this condition is not correct, need to check
                      ? messages.borrowDebtCeilingWarning
                      : messages.borrowIsolationWarning
                  )}
                  size="small"
                  withIcon={true}
                />
              )}
            </div>
          </div>

          {sm && (
            <GradientPlusButton
              active={!contentVisible}
              positionVertical="bottom"
              positionHorizontal="right"
              onClick={() => setContentVisibility(!contentVisible)}
              className="UserInformation__GradientPlusButton"
            />
          )}
        </div>

        {((!!userReserve?.stableBorrows && userReserve?.stableBorrows !== '0') ||
          (!!userReserve?.variableBorrows && userReserve?.variableBorrows !== '0')) && (
          <div className="UserInformation__borrow-table">
            <BorrowTable>
              <>
                {userReserve?.stableBorrows !== '0' && (
                  <BorrowTableItem
                    symbol={symbol}
                    poolReserve={poolReserve}
                    userReserve={userReserve}
                    type="stable"
                    isBorrowEnable={isBorrowEnable}
                  />
                )}
                {userReserve?.variableBorrows !== '0' && (
                  <BorrowTableItem
                    symbol={symbol}
                    poolReserve={poolReserve}
                    userReserve={userReserve}
                    type="variable"
                    isBorrowEnable={isBorrowEnable}
                  />
                )}
              </>
            </BorrowTable>
          </div>
        )}
      </div>

      {sm && !contentVisible && (
        <GradientPlusButton
          active={!contentVisible}
          positionVertical="bottom"
          positionHorizontal="right"
          onClick={() => setContentVisibility(!contentVisible)}
        />
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .UserInformation {
          @import 'src/_mixins/screen-size';

          @include respond-to(sm) {
            background: ${currentTheme.darkBlue.hex};
          }

          &__mobile-caption {
            h2 {
              color: ${currentTheme.white.hex};
            }
          }

          &__info-wrapper {
            background: ${currentTheme.whiteElement.hex};
            &:after {
              background: ${currentTheme.white.hex};
            }

            h3 {
              color: ${currentTheme.textDarkBlue.hex};
              @include respond-to(sm) {
                color: ${currentTheme.white.hex};
              }
            }
          }

          .UserInformation__swiper {
            .CustomSwitch__label {
              @include respond-to(sm) {
                color: ${currentTheme.white.hex} !important;
              }
            }
          }

          &__button-noBorder {
            color: ${currentTheme.textDarkBlue.hex};
            @include respond-to(sm) {
              color: ${currentTheme.white.hex};
            }
          }

          &__noData {
            @include respond-to(sm) {
              color: ${currentTheme.white.hex};
            }
          }

          &__borrow-table {
            @include respond-to(sm) {
              background: ${currentTheme.mainBg.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
