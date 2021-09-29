# Contributing

## How to run
```bash
  docker-compose up
```

Local URL: [http://localhost:19006](http://localhost:19006)

## How to build
This project based on the [create-react-app](https://github.com/facebook/create-react-app), to build using docker-compose:
```bash
  docker-compose run frontend npm run build
```

## Env parameters
Available networks: mainnet, ropsten, kovan, polygon, fork (mainnet fork), mumbai, polygon_fork

### General network
REACT_APP_DEFAULT_ETHEREUM_NETWORK - network selected in the app on the first enter (optional), default value: mainnet

REACT_APP_SUPPORTED_ETHEREUM_NETWORKS - list of supported ethereum networks, comma separated

REACT_APP_ENABLE_CACHING_BACKEND - enable [aave-caching-server](https://github.com/aave/aave-ui-caching-server) support, default value: false
REACT_APP_RATES_HISTORY_ENDPOINT - enable rates history endpoint support, optional

### Fiat onboard
This interface includes libraries to connect with fiat on-ramp services. They are disabled by default and it is the sole responsibility of the users running the interface to provide credentials in order the run them.

REACT_APP_ONRAMP_API_KEY - [Ramp network](https://ramp.network/) API key, disabled by default (optional)

REACT_APP_TRANSAK_API_KEY - [Transak](https://transak.com/) API key, disabled by default (optional)

REACT_APP_ENABLE_NASH - disabled by default, set true to enable

### Wallets
REACT_APP_AUTHEREUM_API_KEY - [Authereum wallet](https://authereum.com/) API key, disabled by default (optional)

REACT_APP_PORTIS_DAPP_ID - [Portis wallet](https://www.portis.io/) API key, disabled by default (optional)

REACT_APP_FORTMATIC_KEY_MAINNET - [Fortmatic wallet](https://fortmatic.com/) production API key(for mainnet), disabled by default (optional)

REACT_APP_FORTMATIC_KEY_TESTNET - [Fortmatic wallet](https://fortmatic.com/) development API key(for testnets), disabled by default (optional)

### Bug tracking and misc
It is possible to configure the interface to integrate with standard bug tracking (Sentry) and analytics services (GTM). Both are disabled by default and **we put emphasis on using them with responsibility, with users' privacy always in mind**.

REACT_APP_GTM_ID - [Google tag manager](https://marketingplatform.google.com/about/tag-manager/) id (optional)

REACT_APP_SENTRY_DSN - [Sentry](https://sentry.io/) dsn url (optional)

## Connecting to forks
If you want to run the app against a custom fork set corresponding params in the browser localStorage
```
  forkNetworkId // chainId you will set in metamask
  forkRPCUrl // the url of the http fork RPC
  forkWsRPCUrl // the url of the ws fork RPC
  fork_enabled // enable the fork
```

## Updating GraphQL Schemas
```bash
  npm run gql-gen
```
