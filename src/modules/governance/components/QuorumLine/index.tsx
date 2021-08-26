import React from 'react';
import { useIntl } from 'react-intl';
import { ProposalState } from '@aave/protocol-js';
import { useThemeContext } from '@aave/aave-ui-kit';

import PercentLine from '../PercentLine';

import messages from './messages';
import staticStyles from './style';

import successIcon from './images/success.svg';
import failedIcon from './images/failed.svg';

interface QuorumLineProps {
  totalPower: number;
  forVotes?: number;
  againstVotes?: number;
  minimumQuorum: number;
  minimalDiff: number;
  state: ProposalState;
  withoutTitle?: boolean;
}

export default function QuorumLine({
  totalPower,
  forVotes = 0,
  againstVotes = 0,
  minimumQuorum,
  minimalDiff,
  state,
  withoutTitle,
}: QuorumLineProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const quorumLine = () => {
    const currentForShare = forVotes / totalPower;
    if (
      currentForShare > minimumQuorum &&
      (forVotes - againstVotes) / totalPower > minimalDiff / 10000
    ) {
      return <img src={successIcon} alt="" />;
    }

    if ([ProposalState.Failed, ProposalState.Expired, ProposalState.Canceled].includes(state)) {
      return <img src={failedIcon} alt="" />;
    }

    return (
      <PercentLine totalValue={minimumQuorum} currentValue={currentForShare} color="primary" />
    );
  };

  return (
    <div className="QuorumLine">
      {!withoutTitle && <p>{intl.formatMessage(messages.quorum)}</p>}

      {quorumLine()}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>
        {`
          .QuorumLine {
            color: ${currentTheme.textDarkBlue.hex};
          }
        `}
      </style>
    </div>
  );
}
