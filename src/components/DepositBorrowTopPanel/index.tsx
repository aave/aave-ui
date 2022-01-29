import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { valueToBigNumber, BigNumber } from '@aave/protocol-js';

import { useThemeContext } from '@aave/aave-ui-kit';
import { useDynamicPoolDataContext } from '../../libs/pool-data-provider';
import toggleLocalStorageClick from '../../helpers/toggle-local-storage-click';
import GradientLine from '../basic/GradientLine';
import TopPanelWrapper from '../wrappers/TopPanelWrapper';
import Row from '../basic/Row';
import Value from '../basic/Value';
import MaxLTVHelpModal from '../HelpModal/MaxLTVHelpModal';
import ValuePercent from '../basic/ValuePercent';
import HealthFactor from '../HealthFactor';
import DefaultButton from '../basic/DefaultButton';
import NoData from '../basic/NoData';
import CircleCompositionBar, {
  CircleCompositionBarItem,
} from '../compositionBars/CircleCompositionBar';
import CircleCollateralCompositionBar from '../compositionBars/CircleCollateralCompositionBar';
import LTVInfoModal from '../LTVInfoModal';
import ApproximateBalanceHelpModal from '../HelpModal/ApproximateBalanceHelpModal';

import messages from './messages';
import staticStyles from './style';
import { getAssetInfo, getAssetColor } from '../../helpers/config/assets-config';
import styled from 'styled-components';
import { BlockTitle } from '../BlockTitle';

const DataContainer = styled.div`
  min-height: 210px;
  margin-top: 20px;
  padding: 30px 35px;
  border-radius: 5px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border: solid 1px rgba(255, 255, 255, 0.68);
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) -6%,
    rgba(255, 255, 255, 0.79) 59%
  );
  align-items: center;
`;

const BoxItemLabel = styled.h3`
  font-family: Montserrat;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000;
`;
const BoxItemValue = styled.p`
  font-family: Montserrat;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000;
  margin-top: 5px;
`;

const BalanceTail = styled.p`
  font-family: Montserrat;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000;
  text-transform: uppercase;
  opacity: 0.5;
  margin-top: 6px;
`;

const DetailsButton = styled.button`
  border-radius: 5px;
  border: 1px solid black;
  padding: 15px;
  max-width: 75px;
  height: 35px;
`;
const DepositInfo = ({ user, data }: { user: any; data: any[] }) => {
  const intl = useIntl();
  const balance = +user.totalLiquidityUSD;
  const tail = user.totalLiquidityUSD.length > 13 ? user.totalLiquidityUSD.slice(5, 12) : '';
  return (
    <>
      <div style={{ width: 'calc((100% / 2) - 15px)' }} className="flex-row between w100">
        <div className="flex-column w100">
          <BlockTitle>Deposit Information</BlockTitle>
          <DataContainer className="flex-row between">
            <div className="flex-column">
              <BoxItemLabel>Approximate balance</BoxItemLabel>
              <BoxItemValue>$ {balance.toFixed(3)}</BoxItemValue>
              <BalanceTail>{tail} USD</BalanceTail>
            </div>
            <CircleCompositionBar
              title={intl.formatMessage(messages.depositComposition)}
              totalValue={Number(user?.totalLiquidityMarketReferenceCurrency || 0)}
              data={data}
            />
          </DataContainer>
        </div>
      </div>
    </>
  );
};

