import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useWeb3React } from '@web3-react/core';
import classNames from 'classnames';
import makeBlockie from 'ethereum-blockies-base64';
import {
  DropdownWrapper,
  gradient,
  rgba,
  textCenterEllipsis,
  useThemeContext,
} from '@aave/aave-ui-kit';

import { useUserWalletDataContext } from '../../../libs/web3-data-provider';
import { useMenuContext } from '../../../libs/menu';
import { getNetworkConfig } from '../../../helpers/config/markets-and-network-config';
import { useAppDataContext } from '../../../libs/pool-data-provider';
import Link from '../../basic/Link';
import ConnectButton from '../../ConnectButton';

import staticStyles from './style';
import messages from './messages';

import linkIcon from '../../../images/linkIcon.svg';

export default function AddressInfo() {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark, sm } = useThemeContext();
  const { chainId } = useWeb3React();
  const {
    currentAccount,
    disconnectWallet,
    displaySwitchAccountModal,
    currentProviderName,
    availableAccounts,
  } = useUserWalletDataContext();
  const { ensName, ensAvatar } = useAppDataContext();
  const ensNameAbbreviated = ensName
    ? ensName.length > 18
      ? textCenterEllipsis(ensName, 12, 3)
      : ensName
    : undefined;
  const { closeMobileMenu } = useMenuContext();

  const [visible, setVisible] = useState(false);
  const [useBlockie, setUseBlockie] = useState(false);
  useEffect(() => {
    if (ensAvatar) {
      setUseBlockie(false);
    }
  }, [ensAvatar]);
  const config = chainId ? getNetworkConfig(chainId) : undefined;
  const networkName = config && config.name;
  let longName = networkName;
  let networkColor = '';
  if (config?.isFork) {
    networkColor = '#ff4a8d';
    longName += ' fork';
  } else if (config?.isTestnet) {
    networkColor = '#7157ff';
    longName += ' test';
  } else {
    networkColor = '#65c970';
  }

  const borderColor = rgba(`${currentTheme.darkBlue.rgb}, 0.1`);
  const hoverColor = rgba(`${currentTheme.darkBlue.rgb}, 0.05`);
  const gradientBorder = gradient(
    252,
    `${currentTheme.primary.rgb}, 1`,
    33,
    `${currentTheme.secondary.rgb}, 1`,
    100
  );

  return (
    <div className="AddressInfo">
      {currentAccount ? (
        <DropdownWrapper
          visible={visible}
          setVisible={setVisible}
          horizontalPosition={sm ? 'center' : 'right'}
          verticalPosition="bottom"
          className="AddressInfo__dropdownWrapper"
          buttonComponent={
            <button
              className={classNames('AddressInfo__button', {
                AddressInfo__buttonWithAvatar: !!ensAvatar,
                AddressInfo__buttonActive: visible,
              })}
              onClick={() => setVisible(!visible)}
              type="button"
            >
              {!!ensAvatar && (
                <div className="AddressInfo__buttonEnsAvatarInner">
                  <img
                    src={useBlockie ? makeBlockie(currentAccount) : ensAvatar}
                    className="AddressInfo__ensAvatar"
                    alt=""
                    onError={() => setUseBlockie(true)}
                  />
                </div>
              )}

              <div className="AddressInfo__buttonTextContent">
                <p className="AddressInfo__dropdownText">
                  {ensNameAbbreviated
                    ? ensNameAbbreviated
                    : textCenterEllipsis(currentAccount, sm ? 12 : 4, sm ? 15 : 4)}
                </p>
                <span className="AddressInfo__dropdownText">{networkName}</span>
              </div>
            </button>
          }
        >
          <div className="AddressInfo__content">
            <div className="AddressInfo__contentHeader">
              <div className="AddressInfo__contentSection">
                <p className="AddressInfo__contentTitle">{intl.formatMessage(messages.account)}</p>
                {ensName ? (
                  <>
                    <div className="AddressInfo__contentProfile">
                      <img
                        src={useBlockie ? makeBlockie(currentAccount) : ensAvatar}
                        className="AddressInfo__ensAvatar"
                        alt=""
                        onError={() => setUseBlockie(true)}
                      />
                      <p className="AddressInfo__contentEns">{ensName}</p>
                    </div>

                    <p className="AddressInfo__contentAddressSmall">
                      <Link
                        to={config?.explorerLinkBuilder({ address: currentAccount }) || ''}
                        absolute={true}
                        inNewWindow={true}
                        color="dark"
                        onWhiteBackground={true}
                      >
                        {textCenterEllipsis(currentAccount, 12, 4)}
                        <img className="AddressInfo__linkIcon" src={linkIcon} alt="" />
                      </Link>
                    </p>
                  </>
                ) : (
                  <div className="AddressInfo__contentProfile">
                    <img src={ensAvatar} className="AddressInfo__ensAvatar" alt="" />
                    <p className="AddressInfo__contentAddress">
                      <Link
                        to={config?.explorerLinkBuilder({ address: currentAccount }) || ''}
                        absolute={true}
                        inNewWindow={true}
                        color="dark"
                        onWhiteBackground={true}
                      >
                        {textCenterEllipsis(currentAccount, 8, 4)}
                        <img className="AddressInfo__linkIcon" src={linkIcon} alt="" />
                      </Link>
                    </p>
                  </div>
                )}
              </div>

              <div className="AddressInfo__contentSection">
                <p className="AddressInfo__contentTitle">{intl.formatMessage(messages.network)}</p>
                <p className="AddressInfo__contentNetwork">
                  <i />
                  <span>{longName}</span>
                </p>
              </div>
            </div>
            <Link
              to="/history"
              className="AddressInfo__contentButton ButtonLink"
              onClick={() => {
                setVisible(false);
                closeMobileMenu();
              }}
            >
              <span>{intl.formatMessage(messages.history)}</span>
            </Link>

            {(currentProviderName?.includes('ledger') || availableAccounts.length > 1) && (
              <button
                className="AddressInfo__contentButton"
                type="button"
                onClick={() => displaySwitchAccountModal(true)}
              >
                <span>{intl.formatMessage(messages.changeAddress)}</span>
              </button>
            )}

            <button
              className="AddressInfo__contentButton"
              type="button"
              onClick={() => {
                disconnectWallet();
                closeMobileMenu();
              }}
            >
              <span>{intl.formatMessage(messages.disconnect)}</span>
            </button>
          </div>
        </DropdownWrapper>
      ) : (
        <ConnectButton size="small" />
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .AddressInfo {
          &__button {
            background: ${currentTheme.darkBlue.hex};
            color: ${currentTheme.white.hex};
            &:hover {
              border-color: ${currentTheme.white.hex};
            }
          }

          &__buttonActive {
            border-color: ${currentTheme.white.hex};
          }

          &__buttonWithAvatar {
            .AddressInfo__buttonEnsAvatarInner {
              &:before {
                background: ${currentTheme.darkBlue.hex};
              }
              &:after {
                background: ${gradientBorder};
              }
            }
          }

          &__content {
            color: ${currentTheme.darkBlue.hex};
          }
          &__contentHeader {
            border-bottom: 1px solid ${currentTheme.darkBlue.hex};
          }
          &__contentSection {
            &:first-of-type {
              border-bottom: 1px solid
                ${isCurrentThemeDark
                  ? rgba(`${currentTheme.lightBlue.rgb}, 0.2`)
                  : currentTheme.mainBg.hex};
            }
          }
          &__contentTitle {
            color: ${currentTheme.lightBlue.hex};
          }

          &__contentNetwork {
            i {
              background: ${networkColor};
            }
          }

          &__contentButton {
            color: ${currentTheme.darkBlue.hex} !important;
            border-bottom: 1px solid ${borderColor};
            &:hover {
              background: ${hoverColor};
            }
          }
        }
      `}</style>
    </div>
  );
}
