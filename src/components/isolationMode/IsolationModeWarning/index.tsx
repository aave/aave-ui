import React from 'react';
import { useIntl } from 'react-intl';

import InfoPanel from '../../InfoPanel';
import Link from '../../basic/Link';

import messages from './messages';

export default function IsolationModeWarning() {
  const intl = useIntl();

  return (
    <InfoPanel>
      <div className="IsolationModeWarning">
        <strong>{intl.formatMessage(messages.caption)}</strong>
        <p>
          {intl.formatMessage(messages.description, {
            link: (
              <Link
                to="https://docs.aave.com/faq/" // TODO: maybe need change link
                title={intl.formatMessage(messages.faqGuide)}
                color="secondary"
                absolute={true}
                inNewWindow={true}
              />
            ),
          })}
        </p>
      </div>
      <style jsx={true} global={true}>{`
        .IsolationModeWarning {
          strong {
            margin-bottom: 4px;
          }
          p {
            a {
              font-weight: 500;
            }
          }
        }
      `}</style>
    </InfoPanel>
  );
}
