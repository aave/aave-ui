import React, { ReactNode, useState } from 'react';
import { useIntl } from 'react-intl';

import { useThemeContext } from '@aave/aave-ui-kit';
import toggleLocalStorageClick from '../../../helpers/toggle-local-storage-click';
import ScreenWrapper from '../ScreenWrapper';
import TopPanelWrapper from '../TopPanelWrapper';
import ContentWrapper from '../ContentWrapper';
import TopInfoPanel from './TopInfoPanel';
import CurrencyOverview from './CurrencyOverview';

import staticStyles from './style';

import { ValidationWrapperComponentProps } from '../../RouteParamsValidationWrapper';
import { GraphLegendDot } from '../../graphs/GraphLegend';
import { InterestRateSeries } from '../../graphs/types';

import messages from './messages';

interface CurrencyScreenWrapperProps
  extends Pick<
    ValidationWrapperComponentProps,
    'userReserve' | 'poolReserve' | 'user' | 'currencySymbol'
  > {
  title: string;
  isCollapseLocalStorageName: string;
  walletBalance?: string;
  type: 'deposit' | 'borrow';
  showGraphCondition: boolean;
  dots?: GraphLegendDot[];
  series: InterestRateSeries[];
  goBack?: () => void;
  children: ReactNode;
}

export default function CurrencyScreenWrapper({
  title,
  currencySymbol,
  poolReserve,
  user,
  userReserve,
  walletBalance,
  isCollapseLocalStorageName,
  type,
  showGraphCondition,
  dots,
  series,
  goBack,
  children,
}: CurrencyScreenWrapperProps) {
  const intl = useIntl();
  const { currentTheme, sm } = useThemeContext();

  const [isCollapse, setIsCollapse] = useState(
    localStorage.getItem(isCollapseLocalStorageName) === 'true'
  );

  return (
    <ScreenWrapper
      pageTitle={intl.formatMessage(type === 'deposit' ? messages.deposit : messages.borrow)}
      className="CurrencyScreenWrapper"
    >
      {!sm && (
        <div className="CurrencyScreenWrapper__top-info">
          <TopInfoPanel
            poolReserve={poolReserve}
            currencySymbol={currencySymbol}
            walletBalance={walletBalance}
            userReserve={userReserve}
            user={user}
            type={type}
          />
        </div>
      )}

      <TopPanelWrapper
        isCollapse={isCollapse}
        setIsCollapse={() =>
          toggleLocalStorageClick(isCollapse, setIsCollapse, isCollapseLocalStorageName)
        }
      >
        <CurrencyOverview
          title={title}
          poolReserve={poolReserve}
          currencySymbol={currencySymbol}
          type={type}
          showGraphCondition={showGraphCondition}
          dots={dots}
          series={series}
          isCollapse={isCollapse}
        />
      </TopPanelWrapper>

      <div className="CurrencyScreenWrapper__mobileInner">
        <TopInfoPanel
          poolReserve={poolReserve}
          currencySymbol={currencySymbol}
          walletBalance={walletBalance}
          userReserve={userReserve}
          user={user}
          type={type}
        />
      </div>

      <ContentWrapper
        className="CurrencyScreenWrapper__content"
        withBackButton={true}
        goBack={goBack}
      >
        {children}
      </ContentWrapper>

      <div className="CurrencyScreenWrapper__mobileInner">
        <CurrencyOverview
          poolReserve={poolReserve}
          currencySymbol={currencySymbol}
          type={type}
          showGraphCondition={showGraphCondition}
          dots={dots}
          series={series}
        />
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .CurrencyScreenWrapper {
          &__mobileInner {
            background: ${currentTheme.darkBlue.hex};
          }
        }
      `}</style>
    </ScreenWrapper>
  );
}
