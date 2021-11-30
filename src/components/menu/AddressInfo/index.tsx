import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useWeb3React } from '@web3-react/core';
import classNames from 'classnames';
import { DropdownWrapper, rgba, textCenterEllipsis, useThemeContext } from '@aave/aave-ui-kit';

import { useUserWalletDataContext } from '../../../libs/web3-data-provider';
import { useMenuContext } from '../../../libs/menu';
import Link from '../../basic/Link';
import ConnectButton from '../../ConnectButton';

import staticStyles from './style';
import messages from './messages';
import { getNetworkConfig } from '../../../helpers/config/markets-and-network-config';
import { useStaticPoolDataContext } from '../../../libs/pool-data-provider';
import linkIcon from '../../../images/linkIcon.svg';

export default function AddressInfo() {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { chainId } = useWeb3React();
  const {
    currentAccount,
    disconnectWallet,
    displaySwitchAccountModal,
    currentProviderName,
    availableAccounts,
  } = useUserWalletDataContext();
  const { ensName, ensAvatar } = useStaticPoolDataContext();
  const ensNameAbbreviated = ensName
    ? ensName.length > 18
      ? textCenterEllipsis(ensName, 12, 3)
      : ensName
    : undefined;
  const { closeMobileMenu } = useMenuContext();

  const [visible, setVisible] = useState(false);
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

  return (
    <div className="AddressInfo">
      {currentAccount ? (
        <DropdownWrapper
          visible={visible}
          setVisible={setVisible}
          horizontalPosition="right"
          verticalPosition="bottom"
          className="AddressInfo__dropdownWrapper"
          buttonComponent={
            <button
              className={classNames('AddressInfo__button', { AddressInfo__buttonActive: visible })}
              onClick={() => setVisible(!visible)}
              type="button"
            >
              {ensAvatar ? (
                <img src={ensAvatar} className="AddressInfo__content-EnsAvatar" alt="" />
              ) : (
                <></>
              )}
              <p className="AddressInfo__dropdownText">
                {ensNameAbbreviated ? ensNameAbbreviated : textCenterEllipsis(currentAccount, 4, 4)}
              </p>
              <span className="AddressInfo__dropdownText">{networkName}</span>
            </button>
          }
        >
          <div className="AddressInfo__content">
            <div className="AddressInfo__contentHeader">
              <div className="AddressInfo__contentSection">
                <p className="AddressInfo__contentTitle">{intl.formatMessage(messages.account)}</p>
                {ensName ? (
                  ensAvatar ? (
                    <>
                      <img src={ensAvatar} className="AddressInfo__contentEnsAvatar" alt="" />
                      <p className="AddressInfo__contentEns">{ensName}</p>{' '}
                      <p className="AddressInfo__contentAddressSmall">
                        <a href={config?.explorerLinkBuilder({ address: currentAccount })}>
                          {textCenterEllipsis(currentAccount, 10, 4)}
                          <img className="AddressInfo__linkIcon" src={linkIcon} alt="" />
                        </a>
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="AddressInfo__contentEns">{ensName}</p>{' '}
                      <p className="AddressInfo__contentAddressSmall">
                        <a href={config?.explorerLinkBuilder({ address: currentAccount })}>
                          {textCenterEllipsis(currentAccount, 12, 4)}
                          <img className="AddressInfo__linkIcon" src={linkIcon} alt="" />
                        </a>
                      </p>
                    </>
                  )
                ) : (
                  <p className="AddressInfo__contentAddress">
                    {textCenterEllipsis(currentAccount, 12, 4)}
                  </p>
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

          &__content {
            color: ${currentTheme.darkBlue.hex};
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
