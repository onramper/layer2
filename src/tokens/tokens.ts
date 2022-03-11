export const TOKEN_LIST = 'https://tokens.uniswap.org/';

export const getTokens = async () => {
  return fetch(TOKEN_LIST);
};
