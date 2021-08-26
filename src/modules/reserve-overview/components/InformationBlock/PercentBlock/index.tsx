import React from 'react';

import ValuePercent from '../../../../../components/basic/ValuePercent';
import BlockWrapper, { BlockWrapperProps } from '../BlockWrapper';

import staticStyles from './style';

interface PercentBlockProps extends Pick<BlockWrapperProps, 'title' | 'titleComponent'> {
  value: number;
}

export default function PercentBlock({ title, titleComponent, value }: PercentBlockProps) {
  return (
    <BlockWrapper title={title} titleComponent={titleComponent}>
      {value <= 0 ? (
        <span className="PercentBlock__no-value">—</span>
      ) : (
        <ValuePercent
          value={value}
          color="dark"
          minimumDecimals={2}
          maximumDecimals={2}
          className="PercentBlock__value"
        />
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </BlockWrapper>
  );
}
