const updateCloudFlareRecord = require('./helpers/cloudflare');
const cleanupAndPin = require('./helpers/pinata');

async function pinAndPublish() {
  const hash = await cleanupAndPin();
  console.log('Pinning was done successfully', hash);
  await updateCloudFlareRecord(hash, process.env.CF_DEPLOYMENT_DOMAIN);
  process.exit(0);
}

pinAndPublish();
