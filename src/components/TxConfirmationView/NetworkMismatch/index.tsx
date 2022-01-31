import {
  AvailableWeb3Connectors,
  useUserWalletDataContext,
} from '../../../libs/web3-data-provider';

import AccessMaticMarketHelpModal from '../../HelpModal/AccessMaticMarketHelpModal';
import { ChainId } from '@aave/contract-helpers';
import DefaultButton from '../../basic/DefaultButton';
import React from 'react';
import classNames from 'classnames';
import { getNetworkConfig } from '../../../helpers/config/markets-and-network-config';
import messages from './messages';
import { providers } from 'ethers';
import staticStyles from './style';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';
import { useWeb3React } from '@web3-react/core';

interface NetworkMismatchProps {
  neededChainId: ChainId;
  currentChainId: ChainId;
  currentProviderName: AvailableWeb3Connectors;
}

export default function NetworkMismatch({
  neededChainId,
  currentChainId,
  currentProviderName,
}: NetworkMismatchProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { library } = useWeb3React<providers.Web3Provider>();
  const { handleNetworkChange } = useUserWalletDataContext();

  const isAddable =
    (global.window as any)?.ethereum?.isMetaMask &&
    ['browser', 'wallet-link'].includes(currentProviderName);

  // const isExternalNetworkUpdateNeeded =
  //   !isMetaMaskForMatic && ['browser', 'wallet-connect'].includes(currentProviderName);
  const isManualNetworkUpdateNeeded = ['torus'].includes(currentProviderName);
  const isNeededNetworkNotSupported =
    neededChainId === ChainId.polygon && ['mew-wallet', 'ledger'].includes(currentProviderName);

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

          {isAddable && library && (
            <DefaultButton
              title={intl.formatMessage(messages.changeNetwork)}
              onClick={async () => {
                try {
                  await library.provider.request!({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: `0x${neededChainId.toString(16)}` }],
                  });
                } catch (switchError) {
                  if (neededNetworkConfig && switchError.code === 4902) {
                    try {
                      await library.provider.request!({
                        method: 'wallet_addEthereumChain',
                        params: [
                          {
                            chainId: `0x${neededChainId.toString(16)}`,
                            chainName: neededNetworkConfig.name,
                            nativeCurrency: {
                              symbol: neededNetworkConfig.baseAssetSymbol.toUpperCase(),
                              decimals: neededNetworkConfig.baseAssetDecimals,
                              name:
                                neededNetworkConfig.baseAssetSymbol.charAt(0).toUpperCase() +
                                neededNetworkConfig.baseAssetSymbol.slice(1).toLowerCase(),
                            },
                            rpcUrls: [
                              ...neededNetworkConfig.publicJsonRPCUrl,
                              neededNetworkConfig.publicJsonRPCWSUrl,
                            ],
                            blockExplorerUrls: [neededNetworkConfig.explorerLink],
                          },
                        ],
                      });
                    } catch (addError) {
                      // TODO: handle error somehow
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
