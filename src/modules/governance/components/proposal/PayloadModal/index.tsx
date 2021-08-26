import React, { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext, BasicModal } from '@aave/aave-ui-kit';

import Caption from '../../../../../components/basic/Caption';
import DefaultButton from '../../../../../components/basic/DefaultButton';

import messages from './messages';
import staticStyles from './style';

interface PayloadModalProps {
  isVisible: boolean;
  setVisible: (value: boolean) => void;
  children: ReactNode;
}

export default function PayloadModal({ isVisible, setVisible, children }: PayloadModalProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <BasicModal
      className="PayloadModal"
      isVisible={isVisible}
      onBackdropPress={() => setVisible(false)}
      withCloseButton={true}
    >
      <div className="PayloadModal__content">
        <Caption
          title={intl.formatMessage(messages.caption)}
          description={intl.formatMessage(messages.description)}
        />

        <div className="PayloadModal__payload">{children}</div>

        <DefaultButton
          title={intl.formatMessage(messages.buttonTitle)}
          onClick={() => setVisible(false)}
        />
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .PayloadModal {
          &__payload {
            background: ${currentTheme.mainBg.hex};
          }
        }
      `}</style>
    </BasicModal>
  );
}
