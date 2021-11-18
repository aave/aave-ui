import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import TailArrow from '../../../../components/basic/TailArrow';
import { HistoryItemTypes } from '../../types';
import { getAssetInfo, TokenIcon } from '../../../../helpers/config/assets-config';

import messages from './messages';
import staticStyles from './style';

export interface StateChangesProps extends Pick<HistoryItemTypes, 'type'> {
  condition: boolean | undefined;
  symbol?: string;
  className?: string;
  insideModal?: boolean;
}

export default function StateChanges({
  type = 'Swap',
  condition,
  symbol,
  className,
  insideModal,
}: StateChangesProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  const asset = symbol && getAssetInfo(symbol);

  return (
    <div
      className={classNames(
        'StateChanges',
        {
          StateChangesCollateral: type === 'UsageAsCollateral',
          StateChangesInverseColors: !condition,
          StateChangesCollateralInverseColors: type === 'UsageAsCollateral' && !condition,
          StateChangesCollateralInsideModal: insideModal,
        },
        className
      )}
    >
      <div className="StateChanges__arrows-wrapper">
        <div className="StateChanges__info-block StateChanges__leftInfo-block">
          <span>
            {intl.formatMessage(
              type === 'UsageAsCollateral' && condition
                ? messages.yes
                : type === 'UsageAsCollateral'
                ? messages.no
                : type === 'Swap' && condition
                ? messages.variable
                : messages.stable
            )}
          </span>
        </div>
        <TailArrow
          className="StateChanges__arrow"
          color={
            type === 'UsageAsCollateral' && condition
              ? 'red'
              : type === 'UsageAsCollateral'
              ? 'green'
              : condition
              ? 'dark'
              : 'dark'
          }
          onWhiteBackground={insideModal}
        />
        <div className="StateChanges__info-block StateChanges__rightInfo-block">
          <span>
            {intl.formatMessage(
              type === 'UsageAsCollateral' && !condition
                ? messages.yes
                : type === 'UsageAsCollateral'
                ? messages.no
                : type === 'Swap' && !condition
                ? messages.variable
                : messages.stable
            )}
          </span>
        </div>
      </div>

      {symbol && (
        <div className="StateChanges__token-inner">
          <TokenIcon
            className="StateChanges__token-icon"
            tokenSymbol={symbol}
            height={18}
            width={18}
          />
          {!!asset && asset.formattedName && <span>{asset.formattedName}</span>}
        </div>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .StateChanges {
          .StateChanges__leftInfo-block {
            border-color: ${currentTheme.textDarkBlue.hex};
            color: ${currentTheme.textDarkBlue.hex};
          }
          .StateChanges__rightInfo-block {
            border-color: ${currentTheme.textDarkBlue.hex};
            background: ${currentTheme.textDarkBlue.hex};
            color: ${isCurrentThemeDark ? currentTheme.darkBlue.hex : currentTheme.white.hex};
          }

          &__token-inner {
            span {
              color: ${currentTheme.textDarkBlue.hex};
            }
          }
        }

        .StateChangesCollateralInsideModal {
          .StateChanges__leftInfo-block {
            border-color: ${currentTheme.darkBlue.hex};
            color: ${currentTheme.darkBlue.hex};
          }
          .StateChanges__rightInfo-block {
            border-color: ${currentTheme.darkBlue.hex};
            background: ${currentTheme.darkBlue.hex};
            color: ${currentTheme.white.hex};
          }
        }

        .StateChangesCollateral {
          .StateChanges__leftInfo-block {
            border-color: ${currentTheme.green.hex};
            color: ${currentTheme.green.hex};
          }
          .StateChanges__rightInfo-block {
            border-color: ${currentTheme.red.hex};
            background: ${currentTheme.red.hex};
            color: ${currentTheme.white.hex};
          }
        }
        .StateChangesCollateralInverseColors {
          .StateChanges__leftInfo-block {
            border-color: ${currentTheme.red.hex};
            color: ${currentTheme.red.hex};
          }
          .StateChanges__rightInfo-block {
            border-color: ${currentTheme.green.hex};
            background: ${currentTheme.green.hex};
          }
        }
      `}</style>
    </div>
  );
}
