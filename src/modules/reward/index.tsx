import React from 'react';
import { useIntl } from 'react-intl';
import { Switch, Route } from 'react-router-dom';

import ScreenWrapper from '../../components/wrappers/ScreenWrapper';
import ContentWrapper from '../../components/wrappers/ContentWrapper';
import RewardMain from './screens/RewardMain';
import RewardConfirm from './screens/RewardConfirm';

import messages from './messages';

export default function Reward() {
  const intl = useIntl();

  return (
    <ScreenWrapper
      pageTitle={intl.formatMessage(messages.pageTitle)}
      isTitleOnDesktop={true}
      withMobileGrayBg={true}
    >
      <ContentWrapper withBackButton={true} withFullHeight={true}>
        <Switch>
          <Route exact={true} path="/rewards" component={RewardMain} key="Reward main" />
          <Route
            path="/rewards/confirm/:incentivesControllerAddress"
            component={RewardConfirm}
            key="Reward confirm"
          />
        </Switch>
      </ContentWrapper>
    </ScreenWrapper>
  );
}
