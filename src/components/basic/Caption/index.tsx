import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import staticStyles from './style';

import animationCircle from '../../../images/animationCircle.svg';
import styled from 'styled-components';

interface CaptionProps {
  title: string;
  description?: string | ReactNode;
  color?: 'primary' | 'secondary' | 'dark';
  className?: string;
  marginBottom?: number;
  withAnimationCircle?: boolean;
  onWhiteBackground?: boolean;
}

const Title = styled.h2`
  font-family: Montserrat;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #131313;
`
const Descr = styled.p`
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: center;
  color: #131313;
  max-width: 345px;
  margin: 15px auto 0;
  text-align: center;
`

export default function Caption({
  title,
  description,
  color = 'primary',
  className,
  marginBottom,
  withAnimationCircle,
  onWhiteBackground,
}: CaptionProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div
      className={classNames('Caption', `Caption__${color}`, className)}
      style={{ marginBottom: `${marginBottom}px` }}
    >
      <Title className={classNames({ Caption__titleWithCircle: withAnimationCircle })}>
        {title} {withAnimationCircle && <img src={animationCircle} alt="" />}
      </Title>
      {description && <Descr className="Caption__description">{description}</Descr>}

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .Caption {
          &__market {
            h2 {
              color: ${currentTheme.primary.hex};
            }
          }

          &__primary {
            h2 {
              color: ${currentTheme.primary.hex};
            }
          }

          &__secondary {
            h2 {
              color: ${currentTheme.secondary.hex};
            }
          }

          &__dark {
            h2 {
              color: ${onWhiteBackground
                ? currentTheme.darkBlue.hex
                : currentTheme.textDarkBlue.hex};
            }
          }

          &__description {
            color: ${onWhiteBackground ? currentTheme.darkBlue.hex : currentTheme.textDarkBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
