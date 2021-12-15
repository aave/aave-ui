import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import InfoPanel from '../../InfoPanel';
import { CapType } from '../helper';

import staticStyles from './style';
import messages from './messages';

interface CapsAmountWarningProps {
  capType: CapType;
}

export default function CapsAmountWarning({ capType }: CapsAmountWarningProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const title = capType === CapType.supplyCap ? messages.supplyCapTitle : messages.borrowCapTitle;
  const description =
    capType === CapType.supplyCap ? messages.supplyCapDescription : messages.borrowCapDescription;

  return (
    <InfoPanel className="CapsAmountWarning">
      <p>
        <span className="CapsAmountWarning__title">{intl.formatMessage(title)}</span>{' '}
        {intl.formatMessage(description)}
      </p>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .CapsAmountWarning {
          &__title {
            color: ${currentTheme.red.hex};
          }
        }
      `}</style>
    </InfoPanel>
  );
}
