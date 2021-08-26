import React from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';

import { useThemeContext } from '@aave/aave-ui-kit';
import Value from '../../../../../components/basic/Value';
import PercentLine from '../../PercentLine';

import messages from './messages';
import staticStyles from './style';

interface ProposalsItemBarProps {
  currentYesVote: number;
  currentNoVote: number;
}

export default function ProposalsItemBar({ currentYesVote, currentNoVote }: ProposalsItemBarProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const currentYesVoteFormatted = currentYesVote || 0;
  const currentNoVoteFormatted = currentNoVote || 0;
  const totalVoteValue = valueToBigNumber(currentYesVoteFormatted).plus(currentNoVoteFormatted);

  return (
    <div className="ProposalsItemBar">
      <div className="ProposalsItemBar__item">
        <div className="ProposalsItemBar__item-leftInner">
          <p className="ProposalsItemBar__item-title">{intl.formatMessage(messages.yes)}</p>
        </div>

        <PercentLine
          totalValue={totalVoteValue.toNumber()}
          currentValue={currentYesVoteFormatted}
          color="green"
        />

        <div className="ProposalsItemBar__item-rightInner">
          <Value
            value={currentYesVoteFormatted}
            maximumValueDecimals={2}
            minimumValueDecimals={2}
          />
        </div>
      </div>

      <div className="ProposalsItemBar__item">
        <div className="ProposalsItemBar__item-leftInner">
          <p className="ProposalsItemBar__item-title">{intl.formatMessage(messages.no)}</p>
        </div>

        <PercentLine
          totalValue={totalVoteValue.toNumber()}
          currentValue={currentNoVoteFormatted}
          color="red"
        />

        <div className="ProposalsItemBar__item-rightInner">
          <Value value={currentNoVoteFormatted} maximumValueDecimals={2} minimumValueDecimals={2} />
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .ProposalsItemBar {
          color: ${currentTheme.textDarkBlue.hex};

          &__item {
            &:last-of-type {
              .ProposalsItemBar__item-percentLine {
                background: ${currentTheme.red.hex};
              }
            }
          }
        }
      `}</style>
    </div>
  );
}
