import React from 'react';
import classNames from 'classnames';

import ValuePercent from '../../basic/ValuePercent';
import NoData from '../../basic/NoData';
import IncentivesButton from '../IncentivesButton';

import staticStyles from './style';
import { ReserveIncentiveResponse } from '../../../libs/pool-data-provider/hooks/use-incentives-data';

interface IncentivesCardProps {
  symbol: string;
  value: string | number;
  incentives?: ReserveIncentiveResponse[];
  className?: string;
  mobilePosition?: 'left' | 'right';
}

export default function IncentivesCard({
  symbol,
  value,
  incentives,
  className,
  mobilePosition = 'right',
}: IncentivesCardProps) {
  return (
    <div className={classNames('IncentivesCard', `IncentivesCard__${mobilePosition}`, className)}>
      {value.toString() !== '-1' ? (
        <ValuePercent maximumDecimals={2} minimumDecimals={2} value={value} />
      ) : (
        <NoData className="IncentivesCard__noData" color="dark" />
      )}

      <IncentivesButton incentives={incentives} symbol={symbol} />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
}
