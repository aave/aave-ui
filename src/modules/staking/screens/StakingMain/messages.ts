import { defineMessages } from 'react-intl';

export default defineMessages({
  description: 'You can either stake {aave} or {bpt} to secure the protocol',
  stake: 'Stake {asset}',

  info: 'The {bpt} is a liquidity pool token. You can receive BPT by depositing a combination of AAVE + ETH in the {balancerLiquidityPool}. You can then stake your BPT in the Safety Module to secure the protocol and earn Safety Incentives.',
  bpt: 'Balancer Pool Token (BPT)',
  balancerLiquidityPool: 'Balancer liquidity pool',
});
