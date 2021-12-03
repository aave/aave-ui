import { IntlShape } from 'react-intl/src/types';
import messages from './messages';

export function getEmodeMessage(categoryId: number, intl: IntlShape) {
  if (categoryId === 1) {
    return intl.formatMessage(messages.stablecoins);
  } else if (categoryId === 2) {
    return intl.formatMessage(messages.eth);
  } else if (categoryId === 3) {
    return intl.formatMessage(messages.btc);
  } else {
    return intl.formatMessage(messages.stablecoins);
  }
}
