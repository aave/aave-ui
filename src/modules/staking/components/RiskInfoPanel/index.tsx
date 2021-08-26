import React from 'react';
import { useIntl } from 'react-intl';

import InfoWrapper from '../../../../components/wrappers/InfoWrapper';
import InfoPanel from '../../../../components/InfoPanel';
import Link from '../../../../components/basic/Link';

import messages from './messages';
import staticStyles from './style';

import linkIcon from '../../../../images/linkIcon.svg';

import { faqLink } from '../../index';

export default function RiskInfoPanel() {
  const intl = useIntl();

  return (
    <InfoWrapper>
      <InfoPanel>
        <div className="RiskInfoPanel">
          <p>
            {intl.formatMessage(messages.title, {
              here: (
                <Link
                  to={faqLink}
                  title={intl.formatMessage(messages.here)}
                  color="secondary"
                  absolute={true}
                  inNewWindow={true}
                />
              ),
            })}
          </p>
          <Link to={faqLink} inNewWindow={true} absolute={true} className="RiskInfoPanel__link">
            <img src={linkIcon} alt="" />
          </Link>

          <style jsx={true} global={true}>
            {staticStyles}
          </style>
        </div>
      </InfoPanel>
    </InfoWrapper>
  );
}
