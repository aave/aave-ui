import React from 'react';
import classNames from 'classnames';

import { useThemeContext } from '@aave/aave-ui-kit';
// import CollateralHelpModal from '../../../../../components/HelpModal/CollateralHelpModal';
import BorrowInterestHelpModal from '../../../../../components/HelpModal/BorrowInterestHelpModal';

import staticStyles from './style';
import { CapType } from '../../../../../components/caps/helper';
import AvailableCapsHelpModal from '../../../../../components/caps/AvailableCapsHelpModal';

type SupplyTableHeaderProps = {
  head: string[];
  colWidth: (string | number)[];
  isDeposit?: boolean;
  className?: string;
};

export default function SupplyTableHeader({
  head,
  colWidth,
  isDeposit,
  className,
}: SupplyTableHeaderProps) {
  const { currentTheme, sm } = useThemeContext();

  return (
    <div className={classNames('TableHeader', className)}>
      <div className="TableHeader__inner">
        {head.map((title, i) => (
          <div className="TableHeader__item" style={{ maxWidth: colWidth[i] }} key={title + i}>
            {!sm && i === head.length - 2 ? (
              <>
                {!isDeposit ? (
                  <BorrowInterestHelpModal
                    className="TableHeader__help-text"
                    text={title}
                    iconSize={12}
                  />
                ) : (
                  <AvailableCapsHelpModal
                    className="TableHeader__help-text"
                    iconSize={12}
                    capType={CapType.supplyCap}
                  />
                )}
              </>
            ) : (
              <p className="TableHeader__title">{title}</p>
            )}
          </div>
        ))}
        {!sm && (
          <>
            <div className="TableHeader__item" />
            <div className="TableHeader__item" />
          </>
        )}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .TableHeader {
          color: ${currentTheme.textDarkBlue.hex};
        }
      `}</style>
    </div>
  );
}
