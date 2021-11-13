import { BigNumber, normalize, ProposalState } from '@aave/protocol-js';
import axios from 'axios';
import dayjs from 'dayjs';

import { ProposalItem, ProposalMetadata } from './types';

const IPFS_ENDPOINT = 'https://cloudflare-ipfs.com/ipfs';

/**
 * Thegraph data is only up to date to the last emitted events.
 * When a proposal ends there can't be a event emitted so the "correct state" has to be derived from last information.
 * @param proposal
 * @returns
 */
export const getCorrectState = (proposal: ProposalItem) => {
  const hasEnded = dayjs().unix() > proposal?.proposalExpirationTimestamp;
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

export async function getProposalMetadata(ipfsHash: string): Promise<ProposalMetadata> {
  try {
    const { data } = await axios.get<Omit<ProposalMetadata, 'ipfsHash'>>(getLink(ipfsHash), {
      timeout: 5000,
    });

    if (!data?.title) {
      throw Error('Missing title field at proposal metadata.');
    }
    if (!data?.description) {
      throw Error('Missing description field at proposal metadata.');
    }
    if (!data?.shortDescription) {
      throw Error('Missing shortDescription field at proposal metadata.');
    }

    return {
      ipfsHash,
      ...data,
    };
  } catch (e) {
    console.error(`IPFS fetch Error: ${e.message}`);
    return {
      ipfsHash,
      title: `Proposal - ${ipfsHash}`,
      description: `Proposal with invalid metadata format or IPFS gateway is down`,
      shortDescription: `Proposal with invalid metadata format or IPFS gateway is down`,
      author: `Proposal with invalid metadata format or IPFS gateway is down`,
      discussions: `Proposal with invalid metadata format or IPFS gateway is down`,
      aip: 0,
    };
  }
}
