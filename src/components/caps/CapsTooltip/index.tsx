import React from 'react';
import { useIntl } from 'react-intl';
import { CustomTooltip } from '@aave/aave-ui-kit';

import { CapType } from '../CapsHint';

import messages from './messages';

import alertIcon from '../../../images/alertCircleRed.svg';
import staticStyles from './style';

interface CapsTooltipProps {
  tooltipId: string;
  availableValue: number;
  isUSD?: boolean;
  capType: CapType;
}

export default function CapsTooltip({
  tooltipId,
  availableValue,
  isUSD,
  capType,
}: CapsTooltipProps) {
  const intl = useIntl();

  let message = undefined;
  if (availableValue > 0) {
    message = intl.formatMessage(
      capType === CapType.supplyCap
        ? messages.supplyCapNearlyReached
        : messages.borrowCapNearlyReached,
      {
        availableValue: `${isUSD ? `${availableValue}$` : availableValue}`,
      }
    );
  } else if (availableValue <= 0) {
    message = intl.formatMessage(
      capType === CapType.supplyCap ? messages.supplyCapReached : messages.borrowCapReached
    );
  }

  return (
    <div className="CapsTooltip" data-tip={true} data-for={tooltipId}>
      <img src={alertIcon} alt="" />

      {!!message && <CustomTooltip tooltipId={tooltipId} text={message} />}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
}
