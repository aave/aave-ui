import React, { ReactNode, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext, AnimationArrow } from '@aave/aave-ui-kit';
import { BlockTitle } from '../../BlockTitle';
import messages from './messages';
import staticStyles from './style';
import styled from 'styled-components';

interface ContentWrapperWithTopLineProps {
  className?: string;
  title: string;
  topRightInfo?: ReactNode;
  children: ReactNode;
  withDropdown?: boolean;
  width?: string;
}

const BlockWrapper = styled.div`
  padding: 30px 35px;
  border-radius: 5px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border: solid 1px rgba(255, 255, 255, 0.68);
  background-color: transparent;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) -6%,
    rgba(255, 255, 255, 0.79) 59%
  );
`;

export default function ContentWrapperWithTopLine({
  width,
  className,
  title,
  topRightInfo,
  children,
  withDropdown,
}: ContentWrapperWithTopLineProps) {
  const intl = useIntl();
  const { currentTheme, sm, isCurrentThemeDark } = useThemeContext();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible && !sm) {
      setVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sm]);

  return (
    <>
      <BlockTitle style={{ marginTop: 30, marginBottom: 20 }}>{title}</BlockTitle>
      <BlockWrapper
        style={{ width }}
        // className={classNames(
        //   'ContentWrapperWithTopLine',
        //   { ContentWrapperWithTopLine__withDropdown: withDropdown },
        //   className
        // )}
      >
        {/* <div
        className={classNames('ContentWrapperWithTopLine__top-line', {
          ContentWrapperWithTopLine__topLineActive: visible,
        })}
        onClick={() => withDropdown && setVisible(!visible)}
      >
        <p>{title}</p>
        {topRightInfo && (
          <div className="ContentWrapperWithTopLine__topRightInfo">{topRightInfo}</div>
        )}
        {withDropdown && (
          <div className="ContentWrapperWithTopLine__arrow-inner">
            <span>{intl.formatMessage(visible ? messages.collapse : messages.expand)}</span>
            <AnimationArrow
              active={visible}
              width={16}
              height={10}
              arrowTopPosition={5}
              arrowWidth={10}
              arrowHeight={2}
              color={currentTheme.white.hex}
            />
          </div>
        )}
      </div> */}

        {children}

        <style jsx={true}>{staticStyles}</style>
        <style jsx={true}>{`
          .ContentWrapperWithTopLine {
            &__top-line {
              color: ${currentTheme.white.hex};
              background: ${isCurrentThemeDark
                ? currentTheme.headerBg.hex
                : currentTheme.darkBlue.hex};
            }

            &__content {
              background: ${currentTheme.whiteElement.hex};
            }
          }
        `}</style>
      </BlockWrapper>
    </>
  );
}
