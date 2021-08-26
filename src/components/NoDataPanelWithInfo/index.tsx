import React, { ReactNode } from 'react';
import { useThemeContext } from '@aave/aave-ui-kit';

import ContentWrapper from '../wrappers/ContentWrapper';
import NoDataPanel, { NoDataPanelProps } from '../NoDataPanel';
import InfoWrapper from '../wrappers/InfoWrapper';
import InfoPanel from '../InfoPanel';

import staticStyles from './style';

interface NoDataPanelWithInfoProps
  extends Pick<
    NoDataPanelProps,
    'title' | 'description' | 'buttonTitle' | 'linkTo' | 'withConnectButton'
  > {
  withBackButton?: boolean;
  infoTextDescription?: string | ReactNode;
}

export default function NoDataPanelWithInfo({
  title,
  description,
  buttonTitle,
  linkTo,
  withConnectButton,
  infoTextDescription,
  withBackButton,
}: NoDataPanelWithInfoProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div className="NoDataPanelWithInfo">
      <ContentWrapper className="NoDataPanelWithInfo__wrapper" withBackButton={withBackButton}>
        <NoDataPanel
          className="NoDataPanelWithInfo__texts"
          title={title}
          description={description}
          buttonTitle={buttonTitle}
          linkTo={linkTo}
          withConnectButton={withConnectButton}
          withAnimationCircle={true}
        />

        <InfoWrapper>
          {!!infoTextDescription && (
            <InfoPanel>
              <p className="NoDataPanelWithInfo__selectMarket-text">{infoTextDescription}</p>
            </InfoPanel>
          )}
        </InfoWrapper>
      </ContentWrapper>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .NoDataPanelWithInfo {
          &__selectMarket-button {
            color: ${currentTheme.darkBlue.hex};
            span {
              color: ${currentTheme.primary.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
