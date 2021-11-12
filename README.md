```
        .///.                .///.     //.            .//  `/////////////-
       `++:++`              .++:++`    :++`          `++:  `++:......---.`
      `/+: -+/`            `++- :+/`    /+/         `/+/   `++.
      /+/   :+/            /+:   /+/    `/+/        /+/`   `++.
  -::/++::`  /+:       -::/++::` `/+:    `++:      :++`    `++/:::::::::.
  -:+++::-`  `/+:      --++/---`  `++-    .++-    -++.     `++/:::::::::.
   -++.       .++-      -++`       .++.    .++.  .++-      `++.
  .++-         -++.    .++.         -++.    -++``++-       `++.
 `++:           :++`  .++-           :++`    :+//+:        `++:----------`
 -/:             :/-  -/:             :/.     ://:         `/////////////-
```

# Aave protocol interface :ghost:

An open source interface for the decentralized liquidity protocol Aave.
Enabling users to:

- Manage and monitor their positions on the Aave Protocol, and the overall status of it.
- Manage and monitor their positions on the Aave Safety module.
- Participate on the Aave Governance.

## IPFS deployment

Each commit gets deployed to ipfs automatically.
There's a github action commenting the appropriate ipfs hash embedded in the cloudflare ipfs gateway after each commit.

For ease of use:

- the DNS of [https://staging.aave.com](https://staging.aave.com) will always point to the latest master ipfs hash with all networks enabled.
- the DNS of [htpps://app.aave.com](https://app.aave.com) will always point to the latest master ipfs hash with disabled test networks.

## Contribution

For instructions on local development, deployment and configurations, see [Contributing](./CONTRIBUTING.md)

## Troubleshooting

Issue: I cannot connect to the `app.aave.com`

The aave ui is hosted on ipfs in a decentralized manner.
`app.aave.com` is just a cname record to the cloudflare ipfs gateway.
You can use [any](https://ipfs.github.io/public-gateway-checker/) public or private ipfs gateway to access the aave ui if for some reason the cloudflare gateway doesn't work for you.
Simply go to `<your favorite public ipfs gateway>/ipns/app.aave.com` instead.

## License

[BSD-3-Clause](./LICENSE.md)

## Credits

To all the Ethereum community
