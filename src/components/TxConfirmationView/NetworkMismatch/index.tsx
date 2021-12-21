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
  const { handleNetworkChange } = useUserWalletDataContext();

  const isAddableByMetamask =
    (global.window as any)?.ethereum?.isMetaMask && currentProviderName === 'browser';

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
          NetworkMismatch__onlyText: isAddableByMetamask,
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
                  additional: !isAddableByMetamask
                    ? intl.formatMessage(messages.additionalDescription)
                    : '',
                })}
          </p>

          {isAddableByMetamask && (
            <DefaultButton
              title={intl.formatMessage(messages.changeNetwork)}
              onClick={async () => {
                try {
                  await (window as any).ethereum?.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: `0x${neededChainId.toString(16)}` }],
                  });
                } catch (switchError) {
                  if (neededNetworkConfig && switchError.code === 4902) {
                    try {
                      await (window as any).ethereum?.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                          {
                            chainId: `0x${neededChainId.toString(16)}`,
                            chainName: neededNetworkConfig.name,
                            nativeCurrency: {
                              symbol: neededNetworkConfig.baseAsset.toUpperCase(),
                              decimals: neededNetworkConfig.baseAssetDecimals,
                              name:
                                neededNetworkConfig.baseAsset.charAt(0).toUpperCase() +
                                neededNetworkConfig.baseAsset.slice(1).toLowerCase(),
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
