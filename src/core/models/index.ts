// dex quote functions must return this type

export interface SwapQuote {
  fromAmount: string;
  fromAmountUSD?: string;
  toAmount: string;
  toAmountMin: string; // minOutputAmount
  toAmountUSD?: string;
  gas?: string;
  fees?: string;
}
