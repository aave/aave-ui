import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { AnimationArrow, DropdownWrapper, useThemeContext } from '@aave/aave-ui-kit';
import { Network } from '@aave/protocol-js';

import messages from './messages';
import staticStyles from './style';
import { networkConfigs } from '../../../../ui-config';

interface SelectPreferredNetworkProps {
  preferredNetwork: Network;
  onSelectPreferredNetwork: (network: Network) => void;
  supportedNetworks: Network[];
}

export default function SelectPreferredNetwork({
  preferredNetwork,
  onSelectPreferredNetwork,
  supportedNetworks,
}: SelectPreferredNetworkProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const [visible, setVisible] = useState(false);

  const formattedNetwork = (network: Network) =>
    network === Network.mainnet ? 'Ethereum' : network;
  const isTestnet = (network: Network) => networkConfigs[network].isTestnet;

  return (
    <div className="SelectPreferredNetwork">
      <p className="SelectPreferredNetwork__title">{intl.formatMessage(messages.title)}</p>

      <DropdownWrapper
        visible={visible}
        setVisible={setVisible}
        buttonComponent={
          <button
            className="SelectPreferredNetwork__select"
            type="button"
            onClick={() => setVisible(true)}
          >
            <span>
              {intl.formatMessage(
                isTestnet(preferredNetwork) ? messages.testNetwork : messages.mainnet,
                { network: formattedNetwork(preferredNetwork) }
              )}
            </span>
            <AnimationArrow
              className="SelectPreferredNetwork__select-arrow"
              active={visible}
              width={12}
              height={6}
              arrowTopPosition={1}
              arrowWidth={7}
              arrowHeight={1}
              color={currentTheme.textDarkBlue.hex}
            />
          </button>
        }
        verticalPosition="bottom"
        horizontalPosition="center"
      >
        {supportedNetworks.map((network) => (
          <button
            type="button"
            className="SelectPreferredNetwork__option"
            onClick={() => {
              onSelectPreferredNetwork(network);
              setVisible(false);
            }}
            key={network}
            disabled={network === preferredNetwork}
          >
            <span>
              {intl.formatMessage(isTestnet(network) ? messages.testNetwork : messages.mainnet, {
                network: formattedNetwork(network),
              })}
            </span>
          </button>
        ))}
      </DropdownWrapper>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .SelectPreferredNetwork {
          &__select {
            background: ${currentTheme.whiteItem.hex};
            color: ${currentTheme.textDarkBlue.hex};
            &:hover {
              border-color: ${currentTheme.textDarkBlue.hex};
            }
          }

          &__option {
            color: ${currentTheme.darkBlue.hex};
            &:after {
              background: ${currentTheme.darkBlue.hex};
            }
            &:hover,
            &:disabled {
              background: ${currentTheme.mainBg.hex};
              color: ${currentTheme.textDarkBlue.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
