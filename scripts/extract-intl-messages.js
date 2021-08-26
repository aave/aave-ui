const extractReactIntlMessages = require('extract-react-intl-messages');

const locales = ['default', 'en', 'es', 'fr', 'it', 'cn', 'ja', 'tr', 'vi', 'ko', 'pt'];
const pattern = 'src/**/*.ts';
const buildDir = 'src/translations';
const defaultLocale = 'default';

extractReactIntlMessages(locales, pattern, buildDir, { defaultLocale }).then(() => {
  console.log('finish');
});