const BorrowInfo = ({
  user,
  data,
  amount,
  percent,
}: {
  user: any;
  data: any[];
  amount?: any;
  percent: string;
}) => {
  const intl = useIntl();
  const collateral = +user.totalCollateralUSD;
  const maxBorrowAmount = valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0').plus(
    user?.availableBorrowsMarketReferenceCurrency || '0'
  );
  const loanToValue =
    user?.totalCollateralMarketReferenceCurrency === '0'
      ? '0'
      : valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0')
          .dividedBy(user?.totalCollateralMarketReferenceCurrency || '1')
          .toFixed();
  return (
    <>
      <div style={{ width: 'calc((100% / 2) - 15px)' }} className="flex-row between w100">
        <div className="flex-column w100">
          <BlockTitle>Borrow Information</BlockTitle>
          <DataContainer className="flex-row between">
            <div className="flex-column">
              <div className="flex-column">
                <BoxItemLabel>You borrowed</BoxItemLabel>
                <BoxItemValue>$ {Number(user.totalBorrowsUSD).toFixed(3)}</BoxItemValue>
              </div>
              <div style={{ margin: '15px 0' }} className="flex-column">
                <BoxItemLabel>Your collateral</BoxItemLabel>
                <BoxItemValue>$ {collateral.toFixed(3)}</BoxItemValue>
              </div>
              <div className="flex-column">
                <BoxItemLabel>Current LTV</BoxItemLabel>
                <BoxItemValue>{Number(loanToValue).toFixed(2)}%</BoxItemValue>
              </div>
            </div>
            <div className="flex-column" style={{ alignSelf: 'flex-start' }}>
              <div className="flex-column">
                <BoxItemLabel>Health factor</BoxItemLabel>
                <BoxItemValue>{Number(user?.healthFactor).toFixed(3) || '-1'}</BoxItemValue>
              </div>
              <div style={{ margin: '15px 0' }} className="flex-column">
                <BoxItemLabel>Borrowing Power Used</BoxItemLabel>
                <BoxItemValue>{Number(percent).toFixed(2)}%</BoxItemValue>
              </div>
              <DetailsButton className="flex-row centered" onClick={() => {}}>
                Details
              </DetailsButton>
            </div>
            {!!data.length && (
              <CircleCompositionBar
                title={intl.formatMessage(messages.borrowComposition)}
                totalValue={Number(maxBorrowAmount || 0)}
                data={data}
              />
            )}
            {+percent !== 1 && <CircleCollateralCompositionBar />}
          </DataContainer>
        </div>
      </div>
    </>
  );
};

