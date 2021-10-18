const { DOMAIN } = process.env;

if (!DOMAIN) throw new Error('Domain needs to be specified');

module.exports = {
  URL: DOMAIN,
};
