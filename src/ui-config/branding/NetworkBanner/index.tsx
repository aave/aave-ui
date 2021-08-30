import React from 'react';
import { useIntl } from 'react-intl';
import Link from '../../../components/basic/Link';
import whiteLinkIcon from '../../../images/whiteLinkIcon.svg';
import { NetworkBannerConfig } from '../../banners';
import messages from './messages';
import staticStyles from './style';

export default function NetworkBanner({
  brandColor,
  bridgeName,
  bridgeUrl,
  bridgeLogo,
  networkName,
}: NetworkBannerConfig) {
  const intl = useIntl();

  return (
    <div className="NetworkBanner" style={{ backgroundColor: brandColor }}>
      <div className="NetoworkBanner__logo">
        <img src={bridgeLogo} />
      </div>
      <div className="NetworkBanner__title">
        {intl.formatMessage(messages.title, {
          networkName,
        })}
        &nbsp;
        {intl.formatMessage(messages.visit)}
        &nbsp;
        <Link to={bridgeUrl} inNewWindow={true} absolute={true} color="white" bold={true}>
          {bridgeName}
        </Link>
      </div>
      <div className="NetworkBanner__link">
        <a href={bridgeUrl} target="_blank">
          <img src={whiteLinkIcon} />
        </a>
      </div>
      <style jsx={true}>{staticStyles}</style>
    </div>
  );
}
