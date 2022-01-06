import React from 'react';
import { useIntl } from 'react-intl';

import HelpModalWrapper from '../HelpModalWrapper';
import { HelpModalProps } from '../types';

import messages from './messages';
import bell from './images/bell.svg';
import bellGray from './images/bellGray.svg';
import bellGrayDark from './images/bellGrayDark.svg';
import { AdditionalItemProps } from '../../TextWithModal';
import { useUserWalletDataContext } from '../../../libs/web3-data-provider';
import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import { CustomMarket } from '../../../ui-config/markets';

const marketToHALAaveVersionUrlParam = (market: CustomMarket): string | undefined => {
  const exhaustCases = (_: never) => undefined;
  switch (market) {
    case CustomMarket.proto_matic:
      return 'aavepolygon';
    case CustomMarket.proto_avalanche:
      return 'aaveavalanche';
    case CustomMarket.proto_mainnet:
      return 'aavev2';

    case CustomMarket.proto_kovan:
    case CustomMarket.proto_mumbai:
    case CustomMarket.proto_fuji:
    case CustomMarket.amm_kovan:
    case CustomMarket.amm_mainnet:
      return undefined;

    default:
      return exhaustCases(market);
  }
};

const HALNotificationIcon: React.FC<AdditionalItemProps> = ({
  height,
  width,
  parentClassName,
  parentStyle,
  iconTheme,
}) => {
  const { currentAccount } = useUserWalletDataContext();
  const { currentMarket } = useProtocolDataContext();

  const urlString = React.useMemo(() => {
    const url = new URL('https://9000.hal.xyz/recipes/aave-track-your-health-factor');
    url.searchParams.set('user', currentAccount);

    const aaveVersionParam = marketToHALAaveVersionUrlParam(currentMarket);
    if (aaveVersionParam) {
      url.searchParams.set('aaveversion', aaveVersionParam);
    }

    return url.toString();
  }, [currentAccount, currentMarket]);

  return (
    <a
      href={urlString}
      target="_blank"
      rel="noreferrer"
      className={parentClassName}
      style={parentStyle}
    >
      <img
        src={iconTheme === 'dark' ? bellGrayDark : iconTheme === 'gray' ? bellGray : bell}
        alt="Notify Me"
        height={height}
        width={width}
      />
    </a>
  );
};

export default function HealthFactorHelpModal({
  text,
  iconSize,
  className,
  color,
  lightWeight,
  onWhiteBackground,
}: HelpModalProps) {
  const intl = useIntl();
  return (
    <HelpModalWrapper
      text={text}
      iconSize={iconSize}
      className={className}
      caption={intl.formatMessage(messages.caption)}
      description={intl.formatMessage(messages.description)}
      color={color}
      lightWeight={lightWeight}
      onWhiteBackground={onWhiteBackground}
      secondaryIcon={(props) => <HALNotificationIcon {...props} />}
    />
  );
}
