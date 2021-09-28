import React from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';
import { rgba, useThemeContext } from '@aave/aave-ui-kit';

import ContentWrapperWithTopLine from '../ContentWrapperWithTopLine';
import Row from '../../basic/Row';
import ValuePercent from '../../basic/ValuePercent';
import Value from '../../basic/Value';
import SwapChangeValue from './components/SwapChangeValue';
import HealthFactor from '../../HealthFactor';
import SlippageForm from './components/SlippageForm';
import MinimumReceivedHelpModal from '../../HelpModal/MinimumReceivedHelpModal';

import messages from './messages';
import staticStyles from './style';

export const DEFAULT_MAX_SLIPPAGE = '2';

interface SwapDetailsWrapperProps {
  title: string;
  priceImpact: string;
  withMinimumReceived?: boolean;
  minimumReceivedValue?: string;
  minimumReceivedValueInUSD?: string;
  minimumReceivedSymbol?: string;
  withAPY?: boolean;
  fromAPY?: string | number;
  toAPY?: string | number;
  healthFactor: string;
  hfAfterSwap: string;
  maxSlippage: string;
  setMaxSlippage: (value: string) => void;
  withFees?: boolean;
  flashloanFees?: string | number;
}

export default function SwapDetailsWrapper({
  title,
  priceImpact,
  withMinimumReceived,
  minimumReceivedValue,
  minimumReceivedValueInUSD,
  minimumReceivedSymbol,
  withAPY,
  fromAPY,
  toAPY,
  healthFactor,
  hfAfterSwap,
  maxSlippage,
  setMaxSlippage,
  withFees,
  flashloanFees,
}: SwapDetailsWrapperProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const totalFees = valueToBigNumber(flashloanFees || '0').toString();

  const rowBorderColor = rgba(`${currentTheme.lightBlue.rgb}, 0.1`);

  return (
    <ContentWrapperWithTopLine title={title} className="SwapDetailsWrapper">
      <Row className="SwapDetailsWrapper__row" title={intl.formatMessage(messages.priceImpact)}>
        <ValuePercent value={+priceImpact / 100} />
      </Row>

      {withMinimumReceived && (
        <Row
          className="SwapDetailsWrapper__row"
          title={<MinimumReceivedHelpModal text={intl.formatMessage(messages.minimumReceived)} />}
        >
          <Value
            value={minimumReceivedValue || 0}
            symbol={minimumReceivedSymbol}
            subValue={minimumReceivedValueInUSD || 0}
            subSymbol="USD"
          />
        </Row>
      )}

      {withAPY && (
        <Row className="SwapDetailsWrapper__row" title={intl.formatMessage(messages.APYChange)}>
          <SwapChangeValue
            leftComponent={<ValuePercent value={fromAPY || 0} />}
            rightComponent={<ValuePercent value={toAPY || 0} />}
          />
        </Row>
      )}

      {+healthFactor > 0 && (
        <Row
          className="SwapDetailsWrapper__row"
          title={intl.formatMessage(messages.newHealthFactor)}
        >
          <SwapChangeValue
            leftComponent={<HealthFactor value={healthFactor} withoutTitle={true} />}
            rightComponent={<HealthFactor value={hfAfterSwap.toString()} withoutTitle={true} />}
          />
        </Row>
      )}

      <SlippageForm maxSlippage={maxSlippage} setMaxSlippage={setMaxSlippage} />

      {withFees && (
        <Row className="SwapDetailsWrapper__row" title={intl.formatMessage(messages.flashloanFee)}>
          <ValuePercent value={totalFees} color="secondary" />
        </Row>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .SwapDetailsWrapper {
          .SwapDetailsWrapper__row {
            border-bottom: 1px solid ${rowBorderColor};
          }

          .HealthFactor__no-value {
            color: ${currentTheme.textDarkBlue.hex} !important;
          }
          .ValuePercent__secondary {
            span {
              color: ${currentTheme.secondary.hex} !important;
            }
          }
        }
      `}</style>
    </ContentWrapperWithTopLine>
  );
}
