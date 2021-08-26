import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { valueToBigNumber } from '@aave/protocol-js';
import { useThemeContext } from '@aave/aave-ui-kit';

import ContentWrapperWithTopLine from '../../../../../components/wrappers/ContentWrapperWithTopLine';
import Value from '../../../../../components/basic/Value';
import PercentLine from '../../PercentLine';

import messages from './messages';
import staticStyles from './style';

interface ProposalVoteBarProps {
  currentNoVote?: number;
  currentYesVote?: number;
  isLeaderboard?: boolean;
}

export default function ProposalVoteBar({
  currentNoVote,
  currentYesVote,
  isLeaderboard,
}: ProposalVoteBarProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const currentYesVoteFormatted = currentYesVote || 0;
  const currentNoVoteFormatted = currentNoVote || 0;
  const totalVoteValue = valueToBigNumber(currentYesVoteFormatted).plus(currentNoVoteFormatted);

  return (
    <div className={classNames('ProposalVoteBar', { ProposalVoteBar__leaderboard: isLeaderboard })}>
      <div className="ProposalVoteBar__items">
        <ContentWrapperWithTopLine
          title={intl.formatMessage(messages.yae)}
          topRightInfo={
            <Value value={currentYesVoteFormatted} color="white" maximumValueDecimals={3} />
          }
          className="ProposalVoteBar__item"
        >
          <PercentLine
            totalValue={totalVoteValue.toNumber()}
            currentValue={currentYesVoteFormatted}
            color="green"
          />
        </ContentWrapperWithTopLine>

        <ContentWrapperWithTopLine
          title={intl.formatMessage(messages.nay)}
          topRightInfo={
            <Value value={currentNoVoteFormatted} color="white" maximumValueDecimals={3} />
          }
          className="ProposalVoteBar__item"
        >
          <PercentLine
            totalValue={totalVoteValue.toNumber()}
            currentValue={currentNoVoteFormatted}
            color="red"
          />
        </ContentWrapperWithTopLine>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .ProposalVoteBar {
          &__item {
            .ContentWrapperWithTopLine__content {
              background: ${currentTheme.white.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
