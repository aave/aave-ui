import React from 'react';
import { useIntl } from 'react-intl';
import { CustomTooltip } from '@aave/aave-ui-kit';

import { getEmodeMessage } from '../../../helpers/e-mode/getEmodeMessage';

import messages from './messages';

import eModeIcon from '../../../images/eModeIcon.svg';

interface EModeIconWithTooltipProps {
  tooltipId: string;
  eModeCategoryId: number;
}

export default function EModeIconWithTooltip({
  tooltipId,
  eModeCategoryId,
}: EModeIconWithTooltipProps) {
  const intl = useIntl();

  return (
    <div className="EModeIconWithTooltip" data-tip={true} data-for={tooltipId}>
      <img src={eModeIcon} alt="" />

      <CustomTooltip
        tooltipId={tooltipId}
        text={intl.formatMessage(messages.text, {
          eModeCategory: getEmodeMessage(eModeCategoryId, intl),
        })}
      />

      <style jsx={true}>{`
        .EModeIconWithTooltip {
          text-align: center;
        }
      `}</style>
    </div>
  );
}
