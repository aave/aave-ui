import React from 'react';
import classNames from 'classnames';

import { rgba, useThemeContext } from '@aave/aave-ui-kit';
import StateChanges from '../../StateChanges';
import { HistoryItemTypes } from '../../../types';

import staticStyles from './style';

export interface StateChangesContentProps extends Pick<HistoryItemTypes, 'condition' | 'type'> {}

export default function StateChangesContent({ condition, type }: StateChangesContentProps) {
  const { currentTheme } = useThemeContext();

  const backgroundColor = rgba(`${currentTheme.darkBlue.rgb}, 0.05`);

  return (
    <div className={classNames('StateChangesContent', { APYStateChangesContent: type === 'Swap' })}>
      <StateChanges
        className="StateChangesContent__state"
        condition={condition}
        type={type}
        insideModal={type === 'Swap'}
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .StateChangesContent {
          &:after {
            background: ${backgroundColor};
          }
        }
      `}</style>
    </div>
  );
}
