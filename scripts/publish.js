const updateCloudFlareRecord = require('./helpers/cloudflare');
const cleanupAndPin = require('./helpers/pinata');

async function pinAndPublish() {
  const hash = await cleanupAndPin();
  console.log('Pinning was done successfully', hash);

  const domain = process.env.CF_DEPLOYMENT_DOMAIN;
  if (domain) {
    await updateCloudFlareRecord(hash, domain);
  } else {
    console.log('no cloudflare domain specified, skipping DNS update');
  }
  process.exit(0);
}

pinAndPublish();
