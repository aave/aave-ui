import { defineMessages } from 'react-intl';

export default defineMessages({
  caption: 'Liquidation threshold',
  description:
    'This represents the threshold at which a borrow position will be considered undercollateralized and subject to liquidation for each collateral. For example, if a collateral has a liquidation threshold of 80%, it means that the loan will be liquidated when the debt value is worth 80% of the collateral value.',
});
