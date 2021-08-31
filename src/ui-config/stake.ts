import { Network } from '@aave/protocol-js';

export interface StakeConfig {
  network: Network;
  stakeDataProvider: string;
  tokens: {
    [token: string]: {
      TOKEN_STAKING: string;
      STAKING_REWARD_TOKEN: string;
      STAKING_HELPER?: string;
    };
  };
}

export const stakeConfig: StakeConfig | undefined = undefined;

// kovan config
// export const stakeConfig: StakeConfig | undefined = {
//   network: Network.kovan,
//   stakeDataProvider: '0x5671387d56eAB334A2D65d6D0BB4D907898C7abA',
//   tokens: {
//     [Stake.aave]: {
//       TOKEN_STAKING: '0xf2fbf9A6710AfDa1c4AaB2E922DE9D69E0C97fd2',
//       STAKING_REWARD_TOKEN: '0xb597cd8d3217ea6477232f9217fa70837ff667af',
//       STAKING_HELPER: '0xf267aCc8BF1D8b41c89b6dc1a0aD8439dfbc890c',
//     },
//     [Stake.bpt]: {
//       TOKEN_STAKING: '0x31ce45Ab6E26C72c47C52c27498D460099545ef2',
//       STAKING_REWARD_TOKEN: '0xb597cd8d3217ea6477232f9217fa70837ff667af',
//     },
//   },
// };
