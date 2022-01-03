import React from 'react';
import { useIntl } from 'react-intl';
import { Routes, Route } from 'react-router-dom';

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
        <Routes>
          <Route path="/rewards" key="Reward main" element={<RewardMain />} />
          <Route
            path="/rewards/confirm/:incentivesControllerAddress"
            key="Reward confirm"
            element={<RewardConfirm />}
          />
        </Routes>
      </ContentWrapper>
    </ScreenWrapper>
  );
}
