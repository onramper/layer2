import { Step } from '@lifinance/sdk';
import { LIFI_DEFAULTS } from '../../lifi/constants';
import { getLifiQuote, getLifiRoute } from '../../lifi/quote';
import {
  UNISWAP_DEFAULTS,
  getUniswapQuote,
  getUniswapRoute,
  QuoteDetails,
  RouteDetails,
} from '../../uniswap';
import { TokenInfo } from '../tokens';
import { getDex } from '../utils';

// ! executing a swap must be called conditionally from widget.

export const getQuote = async (
  gateway: string,
  tokenIn: TokenInfo,
  tokenOut: TokenInfo,
  inputAmount: number, // not formatted
  exactOut: boolean = false,
  apiKey: string,
  signal?: AbortSignal
): Promise<QuoteDetails | Step> => {
  if (getDex(gateway) === 'UNISWAP') {
    return getUniswapQuote(
      tokenIn,
      tokenOut,
      inputAmount,
      exactOut,
      apiKey,
      signal
    );
  }

  if (getDex(gateway) === 'LIFI') {
    return getLifiQuote(tokenIn, tokenOut, inputAmount, signal);
  }

  throw new Error('Dex not supported');
};

export const getRoute = async (
  gateway: string,
  balance: number,
  tokenIn: TokenInfo,
  tokenOut: TokenInfo,
  inputAmount: number,
  recipient: string,
  exactOut: boolean = false,
  options: {
    slippageTolerance: number;
    deadline: number;
  },
  apiKey: string,
  signal?: AbortSignal
): Promise<RouteDetails | any> => {
  if (getDex(gateway) === 'UNISWAP') {
    const swapOptions = options ?? UNISWAP_DEFAULTS;
    return getUniswapRoute(
      balance,
      tokenIn,
      tokenOut,
      inputAmount,
      recipient,
      exactOut,
      swapOptions,
      apiKey,
      signal
    );
  }

  if (getDex(gateway) === 'LIFI') {
    return getLifiRoute(
      tokenIn,
      tokenOut,
      inputAmount,
      options.slippageTolerance ?? LIFI_DEFAULTS.slippage,
      signal
    );
  }

  throw new Error('Dex not supported');
};
