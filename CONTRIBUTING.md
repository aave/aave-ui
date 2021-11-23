# Contributing

## Running the interface locally

```bash
npm run start
```

## Creating a production build

```bash
npm run build
```

## How to run (via Docker)

```bash
  docker-compose up
```

Local URL: [http://localhost:19006](http://localhost:19006)

## How to build (via Docker)

This project based on the [create-react-app](https://github.com/facebook/create-react-app), to build using docker-compose:

```bash
  docker-compose run frontend npm run build
```

## Env parameters

Environment variables are configured via `.env` files.
The [.env](https://github.com/aave/aave-ui/blob/master/.env) file in the root contains the defaults.
You may overwrite them for local development, by creating an additional `.env.local`
You may overwrite them for the production build, by creating an additional `.env.production`

### General network

REACT_APP_RATES_HISTORY_ENDPOINT - enable rates history endpoint support, optional

REACT_APP_ENABLE_TESTNET - enables markets that are on a network flagged as testnet

### Fiat onboard

This interface includes libraries to connect with fiat on-ramp services. They are disabled by default and it is the sole responsibility of the users running the interface to provide credentials in order the run them.

REACT_APP_ONRAMP_API_KEY - [Ramp network](https://ramp.network/) API key, disabled by default (optional)

REACT_APP_TRANSAK_API_KEY - [Transak](https://transak.com/) API key, disabled by default (optional)

REACT_APP_ENABLE_NASH - enabled by default

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
  forkEnabled // enables forks
  forkBaseChainId // chainId of the underlying chain (determines which markets will be forked)
  forkChainId // chainId you will set in metamask
  forkRPCUrl // the url of the http fork RPC
  forkWsRPCUrl // the url of the ws fork RPC
```

## Updating GraphQL Schemas

```bash
  npm run gql-gen
```
