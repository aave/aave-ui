import React from 'react';
import { useIntl } from 'react-intl';
import { CustomTooltip } from '@aave/aave-ui-kit';

import messages from './messages';

import eModeIcon from '../../../images/eModeIcon.svg';

interface EModeIconWithTooltipProps {
  tooltipId: string;
}

export default function EModeIconWithTooltip({ tooltipId }: EModeIconWithTooltipProps) {
  const intl = useIntl();

  return (
    <div className="EModeIconWithTooltip" data-tip={true} data-for={tooltipId}>
      <img src={eModeIcon} alt="" />

      <CustomTooltip tooltipId={tooltipId} text={intl.formatMessage(messages.text)} />
    </div>
  );
}
