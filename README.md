# Onramper-Layer2 Package

This package serves as a library that can be published to npm and imported into `widget/package` to provide the necessary logic to perform swaps from Native Currency to any other token provided it is supported by the dex in questions.

## Dependencies included in the bundle

- [@usedapp/core](https://github.com/TrueFiEng/useDApp/)
- [@ethersproject/units](https://www.npmjs.com/package/@ethersproject/units)
- [@ethersproject/address](https://www.npmjs.com/package/@ethersproject/address)
- [@ethersproject/bignumber](https://www.npmjs.com/package/@ethersproject/bignumber)

### Dexs implemented to date

- Uniswap (v2 & v3)

## Local development

> Import layer2 into widget/package using `yarn link`.

inside `layer2` root folder:

```shell
yarn install
yarn link
yarn start
```

inside `widget/package`:

```shell
yarn link layer2
yarn start:l2
```

## Production Installation

> download directly from Github until v1 is published to NPM.

inside `widget/package`:

```shell
yarn add @onramper/layer2#main
```

## Usage

### First steps

1. Wrap your application with the Layer2Provider.

```typescript
import { L2Provider } from 'layer2';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <L2Provider>
      <App />
    </L2Provider>
  </React.StrictMode>
);
```

> The L2Provider is nothing but a wrapper for [@usedapp/core](https://usedapp-docs.netlify.app/docs)'s <DappProvider />
> UseDApp [documentation](https://usedapp-docs.netlify.app/docs)

2. Get a Quote

> If a user does not have their wallet ocnnected we can still fetch quote data. (`<QuoteResult>` returned by `getQuote()` does not contain `calldata` necessary to perform a swap, only quote data for display purposes).

```typescript
const { getQuote } from "layer2";

 const newQuote = await getQuote(
        tokenIn,
        tokenOut,
        amount,
        false,
        apiKey,
        abortSignal
      );

// Returns
// >>
//  interface QuoteDetails {
//   blockNumber: string;
//   amount: string;
//   amountDecimals: string;
//   quote: string;
//   quoteDecimals: string;
//   quoteGasAdjusted: string;
//   quoteGasAdjustedDecimals: string;
//   gasUseEstimateQuote: string;
//   gasUseEstimateQuoteDecimals: string;
//   gasUseEstimate: string;
//   gasUseEstimateUSD: string;
//   gasPriceWei: string;
//   route: any[][];
//   routeString: string;
//   quoteId: string;
// }
```

3. Get Swap Params

> If a user has connected their wallet, we have all the data needed by the quote api to return to us the `calldata` necessary to perform a swap.

```typescript
const { getSwapParams, useSendTransaction, useLayer2, formatEther } from "layer2";



const App = ()=> {
    const { sendTransaction, state } = useSendTransaction();
    const { account } = useLayer2()
    const balance = useEtherBalance(account);

    const res = await getSwapParams(
          Number(formatEther(balance)),
          tokenIn,
          tokenOut,
          amount,
          account,
          false,
          {
            1, // 1%
            200, // 200 seconds
          },
          apiKey
        );

// Returns
// >>
// interface RouteDetails extends QuoteDetails {
//   methodParameters: {
//     calldata: string; // long hexString
//     value: string; // 0x00
//   };

//   Now we can send the transaction with calldata
    const {data, to, value } = res;

 sendTransaction({
            data: data,
            to: to,
            value: value,
            from: receiverAddress,
          });
    return (
        <div>
            {state.status === "Mining" && (<p>Transaction pending...</p>)}
             {state.status === "Success" && (<p>Success!! 🚀</p>)}
        </div>

    )

}


```
