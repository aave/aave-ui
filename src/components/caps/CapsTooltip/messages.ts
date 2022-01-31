import { defineMessages } from 'react-intl';

export default defineMessages({
  supplyCapNearlyReached:
    'This asset has almost reached its supply cap. There can only be {availableValue} supplied to this market.',
  borrowCapNearlyReached:
    'This asset has almost reached its borrow cap. There is only {availableValue} available to be borrowed from this market.',
  supplyCapReached:
    'This asset has reached its supply cap. Nothing is available to be supplied from this market.',
  borrowCapReached:
    'This asset has reached its borrow cap. Nothing is available to be borrowed from this market.',
});
