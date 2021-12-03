import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import { getEmodeMessage } from '../../../helpers/e-mode/getEmodeMessage';

import staticStyles from './style';

import eModeIcon from '../../../images/eModeIcon.svg';

interface EmodeCategoryLabelProps {
  categoryId: number;
}

export default function EmodeCategoryLabel({ categoryId }: EmodeCategoryLabelProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <div className="EmodeCategoryLabel">
      <img src={eModeIcon} alt="" />
      <strong>{getEmodeMessage(categoryId, intl)}</strong>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .EmodeCategoryLabel {
          color: ${currentTheme.textDarkBlue.hex};
        }
      `}</style>
    </div>
  );
}
