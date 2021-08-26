import React from 'react';
import { useIntl } from 'react-intl';

import Row from '../../../../../components/basic/Row';
import Value from '../../../../../components/basic/Value';

import messages from './messages';
import staticStyles from './style';

interface LiquidationContentProps {
  value: number;
  symbol: string;
  subValue?: number;
}

export default function LiquidationContent({ value, symbol, subValue }: LiquidationContentProps) {
  const intl = useIntl();

  return (
    <>
      <Row
        title={intl.formatMessage(messages.collateralSeized)}
        withMargin={true}
        onWhiteBackground={true}
      >
        <Value
          value={value}
          symbol={symbol}
          subValue={subValue}
          subSymbol="USD"
          className="LiquidationContent__value"
          tokenIcon={true}
          onWhiteBackground={true}
        />
      </Row>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </>
  );
}
