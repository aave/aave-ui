# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.2.2](https://github.com/aave/aave-ui/compare/v0.2.1...v0.2.2) (2022-01-19)


### Features

* add HAL Notification Icon on supported market ([#324](https://github.com/aave/aave-ui/issues/324)) ([5e83157](https://github.com/aave/aave-ui/commit/5e8315786f0ec23e86aacfb102d326933341c80a))
* allow wallet-link on avalanche ([#349](https://github.com/aave/aave-ui/issues/349)) ([0a2deec](https://github.com/aave/aave-ui/commit/0a2deecd609e85b35b6406e8eb6329d72bc0c0a1))


### Bug Fixes

* remove unused config ([#353](https://github.com/aave/aave-ui/issues/353)) ([6c382ff](https://github.com/aave/aave-ui/commit/6c382ff819dffd6c53ff7e3deb40575e9fa4fe5f))

### [0.2.1](https://github.com/aave/aave-ui/compare/v0.2.0...v0.2.1) (2022-01-12)

### Features

- switch wdio to cypress test suite so forks can run tests more easily on their infra ([#254](https://github.com/aave/aave-ui/issues/254)) ([66b3fb5](https://github.com/aave/aave-ui/commit/66b3fb51726b260869025f0c33b1a590e8b68859))
- add link to snapshot governance from governance dashboard ([#304](https://github.com/aave/aave-ui/issues/304)) ([89096a5](https://github.com/aave/aave-ui/commit/89096a57a51d71593273a60a52e80963a57d682b))
- added `react-snowfall` because it's winter :tada: ([#284](https://github.com/aave/aave-ui/issues/284)) ([f63d0cb](https://github.com/aave/aave-ui/commit/f63d0cba9b22c8261cc371f07a9b71ff43c2c2e9))
- load languages on demand instead of all ([#294](https://github.com/aave/aave-ui/issues/294)) ([32e581e](https://github.com/aave/aave-ui/commit/32e581ee8c39c63b87f5e619e312f6dde1129353))

### Bug Fixes

- change etherscan TLD to .io ([#338](https://github.com/aave/aave-ui/issues/338)) ([c5a3da6](https://github.com/aave/aave-ui/commit/c5a3da613faa52399ced5c4c62fcdc58d0a15dbf))
- check txn validity before execution ([#314](https://github.com/aave/aave-ui/issues/314)) ([d4311ce](https://github.com/aave/aave-ui/commit/d4311ce47d3945db1e98031bcfab06e1252b4848))
- change `TokenIcon` import `'@aave/aave-ui-kit` to `helpers/config/assets-config` to allow easier adjustments ([#259](https://github.com/aave/aave-ui/issues/259)) ([61a5a5c](https://github.com/aave/aave-ui/commit/61a5a5c3e1438e52c94b0a4b7fb8beb750b18b99))
- remove rewards modal as it was only working for stkAave rewards ([#153](https://github.com/aave/aave-ui/issues/153)) ([74dd795](https://github.com/aave/aave-ui/commit/74dd795c131cfb7869e18c2eed3c0acd431e0028)), closes [#76](https://github.com/aave/aave-ui/issues/76)
- use correct stable rate in userSummary calculation ([#249](https://github.com/aave/aave-ui/issues/249)) ([dd7ad7f](https://github.com/aave/aave-ui/commit/dd7ad7f3786bbfa0fe224c434ede2c4eac146478))
- resolve an issue in current ltv calculation ([#267](https://github.com/aave/aave-ui/issues/267)) ([9ec5bfe](https://github.com/aave/aave-ui/commit/9ec5bfe9cb0e1c462d75c105a4b0c60f64081718))

## 0.2.0 (2021-12-14)

### ⚠ BREAKING CHANGES

- There are some changes on the config - mostly replacing `Network.*` string with a chainId.
  While this might be a little painful to change for forks once upgraded this will open up opportunities to run the ui for `Network`s not specified in aave-js (like harmony, xDai, Phantom,...).

- aave-ui now recommends using .env config over docker-compose config. This might be breaking for your workflow. Make sure .env variables are correctly set. docker-compose will still work though.
- most env variables have been removed as they could be infered from the config instead making the setup easier. Please have a look at the updated [Contributing](./CONTRIBUTING.md) guidelines.

Connecting to forks also no longer works via a hardcoded localStorage param per network, but with a generic approach which will automatically generate markets & networkConfigs based on a few localStorage parameters.

```js
localStorage.setItem('forkEnabled', 'true');
localStorage.setItem('forkBaseChainId', 1);
localStorage.setItem('forkChainId', 3030);
localStorage.setItem('forkRPCUrl', '<your fork rpc>');
```

### Features

- add a link to the ampl faq ([#208](https://github.com/aave/aave-ui/issues/208)) ([468783e](https://github.com/aave/aave-ui/commit/468783e8e0d6e712d2c9ed704e9f08db9d982cfc))
- add apr to markets info to reduce APR/APY confusion ([#119](https://github.com/aave/aave-ui/issues/119)) ([7c55cd2](https://github.com/aave/aave-ui/commit/7c55cd213960f7c3677bccfecba7ee6561db6ade))
- add dialog with information about cool down period ([#58](https://github.com/aave/aave-ui/issues/58)) ([5801a0c](https://github.com/aave/aave-ui/commit/5801a0c84334c5c6f8e275b2b2188dc120938f09))
- display ens instead of address if available ([#142](https://github.com/aave/aave-ui/issues/142)) ([b36290c](https://github.com/aave/aave-ui/commit/b36290ca893a5fe64ebe98033abfba4cd5578856))
- add incentives data provider ([#19](https://github.com/aave/aave-ui/issues/19)) ([79891e9](https://github.com/aave/aave-ui/commit/79891e9c924a6a130d32c5c65ad3d88ab55bc229)), closes [#22](https://github.com/aave/aave-ui/issues/22)
- add ci automation for changelog generation ([#228](https://github.com/aave/aave-ui/issues/228)) ([4f1acca](https://github.com/aave/aave-ui/commit/4f1acca58e8d1159020bc05ce98c497d88f0adf1))
- add IPFS preview deployments per branch ([#27](https://github.com/aave/aave-ui/issues/27)) ([3b5faf8](https://github.com/aave/aave-ui/commit/3b5faf856b0227f8e5ce78c3e5e5cbf872d80e3c))
- in order to improve decentralization releases are now pinned on crust ipfs in addition to pinata ([#151](https://github.com/aave/aave-ui/issues/151)) ([2e10652](https://github.com/aave/aave-ui/commit/2e10652da97ce05840b36ed50232bbbead399761))
- add doc that helps with manual verification on addresses ([#214](https://github.com/aave/aave-ui/issues/214)) ([883c86e](https://github.com/aave/aave-ui/commit/883c86e52714455ab5508b041b094ba8f9bd767d))
- add avalanche market ([#26](https://github.com/aave/aave-ui/issues/26)) ([013c71e](https://github.com/aave/aave-ui/commit/013c71e65ae97d9bc8f788869b11abfad27c20ad))
- add info banners for bridging assets ([821cea0](https://github.com/aave/aave-ui/commit/821cea013f7ae762c04bd514d39c4525e3bd8b8a))
- display banner for specific markets ([f70b23d](https://github.com/aave/aave-ui/commit/f70b23de0543e4e60414a2c9232310af771fb308))
- to clean up amm market view the app no longer shows frozen reserves on markets page ([#224](https://github.com/aave/aave-ui/issues/224)) ([8de32c6](https://github.com/aave/aave-ui/commit/8de32c681797b9e2f482aac11107a173504d0d1a))
- improve resilence by using fallback providers instead of relying on a single rpc provider ([#138](https://github.com/aave/aave-ui/issues/138)) ([0341e75](https://github.com/aave/aave-ui/commit/0341e75b686f5780e98654f1177c2dd31cf56948))
- port testing setup to github aave-ui ([#36](https://github.com/aave/aave-ui/issues/36)) ([c1cb9fe](https://github.com/aave/aave-ui/commit/c1cb9fe800c2fb881bdb7c4e588b81df56c49148))
- adding ci for triggering on demand ipfs deployment ([#41](https://github.com/aave/aave-ui/issues/41)) ([e4004d4](https://github.com/aave/aave-ui/commit/e4004d42cccd452606f82a8cfb615423d9150a6f))
- migrate to dotenv files ([#86](https://github.com/aave/aave-ui/issues/86)) ([c133f20](https://github.com/aave/aave-ui/commit/c133f20cb47908ded42275d3412e28325d213994))
- allow better customization on the permission warning ([#30](https://github.com/aave/aave-ui/issues/30)) ([f1e6e54](https://github.com/aave/aave-ui/commit/f1e6e549e85404a18c025da5e565d48588f2313d))
- add automated staging IPFS deployment with has testnetworks enabled ([#39](https://github.com/aave/aave-ui/issues/39)) ([99db1fd](https://github.com/aave/aave-ui/commit/99db1fd520f198db194577bac9e4e66c4934ffff))
- add automated testing for staking ([#165](https://github.com/aave/aave-ui/issues/165)) ([b985d34](https://github.com/aave/aave-ui/commit/b985d3417dcfd7796c5c2b9a2fcc466754a87cd0))
- point app.aave.com to ipfs deployment ([#46](https://github.com/aave/aave-ui/issues/46)) ([d3322f9](https://github.com/aave/aave-ui/commit/d3322f990742c82e24e89757b9f29fa5c3706bfc))
- update uipooldataprovider to new version ([#96](https://github.com/aave/aave-ui/issues/96)) ([c00b0dc](https://github.com/aave/aave-ui/commit/c00b0dc0b9020912c036a1309300a8263eeda144))
- use custom ipfs gateway ([#176](https://github.com/aave/aave-ui/issues/176)) ([369c208](https://github.com/aave/aave-ui/commit/369c208b833948fdcdb008312948247482ae058f))

### Bug Fixes

- add fuji subgraph url ([#94](https://github.com/aave/aave-ui/issues/94)) ([042bbaf](https://github.com/aave/aave-ui/commit/042bbafd23644a1009aba1cc7d0cf2e4e1063ae8))
- add missing USDP & FEI assets ([535c1d9](https://github.com/aave/aave-ui/commit/535c1d9c2d1f4f4e97fbcab78fde126c1cd81abe))
- add new APY fields to two pages that were missed ([#120](https://github.com/aave/aave-ui/issues/120)) ([a10dcf3](https://github.com/aave/aave-ui/commit/a10dcf304e1ae949f4a4146a346c5aaf44f071e2))
- add swap gas estimation ([#11](https://github.com/aave/aave-ui/issues/11)) ([e3f28f1](https://github.com/aave/aave-ui/commit/e3f28f1e242a39c0839b78325ce8d86fa2b2489d))
- allow running the app with governance disabled ([#31](https://github.com/aave/aave-ui/issues/31)) ([0387e11](https://github.com/aave/aave-ui/commit/0387e11bdf919572dabb602bf9fd5ec5344f26df))
- allow testing paraswap on forks ([#43](https://github.com/aave/aave-ui/issues/43)) ([3e285c3](https://github.com/aave/aave-ui/commit/3e285c3fe101037048e00c3b48f7b5a280905827))
- allow users to withdraw on frozen reserves ([#182](https://github.com/aave/aave-ui/issues/182)) ([e81e955](https://github.com/aave/aave-ui/commit/e81e955fd8f69315a91452d321ce094d0fa2d094))
- apply permissions wrapper to repay & redeem ([#93](https://github.com/aave/aave-ui/issues/93)) ([efb2416](https://github.com/aave/aave-ui/commit/efb2416f108a9f8456c50ae901f2eea0140109f7))
- backport temporary incentive fix ([c6b2df6](https://github.com/aave/aave-ui/commit/c6b2df69215fdd06194c6e26dbdafbd01ea19307))
- chart title now says apr instead of apy ([#116](https://github.com/aave/aave-ui/issues/116)) ([3ba62f7](https://github.com/aave/aave-ui/commit/3ba62f75bf342fa9211f20677c822bfdecada457))
- cleanup old bridge assets message from deposit page ([3c8ea8e](https://github.com/aave/aave-ui/commit/3c8ea8e4f5d671727674965ea39bc99a8f93bfe8))
- cleanup unused imports ([9a00185](https://github.com/aave/aave-ui/commit/9a001855a7f5cd3b47d2dc8ff9d69a7d94fa12b5))
- correct deployment uri ([#67](https://github.com/aave/aave-ui/issues/67)) [skip ci] ([de291ce](https://github.com/aave/aave-ui/commit/de291cebaa17b221d9aa3ce2f9c65ae7692cdea9))
- correct length assetion to not render 0 ([#139](https://github.com/aave/aave-ui/issues/139)) ([ab8ced4](https://github.com/aave/aave-ui/commit/ab8ced431a027bdea866541c865284dc96a4b3fe))
- correctly render stable rates ([#121](https://github.com/aave/aave-ui/issues/121)) ([e16fea0](https://github.com/aave/aave-ui/commit/e16fea00dec14bc272047b05fd60a8737c89e506))
- correctly setup husky ([#225](https://github.com/aave/aave-ui/issues/225)) ([a9c9d92](https://github.com/aave/aave-ui/commit/a9c9d92d9b5a79bd6fc556e6ca78d0a86df6018a))
- disable misleading ampl charts ([#59](https://github.com/aave/aave-ui/issues/59)) ([b47579c](https://github.com/aave/aave-ui/commit/b47579c55b83ef79f4b563af0178f3f4a3340bab))
- disable repayWithCollateral for illiquid uniswap v2 assets ([a94e0e0](https://github.com/aave/aave-ui/commit/a94e0e050b7764ec4044a0160181a7d4cf1bc894))
- display of double tokens ([29309d0](https://github.com/aave/aave-ui/commit/29309d04297bcad0301e5bd205ef43ae249cbe26))
- dont flash charts ([#124](https://github.com/aave/aave-ui/issues/124)) ([bf9b526](https://github.com/aave/aave-ui/commit/bf9b52643fdeefc53a6ebf179efd904d86505568))
- fix network naming ([#188](https://github.com/aave/aave-ui/issues/188)) ([c7ce651](https://github.com/aave/aave-ui/commit/c7ce6511e2b633087a475e0af1b86fda59a326c0))
- fix paths ([#60](https://github.com/aave/aave-ui/issues/60)) ([96633ea](https://github.com/aave/aave-ui/commit/96633ea6578e85595b992dd65398e3a251c6a8c0))
- fix pie charts ([#56](https://github.com/aave/aave-ui/issues/56)) ([2ab4baf](https://github.com/aave/aave-ui/commit/2ab4bafed3cec6f04b008c2c036b4cbf026d4156))
- fixes an issue with unstaking and bpt stakes ([0836436](https://github.com/aave/aave-ui/commit/08364369bc996e27ff6766c1c6ea34ae08d78f46))
- gnosis supports polygon ([50b1c7d](https://github.com/aave/aave-ui/commit/50b1c7d86422d486985eeb001d8e98240096f0fb))
- governance ([#169](https://github.com/aave/aave-ui/issues/169)) ([b9ea983](https://github.com/aave/aave-ui/commit/b9ea983f3e54bff288a71f01dd73c5eab362c2c6))
- governance fallback to rpc ([#82](https://github.com/aave/aave-ui/issues/82)) ([b209689](https://github.com/aave/aave-ui/commit/b209689473e0efe413e24748fe6e2a769c254c6f))
- logic for determining if vote differential is reached ([#152](https://github.com/aave/aave-ui/issues/152)) ([08ea8dd](https://github.com/aave/aave-ui/commit/08ea8dd55dffbe87f17c137e0d16dcbf46c9699e))
- make testnet a network flag ([#44](https://github.com/aave/aave-ui/issues/44)) ([bc99d77](https://github.com/aave/aave-ui/commit/bc99d77346a760e7e3d4e26f6911a649914f4255))
- manually set proposalstate to expired ([#226](https://github.com/aave/aave-ui/issues/226)) ([eb20845](https://github.com/aave/aave-ui/commit/eb20845aa91bd65471f0e4aa285c0ce296661131))
- quickfix gelato ([#222](https://github.com/aave/aave-ui/issues/222)) ([f06d220](https://github.com/aave/aave-ui/commit/f06d2209b4984d1583f980b332b98fd304b84f6d))
- rates on deposit page correctly calculate second slope ([#79](https://github.com/aave/aave-ui/issues/79)) ([2350edb](https://github.com/aave/aave-ui/commit/2350edb8c9321fb59fdbcda069f8797d9af85f22))
- remove zero address to unbreak caching ([#141](https://github.com/aave/aave-ui/issues/141)) ([363c1f0](https://github.com/aave/aave-ui/commit/363c1f0bdff707e4b743135e4798ab461856725d))
- remove.env and add .gitignore ([#115](https://github.com/aave/aave-ui/issues/115)) ([65eba5b](https://github.com/aave/aave-ui/commit/65eba5bf261805c6a69cb63a0a4b51d91df8f834))
- rename folder to properly pick it up ([#75](https://github.com/aave/aave-ui/issues/75)) ([17a9e41](https://github.com/aave/aave-ui/commit/17a9e41304358c8c8a40657467fdd5f44af6d88c))
- replace gasnow with paraswap api ([#33](https://github.com/aave/aave-ui/issues/33)) ([02d8ecb](https://github.com/aave/aave-ui/commit/02d8ecb94af9462f34b3abb0b5c948fb87b00c0c))
- replicate in frankfurt ([#140](https://github.com/aave/aave-ui/issues/140)) ([9cff177](https://github.com/aave/aave-ui/commit/9cff1771c91d2455684baea64624723131640a7e))
- reserve apy calculations ([#78](https://github.com/aave/aave-ui/issues/78)) ([98125ac](https://github.com/aave/aave-ui/commit/98125aca10c464ab529f0bccb8016333dfee21b6))
- staking now shows when no wallet attached ([#147](https://github.com/aave/aave-ui/issues/147)) ([731a54d](https://github.com/aave/aave-ui/commit/731a54d03560f73cb142a7787f7c1cc0dcf6edba))
- translations ([b3b581a](https://github.com/aave/aave-ui/commit/b3b581aa1cc9e0ee92cc253a9c795cd5c559342e))
- unset network name ([#173](https://github.com/aave/aave-ui/issues/173)) ([e2b8bf5](https://github.com/aave/aave-ui/commit/e2b8bf556acc848af830c3225b94e24adc024d12))
- update paraswap to 5v and add avalanche ([#74](https://github.com/aave/aave-ui/issues/74)) ([b76d67b](https://github.com/aave/aave-ui/commit/b76d67b860ba0b1fade1bff5384f587c20800253))
- update ui kit version to account for .E symbols ([#65](https://github.com/aave/aave-ui/issues/65)) ([ec85fd5](https://github.com/aave/aave-ui/commit/ec85fd5474a12b3d98fd1b74caa0fc28b098ccbf))
- update ui-kit (support of GUNIUSDCUSDT, GUNIDAIUSDC) ([#217](https://github.com/aave/aave-ui/issues/217)) ([081a81f](https://github.com/aave/aave-ui/commit/081a81ffa1b39172e5a222d965dc5c841cbd8d01))
- updated protocol-js version with incentive reward fix ([c944a80](https://github.com/aave/aave-ui/commit/c944a8082bb0c93d1a1552625d572a21ed599ff6))
- updated USDP icon & assets order ([0be5312](https://github.com/aave/aave-ui/commit/0be5312649616abb9518921551071a8c61e0c46f))
- usd calculation for gas price ([#149](https://github.com/aave/aave-ui/issues/149)) ([5cf7b2a](https://github.com/aave/aave-ui/commit/5cf7b2a0d9001e0d200e38fcb0c9d452b6f058a9))
- usd pricing on tx estimate and editor ([#163](https://github.com/aave/aave-ui/issues/163)) ([658d9d0](https://github.com/aave/aave-ui/commit/658d9d04bcf98749096844b467cf25052c327890))
- use aggregated polygon rpc ([85ef8ab](https://github.com/aave/aave-ui/commit/85ef8abbfb417858c011ccf90427f607f54d7751))
- use alchemy demo instead of cloudflare rpc & fix bug with disabling governance ([#8](https://github.com/aave/aave-ui/issues/8)) ([e35721c](https://github.com/aave/aave-ui/commit/e35721c9877067ffa158c3c7d36bfd1e6ac6c26e))
- use correct ipfs title ([#168](https://github.com/aave/aave-ui/issues/168)) ([cb9b2b2](https://github.com/aave/aave-ui/commit/cb9b2b2cd960a629ed07202991eaf77c04fc8b30))
- use correct uri in test ci ([#61](https://github.com/aave/aave-ui/issues/61)) ([b1e9cf5](https://github.com/aave/aave-ui/commit/b1e9cf54c0a672958d798612eaa4ba076689696b))
- use governance pinata ([#181](https://github.com/aave/aave-ui/issues/181)) ([16df1ab](https://github.com/aave/aave-ui/commit/16df1ab2289609af0dc5679d657b28ffb39dd22a))
- use ipfs for staging ([4ee9e02](https://github.com/aave/aave-ui/commit/4ee9e026c964ba1f45121face32d7825a7bc976b))
- use Link component for link icon ([35c316b](https://github.com/aave/aave-ui/commit/35c316bf811a2c60edc89dbab7b89879e716af43))
- wrap bridge name into link ([932443f](https://github.com/aave/aave-ui/commit/932443f2b4a8c41171513aabf1bfa3bf3977bd5a))

- use chainId over Network name ([#110](https://github.com/aave/aave-ui/issues/110)) ([4d90797](https://github.com/aave/aave-ui/commit/4d9079732f0012d0a7f5726a852354c7dc096c5e))
