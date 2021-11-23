import React from 'react';
import { useIntl } from 'react-intl';
import { BasicModal, useThemeContext } from '@aave/aave-ui-kit';

import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import MarketSelectButton from '../MarketSelectButton';

import messages from './messages';
import staticStyles from './style';

import whiteCloseIcon from '../../../images/whiteCloseIcon.svg';
import closeIcon from '../../../images/closeIcon.svg';
import { availableMarkets, marketsData } from '../../../helpers/config/markets-and-network-config';

interface MarketsModalProps {
  isVisible: boolean;
  onBackdropPress: () => void;
}

export default function MarketsModal({ isVisible, onBackdropPress }: MarketsModalProps) {
  const intl = useIntl();
  const { currentMarket, setCurrentMarket } = useProtocolDataContext();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  return (
    <BasicModal
      className="MarketsModal"
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      withCloseButton={true}
      closeIcon={isCurrentThemeDark ? whiteCloseIcon : closeIcon}
    >
      <div className="MarketsModal__content">
        <h3>{intl.formatMessage(messages.selectYourMarket)}</h3>

        <div className="MarketsModal__markets">
          {availableMarkets.map((market) => {
            const marketData = marketsData[market];

            return (
              <MarketSelectButton
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
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .MarketsModal {
          &.BasicModal__dark.ReactModal__Content {
            background: ${currentTheme.darkBlue.hex};
          }

          &__content {
            h3 {
              color: ${currentTheme.primary.hex};
            }
          }
        }
      `}</style>
    </BasicModal>
  );
}