export default function DepositBorrowTopPanel() {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { user, reserves } = useDynamicPoolDataContext();

  const [isCollapse, setIsCollapse] = useState(
    localStorage.getItem('borrowDepositTopPanelIsCollapse') === 'true'
  );
  const [isLTVModalVisible, setLTVModalVisible] = useState(false);

  const maxBorrowAmount = valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0').plus(
    user?.availableBorrowsMarketReferenceCurrency || '0'
  );
  const collateralUsagePercent = maxBorrowAmount.eq(0)
    ? '1'
    : valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0')
        .div(maxBorrowAmount)
        .toFixed();

  const loanToValue =
    user?.totalCollateralMarketReferenceCurrency === '0'
      ? '0'
      : valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0')
          .dividedBy(user?.totalCollateralMarketReferenceCurrency || '1')
          .toFixed();

  const depositCompositionData: CircleCompositionBarItem[] = [];
  const borrowCompositionData: CircleCompositionBarItem[] = [];

  user?.userReservesData.forEach((userReserve) => {
    const poolReserve = reserves.find((res) => res.symbol === userReserve.reserve.symbol);

    if (!poolReserve) {
      throw new Error('data is inconsistent pool reserve is not available');
    }
    if (userReserve.underlyingBalance !== '0' || userReserve.totalBorrows !== '0') {
      if (userReserve.underlyingBalance !== '0') {
        depositCompositionData.push({
          label: `${getAssetInfo(userReserve.reserve.symbol).formattedName}  ${intl.formatNumber(
            valueToBigNumber(userReserve.underlyingBalanceMarketReferenceCurrency)
              .dividedBy(user?.totalLiquidityMarketReferenceCurrency)
              .multipliedBy(100)
              .toNumber(),
            { maximumFractionDigits: 2 }
          )}%`,
          value: Number(userReserve.underlyingBalanceMarketReferenceCurrency),
          color: getAssetColor(userReserve.reserve.symbol),
        });
      }
      if (userReserve.totalBorrows !== '0') {
        borrowCompositionData.push({
          label: `${getAssetInfo(userReserve.reserve.symbol).formattedName}  ${intl.formatNumber(
            valueToBigNumber(userReserve.totalBorrowsMarketReferenceCurrency)
              .dividedBy(maxBorrowAmount)
              .multipliedBy(100)
              .toNumber(),
            { maximumFractionDigits: 2 }
          )}%`,
          value: Number(userReserve.totalBorrowsMarketReferenceCurrency),
          color: getAssetColor(userReserve.reserve.symbol),
        });

        const availableBorrowPower = borrowCompositionData
          .reduce((acc, slice) => acc.minus(slice.value), maxBorrowAmount)
          .toNumber();
        const usedBorrowPower = borrowCompositionData
          .reduce((acc, slice) => acc.plus(slice.value), new BigNumber(0))
          .toNumber();

        borrowCompositionData.push({
          value: availableBorrowPower,
          label: `${intl.formatMessage(messages.borrowingPowerAvailable)}: ${intl.formatNumber(
            new BigNumber(1)
              .minus(valueToBigNumber(usedBorrowPower).dividedBy(maxBorrowAmount))
              .multipliedBy(100)
              .toNumber(),
            {
              maximumFractionDigits: 2,
            }
          )}%`,
          color: currentTheme.white.hex,
        });
      }
    }
  });

  return (
    <>
      <div className="flex-row between">
        {user && <DepositInfo data={depositCompositionData} user={user} />}
        {user && (
          <BorrowInfo percent={collateralUsagePercent} data={borrowCompositionData} user={user} />
        )}
      </div>
      <div className="DepositBorrowTopPanel">
        {/*  <TopPanelWrapper
          className={classNames('DepositBorrowTopPanel__topPanel', {
            DepositBorrowTopPanel__topPanelTransparent: user,
          })}
          isCollapse={isCollapse}
          setIsCollapse={() =>
            toggleLocalStorageClick(isCollapse, setIsCollapse, 'borrowDepositTopPanelIsCollapse')
          }
          withoutCollapseButton={!user}
        >
          <div className="DepositBorrowTopPanel__topPanel-captionWrapper">
            <div className="DepositBorrowTopPanel__topPanel-caption">
              {user ? (
                <>
                  <p
                    className={classNames({
                      DepositBorrowTopPanel__topPanelCaptionFull:
                        !depositCompositionData.length && !borrowCompositionData.length,
                    })}
                  >
                    <i>
                      {intl.formatMessage(
                        !depositCompositionData.length
                          ? messages.noDeposits
                          : messages.depositInformation
                      )}
                    </i>
                    <GradientLine height={2} />
                  </p>
                  {!!depositCompositionData.length && (
                    <p>
                      <i>{intl.formatMessage(messages.borrowInformation)}</i>{' '}
                      <GradientLine height={2} />
                    </p>
                  )}
                </>
              ) : (
                <p
                  className={classNames({
                    DepositBorrowTopPanel__topPanelCaptionFull: !user,
                  })}
                >
                  <i>{intl.formatMessage(messages.connectWallet)}</i> <GradientLine height={2} />
                </p>
              )}
            </div>
          </div>

          <div
            className={classNames('DepositBorrowTopPanel__topPanel-info', {
              DepositBorrowTopPanel__topPanelInfoCollapse: isCollapse,
              DepositBorrowTopPanel__topPanelNoUser: !user,
            })}
          >
            {user && (
              <>
                <div
                  className={classNames('DepositBorrowTopPanel__topPanel-inner', {
                    DepositBorrowTopPanel__topPanelInnerFull: !depositCompositionData.length,
                  })}
                >
                  <div className="DepositBorrowTopPanel__topPanel-values">
                    <Row
                      title={
                        <ApproximateBalanceHelpModal
                          text={intl.formatMessage(messages.approximateBalance)}
                          color="white"
                          lightWeight={true}
                        />
                      }
                      color="white"
                      weight="light"
                      isColumn={true}
                    >
                      {user && user.totalLiquidityUSD !== '0' ? (
                        <Value
                          value={user.totalLiquidityUSD}
                          symbol="USD"
                          tokenIcon={true}
                          withSmallDecimals={true}
                          color="white"
                        />
                      ) : (
                        <NoData />
                      )}
                    </Row>
                  </div>

                  {!isCollapse && !!depositCompositionData.length && (
                    <div className="DepositBorrowTopPanel__topPanel-bars">
                      <CircleCompositionBar
                        title={intl.formatMessage(messages.depositComposition)}
                        totalValue={Number(user?.totalLiquidityMarketReferenceCurrency || 0)}
                        data={depositCompositionData}
                      />
                    </div>
                  )}
                </div>

                {!!depositCompositionData.length && (
                  <div className="DepositBorrowTopPanel__topPanel-inner">
                    <div
                      className={classNames('DepositBorrowTopPanel__topPanel-values', {
                        DepositBorrowTopPanel__topPanelValuesCollapse: isCollapse,
                      })}
                    >
                      <div
                        className={classNames('DepositBorrowTopPanel__topPanel-valuesInner', {
                          DepositBorrowTopPanel__topPanelValuesInnerCollapse: isCollapse,
                        })}
                      >
                        <Row
                          title={intl.formatMessage(messages.youBorrowed)}
                          color="white"
                          weight="light"
                          isColumn={true}
                        >
                          {user && user.totalBorrowsUSD !== '0' ? (
                            <Value
                              value={user.totalBorrowsUSD}
                              symbol="USD"
                              tokenIcon={true}
                              minimumValueDecimals={2}
                              maximumValueDecimals={2}
                              color="white"
                            />
                          ) : (
                            <NoData />
                          )}
                        </Row>

                        {isCollapse && (
                          <Row
                            title={intl.formatMessage(messages.yourCollateral)}
                            color="white"
                            weight="light"
                            isColumn={true}
                          >
                            {user && user.totalCollateralUSD !== '0' ? (
                              <Value
                                value={user.totalCollateralUSD}
                                symbol="USD"
                                tokenIcon={true}
                                minimumValueDecimals={2}
                                maximumValueDecimals={2}
                                color="white"
                              />
                            ) : (
                              <NoData />
                            )}
                          </Row>
                        )}

                        <HealthFactor
                          value={user?.healthFactor || '-1'}
                          isColumn={true}
                          titleColor="white"
                          titleLightWeight={true}
                          withHALLink={true}
                        />
                      </div>

                      <div
                        className={classNames('DepositBorrowTopPanel__topPanel-valuesInner', {
                          DepositBorrowTopPanel__topPanelValuesInnerCollapse: isCollapse,
                        })}
                      >
                        {!isCollapse && (
                          <Row
                            title={intl.formatMessage(messages.yourCollateral)}
                            color="white"
                            weight="light"
                            isColumn={true}
                          >
                            {user && user.totalCollateralUSD !== '0' ? (
                              <Value
                                value={user.totalCollateralUSD}
                                symbol="USD"
                                tokenIcon={true}
                                minimumValueDecimals={2}
                                maximumValueDecimals={2}
                                color="white"
                              />
                            ) : (
                              <NoData />
                            )}
                          </Row>
                        )}

                        {!isCollapse && (
                          <Row
                            title={intl.formatMessage(messages.borrowingPowerUsed)}
                            color="white"
                            weight="light"
                            isColumn={true}
                          >
                            {user && collateralUsagePercent !== '0' ? (
                              <ValuePercent value={collateralUsagePercent} color="white" />
                            ) : (
                              <NoData />
                            )}
                          </Row>
                        )}
                      </div>

                      <div
                        className={classNames('DepositBorrowTopPanel__topPanel-valuesInner', {
                          DepositBorrowTopPanel__topPanelValuesInnerCollapse: isCollapse,
                        })}
                      >
                        {!isCollapse && (
                          <Row
                            title={
                              <MaxLTVHelpModal
                                text={intl.formatMessage(messages.currentLTV)}
                                color="white"
                                lightWeight={true}
                              />
                            }
                            color="white"
                            weight="light"
                            isColumn={true}
                          >
                            {user && loanToValue !== '0' ? (
                              <ValuePercent value={loanToValue} color="white" />
                            ) : (
                              <NoData />
                            )}
                          </Row>
                        )}

                        {loanToValue !== '0' && (
                          <DefaultButton
                            title={intl.formatMessage(messages.details)}
                            color="white"
                            transparent={true}
                            className={classNames('DepositBorrowTopPanel__button', {
                              DepositBorrowTopPanel__buttonCollapse: isCollapse,
                            })}
                            size="small"
                            onClick={() => setLTVModalVisible(true)}
                          />
                        )}
                      </div>
                    </div>

                    {!isCollapse && (
                      <div className="DepositBorrowTopPanel__topPanel-bars">
                        {!!borrowCompositionData.length && (
                          <CircleCompositionBar
                            title={intl.formatMessage(messages.borrowComposition)}
                            totalValue={Number(maxBorrowAmount || 0)}
                            data={borrowCompositionData}
                          />
                        )}

                        {+collateralUsagePercent !== 1 && <CircleCollateralCompositionBar />}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </TopPanelWrapper> */}

        {loanToValue !== '0' && (
          <LTVInfoModal visible={isLTVModalVisible} setVisible={setLTVModalVisible} />
        )}

        <style jsx={true} global={true}>
          {staticStyles}
        </style>
        <style jsx={true} global={true}>{`
          .DepositBorrowTopPanel {
            &__topPanel-caption {
              p {
                background: ${currentTheme.darkBlue.hex};
              }
            }

            &__topPanel-inner {
              background: ${currentTheme.darkBlue.hex};
            }

            &__topPanel-captionWrapper {
              color: ${currentTheme.white.hex};
            }
          }
        `}</style>
      </div>
    </>
  );
}
