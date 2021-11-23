import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import Link from '../basic/Link';

import messages from './messages';
import staticStyles from './style';
import { getAssetInfo } from '../../helpers/config/assets-config';

interface FreezedWarningProps {
  symbol: string;
  className?: string;
}

export default function FreezedWarning({ symbol, className }: FreezedWarningProps) {
  const intl = useIntl();
  const asset = getAssetInfo(symbol);

  return (
    <p className={classNames('FreezedWarning', className)}>
      {asset.symbol === 'REP'
        ? intl.formatMessage(messages.migrationText, {
            token: `${asset.name} (${asset.symbol})`,
            here: (
              <Link
                to="https://www.augur.net/blog/final-launch-update/"
                absolute={true}
                inNewWindow={true}
                title={intl.formatMessage(messages.here)}
                color="secondary"
              />
            ),
          })
        : intl.formatMessage(messages.freezedText, {
            token: `${asset.name} (${asset.symbol})`,
          })}
      <style jsx={true}>{staticStyles}</style>
    </p>
  );
}
