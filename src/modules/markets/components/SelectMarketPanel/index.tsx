import React from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import MarketSelectButton from '../../../../components/market/MarketSelectButton';
import MarketSwitcher from '../../../../components/market/MarketSwitcher';

import staticStyles from './style';
import {
  availableMarkets,
  marketsData,
} from '../../../../helpers/config/markets-and-network-config';

interface SelectMarketPanelProps {
  isCollapse?: boolean;
}

export default function SelectMarketPanel({ isCollapse }: SelectMarketPanelProps) {
  const { currentTheme } = useThemeContext();
  const { currentMarket, setCurrentMarket } = useProtocolDataContext();

  return (
    <div className={classNames('SelectMarketPanel', { SelectMarketPanel__collapse: isCollapse })}>
      <div className="SelectMarketPanel__markets">
        {availableMarkets.map((market) => {
          const marketData = marketsData[market];
          return (
            <MarketSelectButton
              className="SelectMarketPanel__select-button"
              onClick={() => setCurrentMarket(market)}
              logo={marketData.logo}
              chainId={marketData.chainId}
              subLogo={marketData.subLogo}
              disabled={market === currentMarket}
              key={market}
            />
          );
        })}
      </div>

      <div className="SelectMarketPanel__switcher">
        <MarketSwitcher />
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';
        .SelectMarketPanel {
          &__title {
            @include respond-to(sm) {
              color: ${currentTheme.textDarkBlue.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
