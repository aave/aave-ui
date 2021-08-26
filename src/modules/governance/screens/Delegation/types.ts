import messages from './messages';

import aaveIcon from '../../../../images/aave.svg';
import stkAAVEIcon from '../../../../images/stkAAVE.svg';

export interface Asset {
  symbol: string;
  icon: string;
  value: number;
  address: string;
}

export const DELEGATED_ASSETS = [
  {
    symbol: 'AAVE',
    icon: aaveIcon,
  },
  {
    symbol: 'stkAAVE',
    icon: stkAAVEIcon,
  },
];

export enum DELEGATION_PARAM_TYPES {
  VOTING = '0',
  PROPOSITION_POWER = '1',
}

export const delegationTypes = [
  {
    value: DELEGATION_PARAM_TYPES.VOTING,
    label: messages.delegationVotes,
  },
  {
    value: DELEGATION_PARAM_TYPES.PROPOSITION_POWER,
    label: messages.delegationProposalPower,
  },
];
