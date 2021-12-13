import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import TextWithModal from '../../../../components/TextWithModal';
import Caption from '../../../../components/basic/Caption';
import Link from '../../../../components/basic/Link';
import Value from '../../../../components/basic/Value';

import messages from './messages';
import staticStyles from './style';

interface DebtCeilingInfoProps {
  debtCeilingUSD: string;
  debtCeilingDebt: string;
}

export default function DebtCeilingInfo({ debtCeilingDebt, debtCeilingUSD }: DebtCeilingInfoProps) {
  const intl = useIntl();
  const { currentTheme, xl, sm } = useThemeContext();

  return (
    <div className="DebtCeilingInfo">
      <TextWithModal
        className="DebtCeilingInfo__title"
        text={intl.formatMessage(messages.debtCeiling)}
        iconSize={xl && !sm ? 10 : sm ? 12 : 12}
        withCloseButton={true}
      >
        <div className="DebtCeilingInfo__modal--content">
          <Caption
            title={intl.formatMessage(messages.modalCaption)}
            description={intl.formatMessage(messages.modalDescription)}
            onWhiteBackground={true}
            marginBottom={16}
          />
          <p className="DebtCeilingInfo__modal--text">
            {intl.formatMessage(messages.learnMore, {
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
      </TextWithModal>

      <p className="DebtCeilingInfo__values">
        <Value
          value={debtCeilingDebt}
          symbol="USD"
          tokenIcon={true}
          withoutSymbol={true}
          maximumValueDecimals={2}
          compact={true}
        />{' '}
        <span className="DebtCeilingInfo__values--divider">/</span>{' '}
        <Value
          value={debtCeilingUSD}
          symbol="USD"
          tokenIcon={true}
          withoutSymbol={true}
          compact={true}
          maximumValueDecimals={2}
        />
      </p>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .DebtCeilingInfo {
          &__modal--text {
            color: ${currentTheme.darkBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
