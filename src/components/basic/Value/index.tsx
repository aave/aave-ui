import React, { ReactNode, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
import { useThemeContext } from '@aave/aave-ui-kit';

import { isAtoken } from '../../../helpers/get-atoken-info';
import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import { CompactNumber } from '../CompactNumber';
import SubValue from './SubValue';
import ValueWithSmallDecimals from './ValueWithSmallDecimals';
import { getAssetInfo, TokenIcon } from '../../../helpers/config/assets-config';

import staticStyles from './style';

interface ValueProps {
  tokenIcon?: boolean;
  value: string | number;
  symbol?: string;
  maximumValueDecimals?: number;
  minimumValueDecimals?: number;
  subValue?: string | number;
  subSymbol?: string;
  maximumSubValueDecimals?: number;
  minimumSubValueDecimals?: number;
  updateCondition?: boolean;
  className?: string;
  id?: string;
  compact?: boolean;
  withoutSymbol?: boolean;
  withSmallDecimals?: boolean;
  tooltipId?: string;
  color?: 'dark' | 'white' | 'primary';
  isSmallValueCenterEllipsis?: boolean;
  onWhiteBackground?: boolean;
  nextToValue?: ReactNode;
  maximumTooltipDecimals?: number;
  minimumTooltipDecimals?: number;
}

export default function Value({
  tokenIcon,
  value,
  symbol,
  maximumValueDecimals,
  minimumValueDecimals,
  subValue,
  subSymbol,
  maximumSubValueDecimals,
  minimumSubValueDecimals,
  updateCondition,
  className,
  id,
  compact,
  withoutSymbol,
  withSmallDecimals,
  tooltipId,
  color = 'dark',
  isSmallValueCenterEllipsis,
  onWhiteBackground,
  nextToValue,
  maximumTooltipDecimals,
  minimumTooltipDecimals,
}: ValueProps) {
  const intl = useIntl();
  const { currentTheme, xl } = useThemeContext();
  const { currentMarketData } = useProtocolDataContext();

  const asset = symbol && getAssetInfo(symbol);
  const [newValue, setNewValue]: any = useState(value);
  const [newSubValue, setNewSubValue]: any = useState(subValue);
  const updateValue = updateCondition ? undefined : value;
  useEffect(() => {
    setNewValue(value);
    setNewSubValue(subValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateValue]);

  const minValue = 10 ** -(maximumValueDecimals || 5);
  const isSmallerThanMin = Number(newValue) !== 0 && Number(newValue) < minValue;

  const formattedMaximumDecimals =
    typeof maximumValueDecimals === 'undefined'
      ? 5
      : maximumValueDecimals === 0
      ? 0
      : maximumValueDecimals;

  return (
    <div
      className={classNames('Value', `Value__${color}`, className, {
        Value__withSmallDecimals: withSmallDecimals,
        Value__withSmallDecimalsEllipsis: withSmallDecimals && isSmallValueCenterEllipsis,
        Value__onWhiteBackground: onWhiteBackground,
      })}
    >
      <div className="Value__line">
        {tokenIcon && symbol && (
          <TokenIcon
            className="Value__token-icon"
            tokenSymbol={isAtoken(currentMarketData.aTokenPrefix, symbol).symbol.toUpperCase()}
            width={xl ? 16 : 18}
            height={xl ? 16 : 18}
            isAtokenIcon={isAtoken(currentMarketData.aTokenPrefix, symbol).isAtoken}
          />
        )}

        <p className="Value__value" id={id} data-tip={true} data-for={tooltipId}>
          {!withSmallDecimals ? (
            <>
              {!compact && value < 10000000000 ? (
                <>
                  {isSmallerThanMin && '< '}
                  {intl.formatNumber(isSmallerThanMin ? minValue : Number(newValue), {
                    maximumFractionDigits: formattedMaximumDecimals,
                    minimumFractionDigits: minimumValueDecimals ? minimumValueDecimals : undefined,
                  })}
                </>
              ) : (
                <>
                  {isSmallerThanMin && '< '}
                  <CompactNumber
                    value={isSmallerThanMin ? minValue : Number(newValue)}
                    maximumFractionDigits={formattedMaximumDecimals}
                    minimumFractionDigits={minimumValueDecimals ? minimumValueDecimals : undefined}
                  />
                </>
              )}
            </>
          ) : (
            <>
              {isSmallerThanMin && '< '}
              <ValueWithSmallDecimals
                value={Number(newValue)}
                maximumValueDecimals={maximumValueDecimals || 10}
                minimumValueDecimals={
                  minimumValueDecimals === 0
                    ? 0
                    : minimumValueDecimals
                    ? minimumValueDecimals
                    : undefined
                }
                centerEllipsis={isSmallValueCenterEllipsis}
              />
            </>
          )}

          {symbol && !withoutSymbol && !!asset && (
            <span className="Value__symbol">{asset.formattedName || asset.symbol}</span>
          )}
        </p>

        {!!nextToValue && nextToValue}
      </div>

      {!!newSubValue && (
        <div className="Value__line Value__subValue--line">
          <SubValue
            symbol={subSymbol}
            value={Number(newSubValue)}
            maximumDecimals={maximumSubValueDecimals}
            minimumDecimals={minimumSubValueDecimals}
            color={color}
          />
        </div>
      )}

      {!!tooltipId && (
        <ReactTooltip className="Value__tooltip" id={tooltipId} effect="solid">
          <span>
            {intl.formatNumber(Number(newValue), {
              minimumFractionDigits: minimumTooltipDecimals,
              maximumFractionDigits: maximumTooltipDecimals || 7,
            })}{' '}
            {symbol && !withoutSymbol && !!asset && asset.formattedName && (
              <>{asset.formattedName}</>
            )}
          </span>
        </ReactTooltip>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .Value {
          &__dark {
            .Value__value {
              color: ${currentTheme.textDarkBlue.hex};
            }
          }
          &__white {
            .Value__value {
              color: ${currentTheme.white.hex};
            }
            .Value__token-icon {
              .TokenIcon__dollar {
                color: ${currentTheme.white.hex};
              }
            }
          }
          &__primary {
            .Value__value {
              color: ${currentTheme.primary.hex};
            }
            .Value__token-icon {
              .TokenIcon__dollar {
                color: ${currentTheme.primary.hex};
              }
            }
          }

          .Value__tooltip {
            background: ${currentTheme.darkBlue.hex};
            &:after {
              border-top-color: ${currentTheme.darkBlue.hex} !important;
            }
          }

          &__withSmallDecimalsEllipsis {
            .Value__value,
            &.Value__withSmallDecimals .ValueWithSmallDecimals {
              color: ${currentTheme.darkOrange.hex};
            }
            .Value__symbol {
              color: ${currentTheme.darkBlue.hex};
            }
          }
        }

        .Value__onWhiteBackground {
          .Value__value {
            color: ${currentTheme.darkBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
