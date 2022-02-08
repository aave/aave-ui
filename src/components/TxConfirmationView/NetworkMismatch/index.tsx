import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import DefaultButton from '../../basic/DefaultButton';
import AccessMaticMarketHelpModal from '../../HelpModal/AccessMaticMarketHelpModal';
import {
  AvailableWeb3Connectors,
  useUserWalletDataContext,
} from '../../../libs/web3-data-provider';
import { getNetworkConfig } from '../../../helpers/config/markets-and-network-config';

import messages from './messages';
import staticStyles from './style';
import { ChainId } from '@aave/contract-helpers';
import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';

interface NetworkMismatchProps {
  neededChainId: ChainId;
  currentChainId: ChainId;
  currentProviderName: AvailableWeb3Connectors;
}

const ADD_CONFIG: {
  [key: number]: {
    name: string;
    explorerUrls: string[];
    nativeCurrency: { name: string; symbol: string; decimals: number };
  };
} = {
  [ChainId.polygon]: {
    name: 'Polygon',
    explorerUrls: ['https://explorer.matic.network'],
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
  [ChainId.mumbai]: {
    name: 'Mumbai',
    explorerUrls: ['https://explorer-mumbai.maticvigil.com'],
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
  [ChainId.avalanche]: {
    name: 'Avalanche',
    explorerUrls: ['https://cchain.explorer.avax.network'],
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
    },
  },
  [ChainId.fuji]: {
    name: 'Avalanche Fuji',
    explorerUrls: ['https://cchain.explorer.avax-test.network'],
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
    },
  },
};

export default function NetworkMismatch({
  neededChainId,
  currentChainId,
  currentProviderName,
}: NetworkMismatchProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { library } = useWeb3React<providers.Web3Provider>();
  const { handleNetworkChange } = useUserWalletDataContext();

  const config = ADD_CONFIG[neededChainId];
  const isMetaMask = (global.window as any)?.ethereum?.isMetaMask;
  // @ts-ignore
  const isCoinbaseWallet = library?.provider?.isCoinbaseWallet === true;
  const isAddable =
    (isMetaMask || isCoinbaseWallet) &&
    ['browser', 'wallet-link'].includes(currentProviderName) &&
    config;
  const { publicJsonRPCWSUrl, publicJsonRPCUrl } = getNetworkConfig(neededChainId);

  // const isExternalNetworkUpdateNeeded =
  //   !isMetaMaskForMatic && ['browser', 'wallet-connect'].includes(currentProviderName);
  const isManualNetworkUpdateNeeded = ['torus', 'portis'].includes(currentProviderName);
  const isNeededNetworkNotSupported =
    neededChainId === ChainId.polygon &&
    ['authereum', 'fortmatic', 'mew-wallet', 'ledger'].includes(currentProviderName);

  const neededNetworkConfig = getNetworkConfig(neededChainId);
  const currentNetworkConfig = getNetworkConfig(currentChainId);

  return (
    <div className="NetworkMismatch">
      <div
        className={classNames('NetworkMismatch__top-inner', {
          NetworkMismatch__onlyText: isAddable,
        })}
      >
        <h4>
          {isNeededNetworkNotSupported
            ? intl.formatMessage(messages.networkIsNotSupportedCaption)
            : intl.formatMessage(messages.caption, {
                networkName: neededNetworkConfig.isFork
                  ? neededNetworkConfig.name + ' Fork'
                  : neededNetworkConfig.name,
              })}
        </h4>

        <div className="NetworkMismatch__textInner">
          <p>
            {isNeededNetworkNotSupported
              ? intl.formatMessage(messages.networkIsNotSupportedDescription, {
                  networkName: neededNetworkConfig.name,
                  walletName: currentProviderName,
                })
              : intl.formatMessage(messages.description, {
                  networkName: currentNetworkConfig.name,
                  additional: !isAddable ? intl.formatMessage(messages.additionalDescription) : '',
                })}
          </p>

          {isAddable && config && (
            <DefaultButton
              title={intl.formatMessage(messages.changeNetwork)}
              onClick={async () => {
                if (library) {
                  try {
                    await library.provider.request!({
                      method: 'wallet_switchEthereumChain',
                      params: [{ chainId: `0x${neededChainId.toString(16)}` }],
                    });
                  } catch (switchError) {
                    console.log(switchError);
                    if (switchError.code === 4902) {
                      try {
                        await library.provider.request!({
                          method: 'wallet_addEthereumChain',
                          params: [
                            {
                              chainId: `0x${neededChainId.toString(16)}`,
                              chainName: config.name,
                              nativeCurrency: config.nativeCurrency,
                              rpcUrls: [...publicJsonRPCUrl, publicJsonRPCWSUrl],
                              blockExplorerUrls: config.explorerUrls,
                            },
                          ],
                        });
                      } catch (addError) {
                        console.log(addError);
                        // TODO: handle error somehow
                      }
                    }
                  }
                }
              }}
            />
          )}

          {isManualNetworkUpdateNeeded && (
            <DefaultButton
              title={intl.formatMessage(messages.changeNetwork)}
              onClick={() => handleNetworkChange(neededChainId)}
            />
          )}
        </div>
      </div>

      {!isAddable && (
        <div className="NetworkMismatch__bottom-inner">
          <div className="NetworkMismatch__bottom-text">
            {isAddable && (
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
