import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { valueToBigNumber } from '@aave/protocol-js';
import { useThemeContext } from '@aave/aave-ui-kit';

import Value from '../../basic/Value';
import CapsTooltip from '../CapsTooltip';
import { CapType } from '../helper';

import messages from './messages';
import staticStyles from './style';

interface CapsHintProps {
  capType: CapType;
  capAmount: string;
  totalAmount: string | number;
  tooltipId: string;
  isUSD?: boolean;
  withoutText?: boolean;
}

export default function CapsHint({
  capType,
  capAmount,
  totalAmount,
  tooltipId,
  isUSD,
  withoutText,
}: CapsHintProps) {
  const intl = useIntl();
  const { currentTheme, md, sm } = useThemeContext();

  const cap = Number(capAmount);
  if (cap <= 0) return null;

  const percentageOfCap = valueToBigNumber(totalAmount).dividedBy(cap).toNumber();
  const value = valueToBigNumber(cap).minus(totalAmount).multipliedBy('0.995').toNumber();

  const title =
    md && !sm
      ? intl.formatMessage(messages.available)
      : intl.formatMessage(
          capType === CapType.supplyCap ? messages.supplyCapTitle : messages.borrowCapTitle
        );

  if (percentageOfCap < 0.99) return null;

  return (
    <div className={classNames('CapsHint', { CapsHint__withoutText: withoutText })}>
      <CapsTooltip tooltipId={tooltipId} availableValue={value} isUSD={isUSD} capType={capType} />

      {!withoutText && (
        <>
          <p className="CapsHint__title">{title}</p>
          <Value
            value={value >= 0 ? value : 0}
            compact={true}
            maximumValueDecimals={2}
            symbol={isUSD ? 'USD' : undefined}
            tokenIcon={isUSD}
            withoutSymbol={true}
          />
        </>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .CapsHint {
          &__title {
            color: ${currentTheme.lightBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
