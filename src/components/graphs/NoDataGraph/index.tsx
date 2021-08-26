import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import { useThemeContext } from '@aave/aave-ui-kit';

import messages from './messages';
import staticStyles from './style';

interface NoDataGraphProps {
  className?: string;
  title?: string;
  withoutTitle?: boolean;
}

export default function NoDataGraph({ className, title, withoutTitle }: NoDataGraphProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <div className={classNames('NoDataGraph', className)}>
      {!withoutTitle && <p>{!!title ? title : intl.formatMessage(messages.description)}</p>}

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .NoDataGraph {
          color: ${currentTheme.white.hex};
        }
      `}</style>
    </div>
  );
}
