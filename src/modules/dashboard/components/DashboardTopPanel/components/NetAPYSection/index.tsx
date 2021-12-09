import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import ValuePercent from '../../../../../../components/basic/ValuePercent';
import SectionWrapper from '../SectionWrapper';
import NetAPYGraph from '../NetAPYGraph';
import NetWorth from '../NetWorth';

import messages from './messages';
import staticStyles from './style';
import NetAPY from '../NetAPY';

interface NetAPYSectionProps {
  earnedAPY: number;
  debtAPY: number;
  netWorth: number;
  isCollapse: boolean;
}

export default function NetAPYSection({
  earnedAPY,
  debtAPY,
  netWorth,
  isCollapse,
}: NetAPYSectionProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark, sm } = useThemeContext();

  const netAPY = earnedAPY - debtAPY;

  return (
    <SectionWrapper className="NetAPYSection" isCollapse={isCollapse}>
      <div className="NetAPYSection__wrapper">
        {!isCollapse && !sm && <NetAPYGraph debtAPY={debtAPY} earnedAPY={earnedAPY} />}

        <div
          className={classNames('NetAPYSection__right--inner', {
            NetAPYSection__rightInnerCollapse: isCollapse,
          })}
        >
          <NetAPY value={netAPY} isCollapse={isCollapse} />

          {!isCollapse && !sm && (
            <div className="NetAPYSection__APYs">
              <div className="NetAPYSection__APYs--titles">
                <p
                  className={classNames(
                    'NetAPYSection__APYs--title NetAPYSection__APYs--titleEarned',
                    { NetAPYSection__APYsTitleDisabled: earnedAPY <= 0 }
                  )}
                >
                  {intl.formatMessage(messages.earnedAPY)}
                </p>
                <p
                  className={classNames(
                    'NetAPYSection__APYs--title NetAPYSection__APYs--titleDebt',
                    { NetAPYSection__APYsTitleDisabled: debtAPY <= 0 }
                  )}
                >
                  {intl.formatMessage(messages.debtAPY)}
                </p>
              </div>

              <div className="NetAPYSection__APYs--values">
                <ValuePercent value={earnedAPY / 100} color="white" />
                <ValuePercent value={debtAPY / 100} color="white" />
              </div>
            </div>
          )}

          {(isCollapse || sm) && <NetWorth value={netWorth} isColumn={!sm} />}
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>
        {`
          .NetAPYSection {
            &__APYs {
              &--titleEarned {
                &:after {
                  background: ${currentTheme.secondary.hex};
                }
              }
              &--titleDebt {
                &:after {
                  background: ${currentTheme.primary.hex};
                }
              }
            }
            &__APYsTitleDisabled {
              &:after {
                background: ${isCurrentThemeDark
                  ? currentTheme.mainBg.hex
                  : currentTheme.headerBg.hex} !important;
              }
            }
          }
        `}
      </style>
    </SectionWrapper>
  );
}
