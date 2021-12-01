import React from 'react';
import { useIntl } from 'react-intl';
import { BasicModal, useThemeContext } from '@aave/aave-ui-kit';

import Caption from '../../basic/Caption';
import DefaultButton from '../../basic/DefaultButton';
import Link from '../../basic/Link';

import messages from './messages';
import staticStyles from './style';

interface IsolatedAssetModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function IsolatedAssetModal({ isVisible, onClose }: IsolatedAssetModalProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <BasicModal
      className="IsolatedAssetModal"
      isVisible={isVisible}
      onBackdropPress={onClose}
      withCloseButton={true}
    >
      <div className="IsolatedAssetModal__content">
        <Caption
          title={intl.formatMessage(messages.caption)}
          description={intl.formatMessage(messages.description)}
          marginBottom={16}
          onWhiteBackground={true}
        />

        <aside>
          <strong>{intl.formatMessage(messages.howItWorks)}</strong>
          <p>{intl.formatMessage(messages.howItWorksDescriptionFirst)}</p>
          <p>{intl.formatMessage(messages.howItWorksDescriptionSecond)}</p>
        </aside>

        <aside>
          <strong>{intl.formatMessage(messages.debtCeiling)}</strong>
          <p>{intl.formatMessage(messages.debtCeilingDescription)}</p>
        </aside>

        <aside>
          <strong>{intl.formatMessage(messages.whoCanUseIt)}</strong>
          <p>{intl.formatMessage(messages.whoCanUseItDescription)}</p>
        </aside>

        <p>
          {intl.formatMessage(messages.learnMore, {
            link: (
              <Link
                to="https://docs.aave.com/faq/" // TODO: maybe need change link
                absolute={true}
                inNewWindow={true}
                title={intl.formatMessage(messages.FAQGuide)}
                color="secondary"
              />
            ),
          })}
        </p>

        <div className="IsolatedAssetModal__button--inner">
          <DefaultButton
            title={intl.formatMessage(messages.buttonTitle)}
            size="medium"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onClose();
            }}
          />
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .IsolatedAssetModal {
          p,
          strong {
            color: ${currentTheme.darkBlue.hex};
          }
        }
      `}</style>
    </BasicModal>
  );
}
