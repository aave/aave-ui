import React, { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import { useThemeContext } from '@aave/aave-ui-kit';

import messages from './messages';
import staticStyles from './style';
import styled from 'styled-components';
import arrow from '../../../images/arrowLeft.svg'

interface ContentWrapperProps {
  className?: string;
  withFullHeight?: boolean;
  withBackButton?: boolean;
  goBack?: () => void;
  children: ReactNode;
}

const BtnText = styled.p`
  font-family: Montserrat;
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #131313;
  margin-left: 4px;
`

export default function ContentWrapper({
  className,
  children,
  withFullHeight,
  withBackButton,
  goBack,
}: ContentWrapperProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const history = useHistory();

  return (
    <div
      className={classNames(
        'ContentWrapper',
        { ContentWrapper__fullHeight: withFullHeight },
        className
      )}
    >
      {withBackButton && history.length > 2 && (
        <button style={{
          
          borderRadius: 4,
          border: 'solid 1px #7159ff',
        }} className="ContentWrapper__back-button" onClick={goBack || history.goBack}>
          <img src={arrow} alt="back" />
          <BtnText>{intl.formatMessage(messages.back)}</BtnText>
        </button>
      )}

      {children}

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .ContentWrapper {
          color: ${currentTheme.darkBlue.hex};
          background: ${currentTheme.whiteElement.hex};

          &__back-button {
            color: ${currentTheme.textDarkBlue.hex};
            border: 1px solid ${currentTheme.textDarkBlue.hex};
            // &:hover {
            //   background: ${currentTheme.textDarkBlue.hex};
            //   color: ${currentTheme.whiteElement.hex};
            //   span {
            //     border-color: ${currentTheme.whiteElement.hex};
            //     &:after {
            //       border: solid ${currentTheme.whiteElement.hex};
            //       border-width: 0 1px 1px 0;
            //     }
            //   }
            // }
            span {
              border: 1px solid ${currentTheme.textDarkBlue.hex};
              &:after {
                border: solid ${currentTheme.textDarkBlue.hex};
                border-width: 0 1px 1px 0;
              }
            }
          }
        }
      `}</style>
    </div>
  );
}
