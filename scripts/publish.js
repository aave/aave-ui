const core = require('@actions/core');
const updateCloudFlareRecord = require('./helpers/cloudflare');
const cleanupAndPin = require('./helpers/pinata');

async function pinAndPublish() {
  const hash = await cleanupAndPin();
  console.log(`Pinning was done successfully: https://cloudflare-ipfs.com/ipfs/${hash}`);
  core.setOutput('uri', `https://cloudflare-ipfs.com/ipfs/${hash}`);

  const domain = process.env.CF_DEPLOYMENT_DOMAIN;
  if (domain) {
    await updateCloudFlareRecord(hash, domain);
  } else {
    console.log('no cloudflare domain specified, skipping DNS update');
  }
  process.exit(0);
}

pinAndPublish();
