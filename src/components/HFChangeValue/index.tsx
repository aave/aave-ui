import React from 'react';
import { useIntl } from 'react-intl';

import Row from '../basic/Row';
import ChangeValue from '../ChangeValue';
import HealthFactor from '../HealthFactor';

import messages from './messages';

interface HFChangeValueProps {
  healthFactor: string;
  hfAfterAction: string;
}

export default function HFChangeValue({ healthFactor, hfAfterAction }: HFChangeValueProps) {
  const intl = useIntl();

  return (
    <Row title={intl.formatMessage(messages.newHealthFactor)}>
      <ChangeValue
        leftComponent={<HealthFactor value={healthFactor} withoutTitle={true} />}
        rightComponent={<HealthFactor value={hfAfterAction.toString()} withoutTitle={true} />}
      />
    </Row>
  );
}
