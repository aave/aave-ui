import { defineMessages } from 'react-intl';

export default defineMessages({
  caption: 'How would you like to stake',

  infoCaption: 'Staking {asset}',

  aaveDescription:
    'Staking AAVE makes the protocol a bit safer in case of an emergency. For taking this risk you will receive AAVE. The AAVE tokens represent voting power in the protocol governance. In the case of a {upTo} of your staked assets can be slashed to cover the deficit.',

  bptDescription:
    'Staking your Balancer Pool Token (BPT) makes the protocol a bit safer in case of an emergency. For taking this risk you will be rewarded with AAVE, BAL, and trading fees. In the case of a {upTo} of your staked assets can be slashed to cover the deficit. You can get BPT by depositing a combination of AAVE + ETH in the {balancerLiquidityPool}',

  upTo: 'shortfall event, up to 30%',
  balancerLiquidityPool: 'Balancer liquidity pool',

  aaveStakingRewards: 'AAVE Staking rewards',
  tradingFees: 'Trading Fees',
  token: '{asset} Token',
});
