const pinataSDK = require('@pinata/sdk');

const cid = require('multiformats/cid');

const PIN_ALIAS = process.env.PIN_ALIAS || 'AaveIPFSFrontend';

const BUILD_LOCATION = process.env.BUILD_LOCATION || './build';

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY;

if (!PINATA_SECRET_KEY || !PINATA_API_KEY) {
  console.log('PINATA_SECRET_KEY and PINATA_API_KEY should be specified');
  process.exit(1);
}

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
            console.log(`Failed to unpin ${pin.ipfs_pin_hash} with error`, e);
            process.exit(1);
          }
        }
      }
    } catch (e) {
      console.log('Failed to get a list of existing pins with error', e);
      process.exit(1);
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
        },
      });
      return result.IpfsHash;
    } catch (e) {
      console.log('Pinning was failed with error', e);
      process.exit(1);
    }
  } catch (e) {
    console.log('Pinata auth was failed with error', e);
    process.exit(1);
  }
};

cleanupAndPin().then((hash) => {
  console.log(`::set-output name=hash::${hash}`);
  const base32_cid = cid.CID.parse(hash).toV1().toString();
  console.log(`::set-output name=uri::https://${base32_cid}.ipfs.cf-ipfs.com/`);
});
