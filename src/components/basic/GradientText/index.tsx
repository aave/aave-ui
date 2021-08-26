import React, { ReactElement } from 'react';

import { gradient } from '@aave/aave-ui-kit';

import staticStyles from './style';

export interface TextGradientProps {
  className?: string;
  colorStart: readonly number[];
  colorEnd: readonly number[];
  title: string | ReactElement;
  withUSD?: boolean;
}

export default function GradientText({
  className,
  colorStart,
  colorEnd,
  title,
  withUSD,
}: TextGradientProps) {
  const gradientBackground = gradient(68, `${colorStart}, 1`, 0, `${colorEnd}, 1`, 100);

  return (
    <p className="GradientText">
      <span className={className}>
        {withUSD && '$'} {title}
      </span>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .GradientText span {
          background-image: ${gradientBackground};
        }
      `}</style>
    </p>
  );
}
