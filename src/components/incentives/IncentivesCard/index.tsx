import React from 'react';
import classNames from 'classnames';

import { ReserveIncentive } from '../../../libs/pool-data-provider/hooks/use-incentives-data-context';
import ValuePercent from '../../basic/ValuePercent';
import NoData from '../../basic/NoData';
import IncentivesButton from '../IncentivesButton';

import staticStyles from './style';

interface IncentivesCardProps {
  symbol: string;
  value: string | number;
  incentives?: ReserveIncentive[];
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
