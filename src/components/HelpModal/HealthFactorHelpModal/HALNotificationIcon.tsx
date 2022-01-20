import { AdditionalItemProps } from '../../TextWithModal';
import { CustomMarket } from '../../../ui-config/markets';
import { CustomTooltip } from '@aave/aave-ui-kit';
import React from 'react';
import bell from './images/bell.svg';
import bellGray from './images/bellGray.svg';
import bellGrayDark from './images/bellGrayDark.svg';
import classNames from 'classnames';
import messages from './messages';
import staticStyles from './style';
import { useIntl } from 'react-intl';
import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import { useUserWalletDataContext } from '../../../libs/web3-data-provider';

const marketToHALAaveVersionUrlParam = (market: CustomMarket): string | undefined => {
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
      return undefined;
  }
};

export default function HALNotificationIcon({
  height,
  width,
  containerClassName,
  containerStyle,
  iconTheme,
}: AdditionalItemProps) {
  const intl = useIntl();
  const { currentAccount } = useUserWalletDataContext();
  const { currentMarket } = useProtocolDataContext();

  const supportedAaveVersion = marketToHALAaveVersionUrlParam(currentMarket);
  const urlString = React.useMemo(() => {
    const url = new URL('https://9000.hal.xyz/recipes/aave-track-your-health-factor');
    url.searchParams.set('user', currentAccount);

    const aaveVersionParam = supportedAaveVersion;
    if (aaveVersionParam !== undefined) {
      url.searchParams.set('aaveversion', aaveVersionParam);
    }

    return url.toString();
  }, [currentAccount, supportedAaveVersion]);

  const tooltipId = `${currentAccount}__healthFactor`;

  // Do not show the HAL Noticiation icon on unsupported markets.
  if (supportedAaveVersion === undefined) {
    return null;
  }

  return (
    <a
      href={urlString}
      target="_blank"
      rel="noreferrer"
      className={classNames(containerClassName, 'HALNotificationIcon')}
      style={containerStyle}
      data-tip={true}
      data-for={tooltipId}
    >
      <img
        src={iconTheme === 'dark' ? bellGrayDark : iconTheme === 'gray' ? bellGray : bell}
        alt="Notify Me"
        height={height + 2}
        width={width + 2}
      />

      <CustomTooltip
        tooltipId={tooltipId}
        text={intl.formatMessage(messages.notificationIconTooltipText)}
      />

      <style jsx={true}>{staticStyles}</style>
    </a>
  );
}
