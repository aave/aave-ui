import React from 'react';
import { useIntl } from 'react-intl';

import Link from '../basic/Link';
import whiteLinkIcon from '../../images/whiteLinkIcon.svg';

import messages from './messages';
import staticStyles from './style';

interface BridgeBannerProps {
  networkName: string;
  name: string;
  url: string;
  brandColor: string;
  logo: string;
}

export default function BridgeBanner({
  brandColor,
  name,
  url,
  logo,
  networkName,
}: BridgeBannerProps) {
  const intl = useIntl();

  return (
    <div
      className="BridgeBanner"
      style={{
        backgroundColor: `rgb(${brandColor})`,
        boxShadow: `0px 2px 4px rgba(${brandColor}, 0.6)`,
      }}
    >
      <div className="BridgeBanner__logo">
        <img src={logo} alt={name} />
      </div>
      <div className="BridgeBanner__title">
        {intl.formatMessage(messages.title, {
          networkName,
          bridge: (
            <Link to={url} inNewWindow={true} absolute={true} color="white" bold={true}>
              {name}
            </Link>
          ),
        })}
      </div>
      <div className="BridgeBanner__link">
        <Link to={url} inNewWindow={true} absolute={true}>
          <img src={whiteLinkIcon} alt="" />
        </Link>
      </div>
      <style jsx={true}>{staticStyles}</style>
    </div>
  );
}
