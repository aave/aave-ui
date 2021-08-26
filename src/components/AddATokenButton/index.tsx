import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { ATokenInfo } from '../../helpers/get-atoken-info';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useProtocolDataContext } from '../../libs/protocol-data-provider';
import { addERC20Token } from '../../helpers/add-erc20';

import messages from './messages';
import staticStyles from './style';

interface AddATokenButtonProps {
  aTokenData: ATokenInfo;
}

export default function AddATokenButton({ aTokenData }: AddATokenButtonProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { currentMarketData } = useProtocolDataContext();
  const [isDisabled, setIsDisabled] = useState(false);

  const symbol =
    aTokenData.formattedSymbol ||
    `${currentMarketData.aTokenPrefix.toLowerCase()}${aTokenData.symbol}`;

  const handleAddAsset = async () => {
    setIsDisabled(true);
    const result = await addERC20Token(
      aTokenData.address,
      symbol,
      aTokenData.decimals,
      aTokenData.icon
    );
    // If user added the token, we get a true back, which means we can let the button be in disabled state
    setIsDisabled(result);
  };

  return (
    <button className="AddATokenButton" onClick={handleAddAsset} disabled={isDisabled}>
      <span className="AddATokenButton__title">
        {intl.formatMessage(messages.title, { asset: symbol })}
      </span>

      <div className="AddATokenButton__circle" />

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        @import 'src/_mixins/screen-size';

        .AddATokenButton {
          background: ${currentTheme.whiteItem.hex};
          color: ${currentTheme.textDarkBlue.hex};
          @include respond-to(sm) {
            background: ${currentTheme.whiteElement.hex};
          }

          &:disabled {
            background: ${currentTheme.disabledGray.hex};
          }

          &:hover {
            box-shadow: 0 0 7px 0 ${currentTheme.primary.hex};
          }

          &__circle {
            background: ${currentTheme.primary.hex};
            &:after,
            &:before {
              background: ${currentTheme.white.hex};
            }
          }
        }
      `}</style>
    </button>
  );
}
