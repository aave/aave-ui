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

const HALNotificationIcon: React.FC<AdditionalItemProps> = ({
  height,
  width,
  parentClassName,
  parentStyle,
  iconTheme,
}) => {
  const { currentAccount } = useUserWalletDataContext();

  const urlString = React.useMemo(() => {
    const url = new URL('https://9000.hal.xyz/recipes/aave-track-your-health-factor');
    url.searchParams.set('user', currentAccount);

    return url.toString();
  }, [currentAccount]);

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
      additionalIcon={(props) => <HALNotificationIcon {...props} />}
    />
  );
}
