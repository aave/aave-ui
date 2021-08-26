import { defineMessages } from 'react-intl';

export default defineMessages({
  caption: 'Threshold',
  descriptionFirst:
    'The threshold is dynamic and based on the quorum differential of votes for/against.',
  descriptionSecond:
    'If the votes against the AIP only make up a small percentage, the threshold will remain the same. However, if the votes against the AIP are more substantial, then the threshold can be moved up so there must be more votes in favour for the AIP to pass.',
  moreInformation: 'More information',
});
