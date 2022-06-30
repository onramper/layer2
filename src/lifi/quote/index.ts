import LIFI, { QuoteRequest, RoutesRequest } from '@lifinance/sdk';
import { TokenInfo } from '../../core/tokens';
import { utils } from 'ethers';
import { LIFI_DEFAULTS } from '../constants';

// no custom config for now
const lifi = new LIFI();

export const getLifiQuote = async (
  tokenIn: TokenInfo,
  tokenOut: TokenInfo,
  inputAmount: number, // not formatted
  destinationAddress?: string,
  signal?: AbortSignal
) => {
  const formattedAmount = utils
    .parseUnits(inputAmount.toString(), tokenIn.decimals)
    .toString();
  const request: QuoteRequest = {
    fromChain: tokenIn.chainId,
    fromToken: tokenIn.address,
    fromAddress: tokenIn.address,
    fromAmount: formattedAmount,
    toChain: tokenOut.chainId,
    toToken: tokenOut.address,
    toAddress: destinationAddress,
  };
  return lifi.getQuote(request, { signal });
};

export const getLifiRoute = async (
  tokenIn: TokenInfo,
  tokenOut: TokenInfo,
  inputAmount: number, // not formatted
  slippageTolerance: number,
  signal?: AbortSignal
) => {
  const formattedAmount = utils
    .parseUnits(inputAmount.toString(), tokenIn.decimals)
    .toString();

  const routeOptions = {
    ...LIFI_DEFAULTS,
    slippage: slippageTolerance,
  };

  const request: RoutesRequest = {
    fromChainId: tokenIn.chainId,
    fromAmount: formattedAmount,
    fromTokenAddress: tokenIn.address,
    toChainId: tokenOut.chainId,
    toTokenAddress: tokenOut.address,
    options: routeOptions,
  };
  return lifi.getRoutes(request, { signal });
};
