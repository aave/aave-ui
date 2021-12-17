import React from 'react';

import ValuePercent from '../../../../../components/basic/ValuePercent';
import BlockWrapper, { BlockWrapperProps } from '../BlockWrapper';
import EModeIconWithTooltip from '../../../../../components/eMode/EModeIconWithTooltip';

import staticStyles from './style';

interface PercentBlockProps extends Pick<BlockWrapperProps, 'title' | 'titleComponent'> {
  value: number;
  eModeCategoryId?: number;
  withEModeIcon?: boolean;
}

export default function PercentBlock({
  title,
  titleComponent,
  value,
  withEModeIcon,
  eModeCategoryId,
}: PercentBlockProps) {
  return (
    <BlockWrapper title={title} titleComponent={titleComponent}>
      {value <= 0 ? (
        <span className="PercentBlock__no-value">—</span>
      ) : (
        <div className="PercentBlock__content">
          {withEModeIcon && eModeCategoryId && (
            <EModeIconWithTooltip
              tooltipId={title || 'tooltipId'}
              eModeCategoryId={eModeCategoryId}
            />
          )}
          <ValuePercent
            value={value}
            color="dark"
            minimumDecimals={2}
            maximumDecimals={2}
            className="PercentBlock__value"
          />
        </div>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </BlockWrapper>
  );
}
