# Layer2 Package

This package serves as a stand-alone lib that can be published t npm and imported into `widget/package` ro provide necessary logic to perform swaps form ETH => ERC-20.

## Local development

Import layer2 into package using `npm link`.

inside `layer2`:

```bash
yarn install
yarn link
yarn start
```

inside `widget/package`:

```bash
yarn link layer2
yarn start:local
```
