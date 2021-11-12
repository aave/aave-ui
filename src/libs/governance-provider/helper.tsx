import { BigNumber, normalize, ProposalState } from '@aave/protocol-js';
import dayjs from 'dayjs';

import { ProposalItem } from './types';

const IPFS_ENDPOINT = 'https://cloudflare-ipfs.com/ipfs';

export const getCorrectState = (proposal: ProposalItem) => {
  const hasEnded = dayjs().unix() > proposal?.proposalExpirationTimestamp;
  // there's no event for Active -> Success/Failed, so it's wrong on thegraph

  if (hasEnded && proposal.state === ProposalState.Active) {
    const minQuorumNeeded = new BigNumber(proposal.totalVotingSupply || '')
      .multipliedBy(proposal.minimumQuorum)
      .div(10000);

    const quorumValid = Number(proposal.formattedForVotes) >= minQuorumNeeded.toNumber();
    const forVotesCalc = new BigNumber(proposal.forVotes)
      .multipliedBy(10000)
      .div(proposal.totalVotingSupply || '');

    const againstVotesCalc = new BigNumber(proposal.againstVotes)
      .multipliedBy(10000)
      .div(proposal.totalVotingSupply || '')
      .plus(proposal.minimumDiff);

    const differentialValid = forVotesCalc.gt(againstVotesCalc);

    return quorumValid && differentialValid ? ProposalState.Succeeded : ProposalState.Failed;
  }

  // When there has never been a single vote, no event has been triggered which could have transitioned the state.
  if (proposal.state === ProposalState.Pending) {
    if (hasEnded) return ProposalState.Failed;
    const hasStarted = dayjs().unix() > proposal?.proposalActiveTimestamp;
    if (hasStarted) return ProposalState.Active;
  }

  return proposal.state;
};

export const toHumanReadable = (number: number, decimals = 18) => {
  return Number(normalize(number, decimals));
};

export const getProposalExpiry = (
  averageNetworkBlockTime: number,
  startBlock: number,
  endBlock: number,
  timestamp: number
): number => {
  return dayjs
    .unix(timestamp)
    .add((endBlock - startBlock) * averageNetworkBlockTime, 'second')
    .unix();
};

export function getLink(hash: string): string {
  return `${IPFS_ENDPOINT}/${hash}`;
}
