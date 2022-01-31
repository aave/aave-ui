import React, { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import messages from './messages';
import staticStyles from './style';

type TableHeaderProps = {
  head: (string | ReactNode)[];
};

export default function TableHeader({ head }: TableHeaderProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <div className="TableHeader">
      <div className="TableHeader__item">
        <div className="TableHeader__title">{intl.formatMessage(messages.assets)}</div>
      </div>
      {head.map((title, i) => (
        <div className="TableHeader__item" key={i}>
          <div className="TableHeader__title">{title}</div>
        </div>
      ))}
      <div className="TableHeader__item" />
      <div className="TableHeader__item" />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .TableHeader {
          &__title,
          .TextWithModal__text {
            color: ${currentTheme.lightBlue.hex} !important;
          }
        }
      `}</style>
    </div>
  );
}
