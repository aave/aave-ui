import React from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/math-utils';

import RightPanelWrapper from '../RightPanelWrapper';
import Row from '../../basic/Row';
import ChangeValue from '../../ChangeValue';
import ValuePercent from '../../basic/ValuePercent';
import Value from '../../basic/Value';
import HFChangeValue from '../../HFChangeValue';
import SlippageForm from './components/SlippageForm';
import MinimumReceivedHelpModal from '../../HelpModal/MinimumReceivedHelpModal';

import messages from './messages';

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
  flashloanFees,
}: SwapDetailsWrapperProps) {
  const intl = useIntl();

  const totalFees = valueToBigNumber(flashloanFees || '0').toString();

  return (
    <RightPanelWrapper title={title}>
      <Row className="SwapDetailsWrapper__row" title={intl.formatMessage(messages.priceImpact)}>
        <ValuePercent value={+priceImpact / 100} />
      </Row>

      {withMinimumReceived && (
        <Row
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
        <Row title={intl.formatMessage(messages.APYChange)}>
          <ChangeValue
            leftComponent={<ValuePercent value={fromAPY || 0} />}
            rightComponent={<ValuePercent value={toAPY || 0} />}
          />
        </Row>
      )}

      {+healthFactor > 0 && (
        <HFChangeValue healthFactor={healthFactor} hfAfterSwap={hfAfterSwap.toString()} />
      )}

      <SlippageForm maxSlippage={maxSlippage} setMaxSlippage={setMaxSlippage} />

      {totalFees !== '0' && (
        <Row title={intl.formatMessage(messages.flashloanFee)}>
          <ValuePercent value={totalFees} color="secondary" />
        </Row>
      )}
    </RightPanelWrapper>
  );
}
