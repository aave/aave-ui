require('dotenv').config();

const { DOMAIN } = process.env;

if (!DOMAIN) throw new Error('domain not set');

module.exports = {
  URL: DOMAIN,
};
