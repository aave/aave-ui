import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';
import { Network } from '@aave/protocol-js';

import DefaultButton from '../../basic/DefaultButton';
import AccessMaticMarketHelpModal from '../../HelpModal/AccessMaticMarketHelpModal';
import {
  AvailableWeb3Connectors,
  useUserWalletDataContext,
  mapNameToChainID,
} from '../../../libs/web3-data-provider';
import { getNetworkConfig } from '../../../helpers/markets/markets-data';

import messages from './messages';
import staticStyles from './style';

interface NetworkMismatchProps {
  neededNetworkName: Network;
  currentNetworkName: Network;
  currentProviderName: AvailableWeb3Connectors;
}

const ADD_CONFIG = {
  [Network.polygon]: {
    name: 'Polygon',
    explorerUrls: ['https://explorer.matic.network'],
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
  [Network.mumbai]: {
    name: 'Mumbai',
    explorerUrls: ['https://explorer-mumbai.maticvigil.com'],
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
  [Network.avalanche]: {
    name: 'Avalanche',
    explorerUrls: ['https://cchain.explorer.avax.network'],
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
    },
  },
  [Network.fuji]: {
    name: 'Avalanche Fuji',
    explorerUrls: ['https://cchain.explorer.avax-test.network'],
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
    },
  },
} as const;

export default function NetworkMismatch({
  neededNetworkName,
  currentNetworkName,
  currentProviderName,
}: NetworkMismatchProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { handleNetworkChange } = useUserWalletDataContext();

  const isNeededNetworkNamePolygon = neededNetworkName === Network.polygon;
  const isAddableByMetamask =
    (global.window as any)?.ethereum?.isMetaMask &&
    currentProviderName === 'browser' &&
    [Network.polygon, Network.mumbai, Network.avalanche, Network.fuji].includes(neededNetworkName);
  const config = ADD_CONFIG[neededNetworkName as Network.polygon];
  const { publicJsonRPCWSUrl, publicJsonRPCUrl } = getNetworkConfig(neededNetworkName);

  // const isExternalNetworkUpdateNeeded =
  //   !isMetaMaskForMatic && ['browser', 'wallet-connect'].includes(currentProviderName);
  const isManualNetworkUpdateNeeded = ['torus', 'portis'].includes(currentProviderName);
  const isNeededNetworkNotSupported =
    neededNetworkName === Network.polygon &&
    ['authereum', 'fortmatic', 'mew-wallet', 'ledger'].includes(currentProviderName);

  return (
    <div className="NetworkMismatch">
      <div
        className={classNames('NetworkMismatch__top-inner', {
          NetworkMismatch__onlyText: isAddableByMetamask,
        })}
      >
        <h4>
          {isNeededNetworkNotSupported
            ? intl.formatMessage(messages.networkIsNotSupportedCaption)
            : intl.formatMessage(messages.caption, {
                networkName: isNeededNetworkNamePolygon
                  ? 'Polygon POS'
                  : neededNetworkName.toUpperCase(),
              })}
        </h4>

        <div className="NetworkMismatch__textInner">
          <p>
            {isNeededNetworkNotSupported
              ? intl.formatMessage(messages.networkIsNotSupportedDescription, {
                  networkName: neededNetworkName.toUpperCase(),
                  walletName: currentProviderName,
                })
              : intl.formatMessage(messages.description, {
                  networkName: currentNetworkName.toUpperCase(),
                  additional: !isAddableByMetamask
                    ? intl.formatMessage(messages.additionalDescription)
                    : '',
                })}
          </p>

          {isAddableByMetamask && config && (
            <DefaultButton
              title={intl.formatMessage(messages.changeNetwork)}
              onClick={() => {
                (window as any).ethereum?.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: `0x${mapNameToChainID(neededNetworkName).toString(16)}`,
                      chainName: config.name,
                      nativeCurrency: config.nativeCurrency,
                      rpcUrls: [publicJsonRPCUrl, publicJsonRPCWSUrl],
                      blockExplorerUrls: config.explorerUrls,
                    },
                  ],
                });
              }}
            />
          )}

          {isManualNetworkUpdateNeeded && (
            <DefaultButton
              title={intl.formatMessage(messages.changeNetwork)}
              onClick={() => handleNetworkChange(neededNetworkName)}
            />
          )}
        </div>
      </div>

      {!isAddableByMetamask && (
        <div className="NetworkMismatch__bottom-inner">
          <div className="NetworkMismatch__bottom-text">
            {isAddableByMetamask && (
              <div>
                {intl.formatMessage(messages.howToChange)}{' '}
                <AccessMaticMarketHelpModal
                  className="NetworkMismatch__bottomText"
                  text="Polygon POS"
                />
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .NetworkMismatch {
          color: ${currentTheme.textDarkBlue.hex};
          background: ${currentTheme.whiteItem.hex};
          border: 1px solid ${currentTheme.darkBlue.hex};
          h4 {
            color: ${currentTheme.primary.hex};
          }

          .NetworkMismatch__bottomText {
            .TextWithModal__text {
              color: ${currentTheme.secondary.hex} !important;
            }
          }
        }
      `}</style>
    </div>
  );
}
