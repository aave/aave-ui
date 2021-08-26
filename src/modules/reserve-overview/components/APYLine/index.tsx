import React from 'react';

import Row from '../../../../components/basic/Row';
import ValuePercent from '../../../../components/basic/ValuePercent';
import NoData from '../../../../components/basic/NoData';

import staticStyles from './style';

interface APYLineProps {
  title: string;
  value: number;
  condition?: boolean;
}

export default function APYLine({ title, value, condition }: APYLineProps) {
  return (
    <Row className="APYLine" title={title}>
      {value >= 0 && condition ? (
        <ValuePercent
          className="APYLine__percent"
          value={value}
          color="dark"
          maximumDecimals={2}
          minimumDecimals={2}
        />
      ) : (
        <NoData color="dark" />
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </Row>
  );
}
