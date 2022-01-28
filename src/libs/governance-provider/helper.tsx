import { BigNumber, normalize, ProposalState } from '@aave/protocol-js';
import dayjs from 'dayjs';

import { ProposalItem } from './types';

export const IPFS_ENDPOINT = 'https://aave-governance.mypinata.cloud/ipfs';

/**
 * Thegraph data is only up to date to the last emitted events.
 * When a proposal ends there can't be a event emitted so the "correct state" has to be derived from last information.
 * @param proposal
 * @returns
 */
export const getCorrectState = (proposal: ProposalItem) => {
  const hasEnded = dayjs().unix() > proposal?.proposalExpirationTimestamp;
  const hasExpired = dayjs().unix() > Number(proposal?.executionTime);
  // there's no event for Active -> Success/Failed, so it's wrong on thegraph

  if (hasEnded && proposal.state === ProposalState.Active) {
    // minimum required participation
    // the voting power (in % of total voting power) of for-votes needs to reach the quorum
    const minQuorumNeeded = new BigNumber(proposal.totalVotingSupply || '')
      .multipliedBy(proposal.minimumQuorum)
      .div(10000);
    const quorumValid = Number(proposal.formattedForVotes) >= minQuorumNeeded.toNumber();

    // minimum required outvote
    // the difference between for-votes and against-votes (in % of total voting power) needs to exceed the vote differential threshold
    let differentialValid = false;
    // a proposal can only be valid when yay > nay
    if (new BigNumber(proposal.forVotes).gt(proposal.againstVotes)) {
      // & (yay - nay) / total > minDiff
      differentialValid = new BigNumber(proposal.formattedForVotes)
        .minus(proposal.formattedAgainstVotes)
        .dividedBy(proposal.totalVotingSupply)
        .gt(proposal.formattedMinDiff);
    }
    return quorumValid && differentialValid ? ProposalState.Succeeded : ProposalState.Failed;
  }

  if (hasExpired && proposal.state === ProposalState.Queued) {
    return ProposalState.Expired;
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
