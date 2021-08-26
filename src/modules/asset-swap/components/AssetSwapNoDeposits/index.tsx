import React from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { rgba, useThemeContext } from '@aave/aave-ui-kit';

import Caption from '../../../../components/basic/Caption';
import Link from '../../../../components/basic/Link';
import DefaultButton from '../../../../components/basic/DefaultButton';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';
import staticStyles from './style';

interface AssetSwapNoDepositsProps {
  numberOfDepositedAssets: number;
}

export default function AssetSwapNoDeposits({ numberOfDepositedAssets }: AssetSwapNoDepositsProps) {
  const intl = useIntl();
  const history = useHistory();
  const { currentTheme } = useThemeContext();

  const background = rgba(`${currentTheme.textDarkBlue.rgb}, 0.03`);

  return (
    <div className="AssetSwapNoDeposits">
      <Caption
        title={intl.formatMessage(defaultMessages.swap)}
        description={intl.formatMessage(messages.description, {
          assetsDeposited: <strong>1 {intl.formatMessage(messages.assetsDeposited)}</strong>,
          deposited: <strong>{intl.formatMessage(messages.deposited)}</strong>,
        })}
      />

      <p className="AssetSwapNoDeposits__faqText">
        {intl.formatMessage(messages.moreInfo, {
          faq: (
            <Link
              to="https://docs.aave.com/faq/" // TODO: need change link
              title="FAQ."
              color="secondary"
              bold={true}
              inNewWindow={true}
              absolute={true}
            />
          ),
        })}
      </p>

      <div className="AssetSwapNoDeposits__text-block">
        <span>
          {intl.formatMessage(messages.depositFirst, {
            number: <strong>{1 - numberOfDepositedAssets}</strong>,
          })}
        </span>
      </div>

      <DefaultButton
        title={intl.formatMessage(messages.depositNow)}
        mobileBig={true}
        onClick={() => history.push('/deposit')}
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .AssetSwapNoDeposits {
          color: ${currentTheme.textDarkBlue.hex};

          .Caption__description {
            strong {
              color: ${currentTheme.primary.hex};
            }
          }

          &__text-block {
            background: ${background};
            strong {
              color: ${currentTheme.primary.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
