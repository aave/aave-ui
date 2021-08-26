import React from 'react';
import { useIntl } from 'react-intl';
import { textCenterEllipsis, useThemeContext } from '@aave/aave-ui-kit';

import Link from '../../../../../components/basic/Link';

import staticStyles from './style';

export default function VoteInfoTableItem({
  address,
  votingPower,
  explorerLinkBuilder,
}: {
  address: string;
  votingPower: number;
  explorerLinkBuilder: (params: { address: string }) => string;
}) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const createAccountLink = (address: string, child: any) => {
    return (
      <Link
        to={explorerLinkBuilder({ address })}
        inNewWindow={true}
        absolute={true}
        color="dark"
        onWhiteBackground={true}
      >
        {child}
      </Link>
    );
  };

  return (
    <div className="VoteInfoTableItem">
      <p>{createAccountLink(address, textCenterEllipsis(address, 5, 5))}</p>
      <b>{createAccountLink(address, intl.formatNumber(votingPower))}</b>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .VoteInfoTableItem {
          &:after {
            background: ${currentTheme.darkBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
