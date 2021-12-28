import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import Link from '../basic/Link';

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
  const { currentTheme } = useThemeContext();

  const localStorageName = 'bridgeBannerHidden';

  const [isBannerVisible, setIsBannerVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(localStorageName)) {
      setIsBannerVisible(true);
    }
  }, []);

  const hideBridgeBanner = () => {
    setIsBannerVisible(false);
    localStorage.setItem(localStorageName, 'true');
  };

  if (!isBannerVisible) return null;

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

      <button className="BridgeBanner__close" type="button" onClick={hideBridgeBanner}>
        <span />
      </button>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .BridgeBanner {
          &__close {
            span,
            span:after {
              background: ${currentTheme.white.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
