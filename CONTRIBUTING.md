# Contributing

## Running the interface locally

```bash
npm run start
```

## Creating a production build

```bash
npm run build
```

## Env parameters

Environment variables are configured via `.env` files.
The [.env](https://github.com/aave/aave-ui/blob/master/.env) file in the root contains the defaults.
You may overwrite them for local development, by creating an additional `.env.local`
You may overwrite them for the production build, by creating an additional `.env.production`

### General network

REACT_APP_ENABLE_TESTNET - enables markets that are on a network flagged as testnet

### Fiat onboard

This interface includes libraries to connect with fiat on-ramp services.

REACT_APP_ENABLE_NASH - enabled by default

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
