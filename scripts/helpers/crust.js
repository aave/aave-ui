const CrustPinner = require('@crustio/crust-pin').default;

const CRUST_SEEDS = process.env.CRUST_SEEDS;

if (!CRUST_SEEDS) {
  console.log('CRUST_SEEDS should be specified');
  process.exit(1);
}

const pinToCrust = async (cid) => {
  const crust = new CrustPinner(CRUST_SEEDS);
  await crust.pin(cid);
};

module.exports = pinToCrust;
