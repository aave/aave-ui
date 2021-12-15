import { defineMessages } from 'react-intl';

export default defineMessages({
  supplyCapNearlyReached:
    'This asset has almost reached its deposit cap. There can only be {availableValue} deposited to this market.',
  borrowCapNearlyReached:
    'This asset has almost reached its borrow cap. There is only {availableValue} available to be borrowed from this market.',
  supplyCapReached:
    'This asset has reached its deposit cap. Nothing is available to be deposited from this market.',
  borrowCapReached:
    'This asset has reached its borrow cap. Nothing is available to be borrowed from this market.',
});
