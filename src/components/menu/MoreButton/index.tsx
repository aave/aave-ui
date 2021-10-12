import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { rgba, useThemeContext, DropdownWrapper, SocialIcons } from '@aave/aave-ui-kit';

import { useUserWalletDataContext } from '../../../libs/web3-data-provider';
import Link from '../../basic/Link';
import ConnectionModeSwitcher from '../ConnectionModeSwitcher';

import messages from './messages';
import staticStyles from './style';
import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import { moreNavigation } from '../navigation';
import { socialIcons } from '../../../ui-config';

export default function MoreButton() {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { currentAccount } = useUserWalletDataContext();
  const { currentMarketData } = useProtocolDataContext();

  const [visible, setVisible] = useState(false);

  const borderColor = rgba(`${currentTheme.darkBlue.rgb}, 0.1`);
  const hoverColor = rgba(`${currentTheme.darkBlue.rgb}, 0.05`);

  return (
    <DropdownWrapper
      visible={visible}
      setVisible={setVisible}
      className="MoreButton"
      horizontalPosition="right"
      verticalPosition="bottom"
      buttonComponent={
        <button
          className={classNames('MoreButton__button', { MoreButton__buttonActive: visible })}
          onClick={() => setVisible(!visible)}
          type="button"
        >
          <span>{intl.formatMessage(messages.more)}</span>
          <strong>{intl.formatMessage(messages.more)}</strong>
        </button>
      }
    >
      <div className="MoreButton__content">
        <ul className="MoreButton__links">
          {moreNavigation.map((link, index) => (
            <li
              className={classNames('MoreButton__link-inner', {
                MoreButton__linkHidden:
                  (!currentAccount && link.hiddenWithoutWallet) ||
                  (link.isVisible && !link.isVisible(currentMarketData)),
              })}
              key={index}
            >
              <Link
                className="MoreButton__link ButtonLink"
                to={link.link}
                inNewWindow={link.absolute}
                absolute={link.absolute}
                onClick={() => setVisible(false)}
              >
                <p>{intl.formatMessage(link.title)}</p>
              </Link>
            </li>
          ))}

          <li className="MoreButton__switcher-inner">
            <ConnectionModeSwitcher />
          </li>

          <li className="MoreButton__link-inner">
            <SocialIcons
              icons={socialIcons}
              iconHeight={20}
              iconWidth={20}
              linkClassName="MoreButton__socialIcon"
            />
          </li>
        </ul>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .MoreButton {
          &__button {
            color: ${currentTheme.white.hex};
          }

          &__links {
            li {
              border-bottom: 1px solid ${borderColor};
            }
          }

          &__link {
            color: ${currentTheme.darkBlue.hex} !important;
            &:hover {
              background: ${hoverColor};
            }
          }
        }
      `}</style>
    </DropdownWrapper>
  );
}
