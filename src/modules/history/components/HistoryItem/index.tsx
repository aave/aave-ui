import React, { ReactNode } from 'react';
import dayjs from 'dayjs';

import { useThemeContext } from '@aave/aave-ui-kit';
import TableItemWrapper from '../../../../components/BasicTable/TableItemWrapper';
import { HistoryItemTypes } from '../../types';

import staticStyles from './style';

import depositIcon from './images/depositIcon.svg';
import depositIconDark from './images/depositIconDark.svg';
import borrowIcon from './images/borrowIcon.svg';
import borrowIconDark from './images/borrowIconDark.svg';
import withdrawIcon from './images/withdrawIcon.svg';
import withdrawIconDark from './images/withdrawIconDark.svg';
import repayIcon from './images/repayIcon.svg';
import repayIconDark from './images/repayIconDark.svg';
import APYTypeChangeIcon from './images/aprTypeChangeIcon.svg';
import APYTypeChangeIconDark from './images/aprTypeChangeIconDark.svg';
import collateralIcon from './images/collateralIcon.svg';
import collateralIconDark from './images/collateralIconDark.svg';
import liquidationIcon from './images/liquidationIcon.svg';
import liquidationIconDark from './images/liquidationIconDark.svg';

export interface HistoryItemProps extends Pick<HistoryItemTypes, 'type' | 'date'> {
  title?: string;
  onClick: () => void;
  children: ReactNode;
}

export default function HistoryItem({ title, type, date, onClick, children }: HistoryItemProps) {
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  let icon: string | undefined = undefined;
  let darkIcon: string | undefined = undefined;

  switch (type) {
    case 'Deposit':
      icon = depositIcon;
      darkIcon = depositIconDark;
      break;
    case 'Borrow':
      icon = borrowIcon;
      darkIcon = borrowIconDark;
      break;
    case 'RedeemUnderlying':
      icon = withdrawIcon;
      darkIcon = withdrawIconDark;
      break;
    case 'Repay':
      icon = repayIcon;
      darkIcon = repayIconDark;
      break;
    case 'Swap':
      icon = APYTypeChangeIcon;
      darkIcon = APYTypeChangeIconDark;
      break;
    case 'UsageAsCollateral':
      icon = collateralIcon;
      darkIcon = collateralIconDark;
      break;
    case 'LiquidationCall':
      icon = liquidationIcon;
      darkIcon = liquidationIconDark;
      break;
  }

  return (
    <TableItemWrapper className="HistoryItem" onClick={onClick}>
      <div className="HistoryItem__right-inner">
        <div className="HistoryItem__image">
          <img src={isCurrentThemeDark ? darkIcon && darkIcon : icon && icon} alt={title} />
        </div>
        <div className="HistoryItem__info-inner">
          <p>{title}</p>
          <span>{dayjs.unix(date).format('L')}</span>
        </div>
      </div>

      <div className="HistoryItem__left-inner">{children}</div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .HistoryItem {
          &__info-inner {
            p {
              color: ${currentTheme.textDarkBlue.hex};
            }
            span {
              color: ${currentTheme.textDarkBlue.hex};
            }
          }
        }
      `}</style>
    </TableItemWrapper>
  );
}
