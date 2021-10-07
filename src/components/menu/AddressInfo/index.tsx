import React, { useState } from 'react';
import { MessageDescriptor, useIntl } from 'react-intl';
import { useWeb3React } from '@web3-react/core';
import classNames from 'classnames';
import { DropdownWrapper, rgba, textCenterEllipsis, useThemeContext } from '@aave/aave-ui-kit';
import { Network } from '@aave/protocol-js';

import { mapChainIdToName, useUserWalletDataContext } from '../../../libs/web3-data-provider';
import { useMenuContext } from '../../../libs/menu';
import Link from '../../basic/Link';
import ConnectButton from '../../ConnectButton';

import staticStyles from './style';
import messages from './messages';

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
  const { closeMobileMenu } = useMenuContext();

  const [visible, setVisible] = useState(false);
  const networkName = chainId && mapChainIdToName(chainId);
  let networkColor = '';
  if (networkName === 'ropsten') {
    networkColor = '#ff4a8d';
  } else if (networkName === 'kovan') {
    networkColor = '#7157ff';
  } else {
    networkColor = '#65c970';
  }
  let networkMessage: MessageDescriptor = messages.networkName;
  if (networkName === Network.polygon || networkName === Network.avalanche) {
    networkMessage = messages.networkShortName;
  } else {
    networkMessage = messages.networkName;
  }

  const formattedNetworkName =
    networkName === Network.polygon || networkName === Network.avalanche
      ? networkName
      : networkName === Network.mainnet || networkName === Network.fork
      ? `Ethereum Mainnet`
      : `${networkName} Test Network`;

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
              <p>{formattedNetworkName}</p>
              <span>{textCenterEllipsis(currentAccount, 4, 4)}</span>
            </button>
          }
        >
          <div className="AddressInfo__content">
            <div className="AddressInfo__content-caption">
              <p className="AddressInfo__content-network">
                <i />
                <span>{intl.formatMessage(networkMessage, { name: networkName })}</span>
              </p>
              <p className="AddressInfo__content-address">{currentAccount}</p>
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

          &__content-caption {
            border-bottom: 1px solid ${currentTheme.darkBlue.hex};
          }
          &__content-network {
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
