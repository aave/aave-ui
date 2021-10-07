import React from 'react';
import { useIntl } from 'react-intl';
import { Network } from '@aave/protocol-js';

import {
  AvailableWeb3Connectors,
  ConnectWalletModalProps,
  getWeb3ProviderFromBrowser,
} from '../../libs/web3-data-provider';

import WarningArea from '../WarningArea';
import Link from '../basic/Link';
import UnlockWalletWrapper from './components/ConnectWalletWrapper';
import WalletCard from './components/WalletCard';
import LedgerChecklist from './components/LedgerChecklist';
import SelectPreferredNetwork from './components/SelectPreferredNetwork';
import { AUTHEREUM_API_KEY, getFortmaticKeyByNetwork, PORTIS_DAPP_ID } from '../../config';
import { UnlockWalletExtraText } from '../../ui-config';

import messages from './messages';
import staticStyles from './style';

import * as icons from './images';

export interface Wallet {
  title: string;
  description?: string;
  providerName: AvailableWeb3Connectors;
  icon: string;
  disabled?: boolean;
  notSupported?: boolean;
  errorMessage?: string;
}

export default function ConnectWalletModal({
  preferredNetwork,
  onSelectPreferredNetwork,
  supportedNetworks,
  onUnlockExternalWallet,
  connectorConfig,
  error,
  showLedgerBanner,
  isVisible,
  onBackdropPress,
}: ConnectWalletModalProps) {
  const intl = useIntl();
  const browserWalletProvider = getWeb3ProviderFromBrowser();

  const handleUnlockExternalWallet = (providerName: AvailableWeb3Connectors) =>
    onUnlockExternalWallet(
      providerName,
      preferredNetwork,
      supportedNetworks,
      connectorConfig,
      false
    );

  // @ts-ignore
  const isImToken = !!window.imToken;

  const wallets: Wallet[] = [
    {
      title: intl.formatMessage(messages.titleBrowserWallet, {
        walletName: isImToken ? 'imToken' : 'Browser',
      }),
      description: '(MetaMask, Trustwallet, Enjin)',
      providerName: 'browser',
      icon: isImToken ? icons.imToken : icons.browserWallets,
      disabled: !browserWalletProvider,
      errorMessage: intl.formatMessage(messages.noBrowserBrowserWallet),
    },
    {
      title: 'Portis',
      providerName: 'portis',
      icon: icons.portisIcon,
      notSupported: !PORTIS_DAPP_ID || preferredNetwork === Network.avalanche,
    },
    {
      title: 'Ledger',
      providerName: 'ledger',
      icon: icons.ledgerIcon,
      notSupported: preferredNetwork === Network.polygon || preferredNetwork === Network.avalanche,
    },
    {
      title: 'MEW wallet',
      providerName: 'mew-wallet',
      icon: icons.MEWIcon,
      notSupported: preferredNetwork !== Network.mainnet,
    },
    {
      title: 'Coinbase',
      providerName: 'wallet-link',
      icon: icons.coinbaseIcon,
      notSupported: preferredNetwork === Network.avalanche,
    },
    {
      title: 'Authereum',
      providerName: 'authereum',
      icon: icons.authereumIcon,
      notSupported: !AUTHEREUM_API_KEY || preferredNetwork !== Network.mainnet,
    },
    {
      title: 'Wallet Connect',
      providerName: 'wallet-connect',
      icon: icons.walletConnectIcon,
    },
    {
      title: 'Torus',
      providerName: 'torus',
      icon: icons.torusIcon,
      notSupported: preferredNetwork === Network.avalanche,
    },
    {
      title: 'Fortmatic',
      providerName: 'fortmatic',
      icon: icons.formaticIcon,
      notSupported:
        !getFortmaticKeyByNetwork(preferredNetwork) ||
        preferredNetwork === Network.polygon ||
        preferredNetwork === Network.avalanche,
    },
    {
      title: 'imToken',
      providerName: 'wallet-connect',
      icon: icons.imToken,
      notSupported:
        isImToken || preferredNetwork === Network.polygon || preferredNetwork === Network.avalanche,
    },
  ];

  return (
    <UnlockWalletWrapper
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      className="ConnectWalletModal"
    >
      <SelectPreferredNetwork
        preferredNetwork={preferredNetwork}
        onSelectPreferredNetwork={onSelectPreferredNetwork}
        supportedNetworks={supportedNetworks}
      />

      {error && (
        <WarningArea
          className="ConnectWalletModal__warningArea ConnectWalletModal__warningArea-mobile"
          title={intl.formatMessage(messages.errorCaption)}
        >
          <p>{error}</p>
        </WarningArea>
      )}

      {(error?.includes('Ledger') || showLedgerBanner) && (
        <LedgerChecklist className="ConnectWalletModal__LedgerChecklist-mobile" />
      )}

      <div className="ConnectWalletModal__content">
        {wallets
          .filter((wallet) => !wallet.notSupported)
          .map((wallet, index) => (
            <WalletCard
              title={wallet.title}
              description={wallet.description}
              errorMessage={
                wallet.providerName === 'browser' && !browserWalletProvider
                  ? wallet.errorMessage
                  : ''
              }
              providerName={wallet.providerName}
              icon={wallet.icon}
              disabled={wallet.disabled}
              handleUnlockExternalWallet={handleUnlockExternalWallet}
              key={index}
            />
          ))}
      </div>

      {error && (
        <WarningArea
          className="ConnectWalletModal__warningArea"
          title={intl.formatMessage(messages.errorCaption)}
        >
          <p>{error}</p>
        </WarningArea>
      )}

      {(error?.includes('Ledger') || showLedgerBanner) && (
        <LedgerChecklist className="ConnectWalletModal__warningArea" />
      )}

      <div className="ConnectWalletModal__privacy-inner">
        <p>
          {intl.formatMessage(messages.needHelp, {
            readOurFAQ: (
              <Link
                to="https://docs.aave.com/faq/troubleshooting"
                title={intl.formatMessage(messages.readOurFAQ)}
                absolute={true}
                inNewWindow={true}
                bold={true}
                color="secondary"
              />
            ),
          })}
        </p>
        <p>
          <UnlockWalletExtraText intl={intl} />
        </p>
        <p>
          {intl.formatMessage(messages.disclaimerBottomText, {
            disclaimer: <span key="disclaimer">{intl.formatMessage(messages.disclaimer)}</span>,
          })}
        </p>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </UnlockWalletWrapper>
  );
}
