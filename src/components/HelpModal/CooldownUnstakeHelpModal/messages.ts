import { defineMessages } from 'react-intl';

export default defineMessages({
  caption: 'Cooldown & Unstake Window Period',
  descriptionFirst:
    'You can only withdraw your assets from the Security Module after the cooldown period ends and the unstake window is active.',
  descriptionSecond:
    'The cooldown period can be activated by pressing the ‘Activate Cooldown’ button. Once the time expires, you’re free to withdraw within the time frame of the unstake window.',
  descriptionThird:
    'If you fail to withdraw your assets during the unstake window, you need to activate the cooldown period again and wait for the next unstake window.',
});
