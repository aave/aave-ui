const core = require('@actions/core');
const pinataSDK = require('@pinata/sdk');

const PIN_ALIAS = core.getInput('PIN_ALIAS');
const BUILD_LOCATION = core.getInput('BUILD_LOCATION');
const PINATA_API_KEY = core.getInput('PINATA_API_KEY');
const PINATA_SECRET_KEY = core.getInput('PINATA_SECRET_KEY');
const CID_VERSION = core.getInput('CID_VERSION');

if (!PINATA_SECRET_KEY) core.setFailed(`PINATA_SECRET_KEY is required, but missing`);
if (!PINATA_API_KEY) core.setFailed(`PINATA_API_KEY is required, but missing`);
if (!PIN_ALIAS) core.setFailed(`PIN_ALIAS is required, but missing`);
if (!BUILD_LOCATION) core.setFailed(`BUILD_LOCATION is required, but missing`);
if (!CID_VERSION) core.setFailed(`CID_VERSION is required, but missing`);
if (!['0', '1'].includes(CID_VERSION)) core.setFailed(`CID_VERSION must be 0 or 1`);

const cleanupAndPin = async () => {
  const pinata = pinataSDK(PINATA_API_KEY, PINATA_SECRET_KEY);
  try {
    await pinata.testAuthentication();
    console.log('Auth successful');

    console.log(`Cleaning up the previous pins for ${PIN_ALIAS}`);
    try {
      const previousPins = await pinata.pinList({
        metadata: { name: PIN_ALIAS },
        status: 'pinned',
      });
      if (previousPins.count) {
        for (let pin of previousPins.rows) {
          try {
            await pinata.unpin(pin.ipfs_pin_hash);
            console.log(`${pin.ipfs_pin_hash} - deleted`);
          } catch (e) {
            console.log(`Failed to unpin ${pin.ipfs_pin_hash}`);
            core.setFailed(e);
          }
        }
      }
    } catch (e) {
      console.log('Failed to get a list of existing pins');
      core.setFailed(e);
    }

    console.log('Uploading the latest build');
    try {
      const result = await pinata.pinFromFS(BUILD_LOCATION, {
        pinataMetadata: {
          name: PIN_ALIAS,
        },
        pinataOptions: {
          customPinPolicy: {
            regions: [
              {
                id: 'FRA1',
                desiredReplicationCount: 1,
              },
              {
                id: 'NYC1',
                desiredReplicationCount: 1,
              },
            ],
          },
          cidVersion: Number(CID_VERSION),
        },
      });
      return result.IpfsHash;
    } catch (e) {
      console.log('Pinning was failed with error');
      core.setFailed(e);
    }
  } catch (e) {
    console.log('Pinata auth was failed');
    core.setFailed(e);
  }
};

cleanupAndPin().then((hash) => {
  core.setOutput('hash', hash);
  if (CID_VERSION == 1) {
    core.setOutput('uri', `https://${hash}.ipfs.cf-ipfs.com/`);
  }
  if (CID_VERSION == 0) {
    core.setOutput('uri', `https://cloudflare-ipfs.com/ipfs/${hash}/`);
  }
});
