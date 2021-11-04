const core = require('@actions/core');
const updateCloudFlareRecord = require('./helpers/cloudflare');
const cleanupAndPin = require('./helpers/pinata');
const pinToCrust = require('./helpers/crust');

async function pinAndPublish() {
  // 1. Upload to Pinata
  const hash = await cleanupAndPin();
  console.log(`Pinning was done successfully: https://cloudflare-ipfs.com/ipfs/${hash}`);
  core.setOutput('uri', `https://cloudflare-ipfs.com/ipfs/${hash}`);

  // 2. Pin to Crust
  await pinToCrust(hash);

  // 3. Update DNS
  const domain = process.env.CF_DEPLOYMENT_DOMAIN;
  if (domain) {
    await updateCloudFlareRecord(hash, domain);
  } else {
    console.log('no cloudflare domain specified, skipping DNS update');
  }
  process.exit(0);
}

pinAndPublish();
