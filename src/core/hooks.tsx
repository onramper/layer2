import { useEthers } from '@usedapp/core';
import { useCallback, useEffect, useState } from 'react';
import { TokenInfo } from '../tokens';
import {
  getAddressFromEnsName,
  getEnsNameFromAddress,
  isMetaMaskProvider,
  uriToHttp,
} from './utils';
import { JsonRpcProvider } from '@ethersproject/providers';

export const useAddTokenToMetamask = (
  token: TokenInfo
): {
  addToken: () => void;
  success: boolean | null;
} => {
  const [success, setSuccess] = useState<boolean | null>(null);
  const { library } = useEthers();

  const addToken = useCallback(() => {
    if (library && isMetaMaskProvider(library) && token) {
      const { address, symbol, decimals, logoURI } = token;
      const logoURL = logoURI ? uriToHttp(logoURI)[0] : '';
      library.provider
        .request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: address,
              symbol: symbol,
              decimals: decimals,
              image: logoURL,
            },
          },
        })
        .then(success => {
          setSuccess(success);
        })
        .catch(() => setSuccess(false));
    } else {
      setSuccess(false);
    }
  }, [library, token]);

  return { addToken, success };
};

export const useEnsName = (): string | null => {
  const [ensName, setEnsName] = useState<string | null>(null);
  const { account, library } = useEthers();

  const findName = async (address: string, library: JsonRpcProvider) => {
    const name = await getEnsNameFromAddress(address, library);
    if (name) {
      setEnsName(name);
    }
  };

  useEffect(() => {
    if (account && library) {
      findName(account, library);
    }
  }, [account, library]);

  return ensName;
};

export const useEnsAddress = (name: string) => {
  const [address, setAddress] = useState<string | null>(null);
  const { library } = useEthers();

  const findAddress = async (ensName: string, library: JsonRpcProvider) => {
    const ensAddress = await getAddressFromEnsName(ensName, library);
    if (ensAddress) {
      setAddress(ensAddress);
    }
  };

  useEffect(() => {
    if (name && library) {
      findAddress(name, library);
    }
  }, [name, library]);

  return address;
};
