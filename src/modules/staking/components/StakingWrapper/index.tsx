import React, { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { valueToBigNumber, Stake } from '@aave/protocol-js';
import { gradient, rgba, Timer, useThemeContext } from '@aave/aave-ui-kit';

import { useStaticPoolDataContext } from '../../../../libs/pool-data-provider';
import { useStakeDataContext } from '../../../../libs/pool-data-provider/hooks/use-stake-data-context';
import ScreenWrapper from '../../../../components/wrappers/ScreenWrapper';
import ContentWrapper from '../../../../components/wrappers/ContentWrapper';
import DefaultButton from '../../../../components/basic/DefaultButton';
import Link from '../../../../components/basic/Link';
import Row from '../../../../components/basic/Row';
import LabeledSwitcher from '../../../../components/basic/LabeledSwitcher';
import Value from '../../../../components/basic/Value';
import ValuePercent from '../../../../components/basic/ValuePercent';
import NoDataPanel from '../../../../components/NoDataPanel';
import StakingTopPanel from '../StakingTopPanel';
import SidePanelCard from '../SidePanelCard';
import MainnetWarning from '../../../../components/MainnetWarning';
import { ComputedStakeData } from '../../../../libs/pool-data-provider/types/stake';
import CooldownInfoModal from '../CooldownInfoModal';

import messages from './messages';
import staticStyles from './style';

interface StakingWrapperProps {
  children: ReactNode;
}

export default function StakingWrapper({ children }: StakingWrapperProps) {
  const intl = useIntl();
  const location = useLocation();
  const { currentTheme } = useThemeContext();
  const { userId } = useStaticPoolDataContext();
  const { data, cooldownStep, setCooldownStep, usdPriceEth } = useStakeDataContext();

  const [isShowYourIncentives, setShowYourIncentives] = useState(false);
  const [currentAsset, setCurrentAsset] = useState<Stake>(Stake.aave);
  const [isActivateCooldownModalVisible, setActivateCooldownModalVisible] = useState(false);

  const isCurrentAssetAAVE = currentAsset === Stake.aave;

  const selectedStakeData = data[currentAsset];

  const rewardTokenPriceInUsd = valueToBigNumber(selectedStakeData.rewardTokenPriceEth).dividedBy(
    usdPriceEth
  );

  const userEarningsPerDay = valueToBigNumber(selectedStakeData.userEarningsPerDay);
  const userEarningsPerMonth = userEarningsPerDay.multipliedBy(30).toString();
  const userEarningsPerMonthInUSD = rewardTokenPriceInUsd
    .multipliedBy(userEarningsPerMonth)
    .toString();

  const smFundsInUSD = valueToBigNumber(data[Stake.bpt].stakeTokenTotalSupply)
    .multipliedBy(data[Stake.bpt].stakeTokenPriceEth)
    .plus(
      valueToBigNumber(data[Stake.aave].stakeTokenTotalSupply).multipliedBy(
        data[Stake.aave].stakeTokenPriceEth
      )
    )
    .dividedBy(usdPriceEth)
    .toFixed(2);

  const totalDistributionPerDay = valueToBigNumber(data[Stake.aave].distributionPerDay)
    .plus(data[Stake.bpt].distributionPerDay)
    .toFixed(2);
  const userStakedInUSD = valueToBigNumber(selectedStakeData.stakeTokenUserBalance)
    .multipliedBy(selectedStakeData.stakeTokenPriceEth)
    .dividedBy(usdPriceEth)
    .toFixed(2);

  const userIncentivesToClaimInUSD = valueToBigNumber(selectedStakeData.userIncentivesToClaim)
    .multipliedBy(selectedStakeData.rewardTokenPriceEth)
    .dividedBy(usdPriceEth)
    .toFixed(2);

  const calculateAndSetCooldownStep = (stakeData: ComputedStakeData) => {
    const now = Date.now() / 1000;
    if (stakeData.stakeTokenUserBalance !== '0' && stakeData.userCooldownEndTime) {
      if (stakeData.userCooldownEndTime > now) {
        return setCooldownStep(1);
      }
      if (stakeData.userCooldownEndTime + stakeData.stakeUnstakeWindow > now) {
        return setCooldownStep(2);
      }
    }
    return setCooldownStep(0);
  };

  useEffect(() => {
    calculateAndSetCooldownStep(selectedStakeData);
    const intervalId = setInterval(() => calculateAndSetCooldownStep(selectedStakeData), 1000 * 3);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStakeData]);

  const stakeCooldownDays = selectedStakeData.stakeCooldownSeconds / 60 / 60 / 24;

  const gradientBackground = gradient(
    90,
    `${currentTheme.secondary.rgb}, 1`,
    0,
    `${currentTheme.primary.rgb}, 1`,
    100
  );
  const disabledColor = rgba(`${currentTheme.textDarkBlue.rgb}, 0.2`);

  return (
    <ScreenWrapper
      className="StakingWrapper"
      pageTitle={intl.formatMessage(messages.pageTitle)}
      isTopLineSmall={true}
    >
      <StakingTopPanel
        title={intl.formatMessage(messages.pageTitle)}
        fundsInTheSM={smFundsInUSD}
        totalEmissionPerDay={totalDistributionPerDay}
      />

      <MainnetWarning />

      {location.pathname === '/staking' && (
        <div className="StakingWrapper__mobile-switcher">
          <LabeledSwitcher
            value={isShowYourIncentives}
            leftOption={intl.formatMessage(messages.pageTitle)}
            rightOption={intl.formatMessage(messages.yourIncentives)}
            onToggle={setShowYourIncentives}
          />
        </div>
      )}

      <div className="StakingWrapper__content-inner">
        <ContentWrapper
          withBackButton={true}
          className={classNames('StakingWrapper__content-left', {
            StakingWrapper__contentLeftActive: !isShowYourIncentives,
          })}
        >
          {!userId ? (
            <NoDataPanel
              title={intl.formatMessage(messages.noWalletConnect)}
              description={intl.formatMessage(messages.noWalletConnectDescription)}
              withConnectButton={true}
            />
          ) : (
            children
          )}
        </ContentWrapper>

        <div
          className={classNames('StakingWrapper__content-right', {
            StakingWrapper__contentRightActive: isShowYourIncentives,
          })}
        >
          <div className="StakingWrapper__asset-switcherWrapper">
            <LabeledSwitcher
              value={!isCurrentAssetAAVE}
              leftOption={Stake.aave}
              rightOption={Stake.bpt}
              onToggle={() => setCurrentAsset(isCurrentAssetAAVE ? Stake.bpt : Stake.aave)}
              white={true}
            />
          </div>

          <div className="StakingWrapper__cards-inner">
            <SidePanelCard
              title={intl.formatMessage(messages.staked, {
                symbol: <strong>{currentAsset.toUpperCase()}</strong>,
              })}
              value={selectedStakeData.stakeTokenUserBalance}
              valueInUsd={userStakedInUSD}
              withHelpModal={cooldownStep !== 2}
              withGradientBorder={cooldownStep === 2}
            >
              {cooldownStep === 0 && (
                <DefaultButton
                  title={intl.formatMessage(messages.activateCooldown)}
                  className="StakingWrapper__button"
                  onClick={() => {
                    setShowYourIncentives(false);
                    setActivateCooldownModalVisible(true);
                  }}
                  color="dark"
                  disabled={
                    location.pathname ===
                      `/staking/${currentAsset}/activate-cooldown/confirmation` ||
                    selectedStakeData.stakeTokenUserBalance === '0'
                  }
                />
              )}

              {cooldownStep === 1 && (
                <div className="StakingWrapper__info-timerWrapper">
                  <div className="StakingWrapper__info-timerInner">
                    <Timer
                      className="StakingWrapper__timer"
                      dateInFuture={selectedStakeData.userCooldownEndTime}
                      onComplete={() => setCooldownStep(2)}
                    />
                  </div>
                  <p className="StakingWrapper__info-timerText">
                    {intl.formatMessage(messages.coolingDown)}
                  </p>
                </div>
              )}

              {cooldownStep === 2 && (
                <>
                  <Link
                    to={`/staking/${currentAsset}/unstake`}
                    className="StakingWrapper__link ButtonLink"
                    disabled={
                      location.pathname === `/staking/${currentAsset}/unstake` ||
                      selectedStakeData.stakeTokenUserBalance === '0'
                    }
                  >
                    <button
                      onClick={() => setShowYourIncentives(false)}
                      className="StakingWrapper__gradientButton"
                      type="button"
                      disabled={
                        location.pathname === `/staking/${currentAsset}/unstake` ||
                        selectedStakeData.stakeTokenUserBalance === '0'
                      }
                    >
                      <div className="StakingWrapper__gradientButton-inner">
                        <span>{intl.formatMessage(messages.unstake)}</span>
                      </div>
                    </button>
                  </Link>

                  <div className="StakingWrapper__unstakeTime-wrapper">
                    <p>{intl.formatMessage(messages.timeLeftToUnstake)}</p>
                    <Timer
                      className="StakingWrapper__unstakeTimer"
                      dateInFuture={
                        selectedStakeData.userCooldownEndTime + selectedStakeData.stakeUnstakeWindow
                      }
                      onComplete={() => setCooldownStep(0)}
                    />
                  </div>
                </>
              )}
            </SidePanelCard>

            <SidePanelCard
              title={intl.formatMessage(messages.incentivesToClaim)}
              value={intl.formatNumber(+selectedStakeData.userIncentivesToClaim, {
                maximumFractionDigits: 5,
              })}
              valueInUsd={userIncentivesToClaimInUSD}
            >
              <Link
                to={`/staking/${currentAsset}/claim/confirmation?amount=-1`}
                className="StakingWrapper__link ButtonLink"
                disabled={
                  location.pathname === `/staking/${currentAsset}/claim/confirmation` ||
                  selectedStakeData.userIncentivesToClaim === '0'
                }
              >
                <DefaultButton
                  title={intl.formatMessage(messages.claim)}
                  className="StakingWrapper__button"
                  color="dark"
                  onClick={() => setShowYourIncentives(false)}
                  disabled={
                    location.pathname === `/staking/${currentAsset}/claim/confirmation` ||
                    selectedStakeData.userIncentivesToClaim === '0'
                  }
                />
              </Link>
            </SidePanelCard>
          </div>

          <Row
            title={intl.formatMessage(messages.incentivesPerMonth)}
            className="StakingWrapper__row"
            weight="light"
          >
            <Value
              value={userEarningsPerMonth}
              symbol="AAVE"
              withoutSymbol={true}
              subSymbol="USD"
              subValue={userEarningsPerMonthInUSD !== '0' ? userEarningsPerMonthInUSD : '0'}
            />
          </Row>

          <Row
            title={intl.formatMessage(messages.cooldownPeriod)}
            className="StakingWrapper__row"
            weight="light"
          >
            <strong className="StakingWrapper__cooldownPeriodTime">
              {intl.formatNumber(
                stakeCooldownDays < 1 ? selectedStakeData.stakeCooldownSeconds : stakeCooldownDays
              )}{' '}
              <span>
                {intl.formatMessage(stakeCooldownDays < 1 ? messages.seconds : messages.days)}
              </span>
            </strong>
          </Row>

          <Row
            title={intl.formatMessage(messages.stakingAPY)}
            className="StakingWrapper__row"
            weight="light"
          >
            <ValuePercent value={+selectedStakeData.stakeApy} />
          </Row>

          <Row
            title={intl.formatMessage(messages.currentMaxSlashing)}
            className="StakingWrapper__row"
            weight="light"
          >
            <ValuePercent value={0.3} color="red" />
          </Row>
        </div>
      </div>

      <CooldownInfoModal
        stake={currentAsset}
        stakeData={selectedStakeData}
        isVisible={isActivateCooldownModalVisible}
        onBackdropPress={() => setActivateCooldownModalVisible(false)}
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';

        .StakingWrapper {
          &__content-left,
          &__content-right {
            background: ${currentTheme.whiteElement.hex};
          }

          &__info-timerWrapper {
            color: ${currentTheme.textDarkBlue.hex};
          }
          &__info-timerInner {
            background: ${currentTheme.mainBg.hex};
            @include respond-to(sm) {
              background: ${currentTheme.disabledGray.hex};
            }
            .StakingWrapper__timer {
              color: ${currentTheme.textDarkBlue.hex};
            }
          }

          &__gradientButton {
            background: ${gradientBackground};
            color: ${currentTheme.white.hex};

            &:disabled,
            &:disabled &:hover {
              .StakingWrapper__gradientButton-inner {
                background: ${currentTheme.mainBg.hex};
                color: ${disabledColor};
                @include respond-to(sm) {
                  background: ${currentTheme.disabledGray.hex};
                }
              }
            }
            &:after {
              background: ${gradientBackground};
            }
          }
          &__gradientButton-inner {
            background: ${gradientBackground};
          }

          .StakingWrapper__unstakeTimer {
            color: ${currentTheme.textDarkBlue.hex};
          }
        }
      `}</style>
    </ScreenWrapper>
  );
}
