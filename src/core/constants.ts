import { Mainnet, Chain, Rinkeby } from '@usedapp/core';
import { Info } from './models';

export const NATIVE_INPUT_ONLY = true; // for now we only allow ETH => ERC20

export const NativeCurrencies = [
  {
    chainId: 1,
    symbol: 'ETH',
  },
  {
    chainId: 3,
    symbol: 'ETH',
  },
  {
    chainId: 4,
    symbol: 'ETH',
  },
  {
    chainId: 5,
    symbol: 'ETH',
  },
];

// No need change the address, same is for all testnets and mainnet
export const SWAP_ROUTER_ADDRESS = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45';

// temporar measure:
// export const ROUTER_API =
//   'https://a7sf9dqtif.execute-api.eu-central-1.amazonaws.com/prod';

export const ROUTER_API = 'https://api.uniswap.org/v1';

export const DEFAULTS = {
  slippageTolerance: 1, // 1%
  deadline: 200, // 200 seconds
};

export const SUPPORTED_CHAINS = [1, 4];

export const chainIdToNetwork: { [key: number]: Chain } = {
  1: Mainnet,
  4: Rinkeby,
};

export const knownWethAddresses = [
  { chainId: 1, address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' },
  { chainId: 3, address: '0xc778417E063141139Fce010982780140Aa0cD5Ab' },
  { chainId: 4, address: '0xc778417E063141139Fce010982780140Aa0cD5Ab' },
  { chainId: 5, address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6' },
  { chainId: 42, address: '0xd0A1E359811322d97991E03f863a0C30C2cF029C' },
  { chainId: 10, address: '0x4200000000000000000000000000000000000006' },
  { chainId: 69, address: '0x4200000000000000000000000000000000000006' },
  { chainId: 42161, address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1' },
  { chainId: 421611, address: '0xB47e6A5f8b33b3F17603C83a0535A9dcD7E32681' },
  { chainId: 137, address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270' },
  { chainId: 80001, address: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889' },
];

export const chainIDToNetworkInfo: Info[] = [
  {
    chainId: 1,
    name: 'Ethereum Mainnet',
    symbol: 'ETH',
    decimals: 18,
    wethAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  },
  {
    chainId: 2,
    name: 'Expanse Network',
    symbol: 'EXP',
    decimals: 18,
  },
  {
    chainId: 3,
    name: 'Ropsten',
    symbol: 'ROP',
    decimals: 18,
    wethAddress: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  },
  {
    chainId: 4,
    name: 'Rinkeby',
    symbol: 'RIN',
    decimals: 18,
    wethAddress: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  },
  {
    chainId: 5,
    name: 'Görli',
    symbol: 'GOR',
    decimals: 18,
    wethAddress: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
  },
  {
    chainId: 6,
    name: 'Ethereum Classic Testnet Kotti',
    symbol: 'KOT',
    decimals: 18,
  },
  {
    chainId: 7,
    name: 'ThaiChain',
    symbol: 'TCH',
    decimals: 18,
  },
  {
    chainId: 8,
    name: 'Ubiq',
    symbol: 'UBQ',
    decimals: 18,
  },
  {
    chainId: 9,
    name: 'Ubiq Network Testnet',
    symbol: 'TUBQ',
    decimals: 18,
  },
  {
    chainId: 10,
    name: 'Optimism',
    symbol: 'ETH',
    decimals: 18,
    wethAddress: '0x4200000000000000000000000000000000000006',
  },
  {
    chainId: 11,
    name: 'Metadium Mainnet',
    symbol: 'META',
    decimals: 18,
  },
  {
    chainId: 12,
    name: 'Metadium Testnet',
    symbol: 'KAL',
    decimals: 18,
  },
  {
    chainId: 13,
    name: 'Diode Testnet Staging',
    symbol: 'sDIODE',
    decimals: 18,
  },
  {
    chainId: 14,
    name: 'Flare Mainnet',
    symbol: 'FLR',
    decimals: 18,
  },
  {
    chainId: 15,
    name: 'Diode Prenet',
    symbol: 'DIODE',
    decimals: 18,
  },
  {
    chainId: 16,
    name: 'Flare Testnet Coston',
    symbol: 'CFLR',
    decimals: 18,
  },
  {
    chainId: 17,
    name: 'ThaiChain 2.0 ThaiFi',
    symbol: 'TFI',
    decimals: 18,
  },
  {
    chainId: 18,
    name: 'ThunderCore Testnet',
    symbol: 'TST',
    decimals: 18,
  },
  {
    chainId: 19,
    name: 'Songbird Canary-Network',
    symbol: 'SGB',
    decimals: 18,
  },
  {
    chainId: 20,
    name: 'Elastos Smart Chain',
    symbol: 'ELA',
    decimals: 18,
  },
  {
    chainId: 21,
    name: 'ELA-ETH-Sidechain Testnet',
    symbol: 'tELA',
    decimals: 18,
  },
  {
    chainId: 22,
    name: 'ELA-DID-Sidechain Mainnet',
    symbol: 'ELA',
    decimals: 18,
  },
  {
    chainId: 23,
    name: 'ELA-DID-Sidechain Testnet',
    symbol: 'tELA',
    decimals: 18,
  },
  {
    chainId: 24,
    name: 'Dithereum Mainnet',
    symbol: 'DTH',
    decimals: 18,
  },
  {
    chainId: 25,
    name: 'Cronos Mainnet Beta',
    symbol: 'CRO',
    decimals: 18,
  },
  {
    chainId: 26,
    name: 'Genesis L1 testnet',
    symbol: 'L1test',
    decimals: 18,
  },
  {
    chainId: 27,
    name: 'ShibaChain',
    symbol: 'SHIB',
    decimals: 18,
  },
  {
    chainId: 28,
    name: 'Boba Network Rinkeby Testnet',
    symbol: 'ETH',
    decimals: 18,
  },
  {
    chainId: 29,
    name: 'Genesis L1',
    symbol: 'L1',
    decimals: 18,
  },
  {
    chainId: 30,
    name: 'RSK Mainnet',
    symbol: 'RBTC',
    decimals: 18,
  },
  {
    chainId: 31,
    name: 'RSK Testnet',
    symbol: 'tRBTC',
    decimals: 18,
  },
  {
    chainId: 32,
    name: 'GoodData Testnet',
    symbol: 'GooD',
    decimals: 18,
  },
  {
    chainId: 33,
    name: 'GoodData Mainnet',
    symbol: 'GooD',
    decimals: 18,
  },
  {
    chainId: 34,
    name: 'Dithereum Testnet',
    symbol: 'DTH',
    decimals: 18,
  },
  {
    chainId: 35,
    name: 'TBWG Chain',
    symbol: 'TBG',
    decimals: 18,
  },
  {
    chainId: 38,
    name: 'Valorbit',
    symbol: 'VAL',
    decimals: 18,
  },
  {
    chainId: 40,
    name: 'Telos EVM Mainnet',
    symbol: 'TLOS',
    decimals: 18,
  },
  {
    chainId: 41,
    name: 'Telos EVM Testnet',
    symbol: 'TLOS',
    decimals: 18,
  },
  {
    chainId: 42,
    name: 'Kovan',
    symbol: 'KOV',
    decimals: 18,
    wethAddress: '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
  },
  {
    chainId: 43,
    name: 'Darwinia Pangolin Testnet',
    symbol: 'PRING',
    decimals: 18,
  },
  {
    chainId: 44,
    name: 'Darwinia Crab Network',
    symbol: 'CRAB',
    decimals: 18,
  },
  {
    chainId: 45,
    name: 'Darwinia Pangoro Testnet',
    symbol: 'ORING',
    decimals: 18,
  },
  {
    chainId: 50,
    name: 'XinFin Network Mainnet',
    symbol: 'XDC',
    decimals: 18,
  },
  {
    chainId: 51,
    name: 'XinFin Apothem Testnet',
    symbol: 'TXDC',
    decimals: 18,
  },
  {
    chainId: 52,
    name: 'CoinEx Smart Chain Mainnet',
    symbol: 'cet',
    decimals: 18,
  },
  {
    chainId: 53,
    name: 'CoinEx Smart Chain Testnet',
    symbol: 'cett',
    decimals: 18,
  },
  {
    chainId: 55,
    name: 'Zyx Mainnet',
    symbol: 'ZYX',
    decimals: 18,
  },
  {
    chainId: 56,
    name: 'Binance Smart Chain Mainnet',
    symbol: 'BNB',
    decimals: 18,
  },
  {
    chainId: 57,
    name: 'Syscoin Mainnet',
    symbol: 'SYS',
    decimals: 18,
  },
  {
    chainId: 58,
    name: 'Ontology Mainnet',
    symbol: 'ONG',
    decimals: 9,
  },
  {
    chainId: 59,
    name: 'EOS Mainnet',
    symbol: 'EOS',
    decimals: 18,
  },
  {
    chainId: 60,
    name: 'GoChain',
    symbol: 'GO',
    decimals: 18,
  },
  {
    chainId: 61,
    name: 'Ethereum Classic Mainnet',
    symbol: 'ETC',
    decimals: 18,
  },
  {
    chainId: 62,
    name: 'Ethereum Classic Testnet Morden',
    symbol: 'TETC',
    decimals: 18,
  },
  {
    chainId: 63,
    name: 'Ethereum Classic Testnet Mordor',
    symbol: 'METC',
    decimals: 18,
  },
  {
    chainId: 64,
    name: 'Ellaism',
    symbol: 'ELLA',
    decimals: 18,
  },
  {
    chainId: 65,
    name: 'OKExChain Testnet',
    symbol: 'OKT',
    decimals: 18,
  },
  {
    chainId: 66,
    name: 'OKXChain Mainnet',
    symbol: 'OKT',
    decimals: 18,
  },
  {
    chainId: 67,
    name: 'DBChain Testnet',
    symbol: 'DBM',
    decimals: 18,
  },
  {
    chainId: 68,
    name: 'SoterOne Mainnet',
    symbol: 'SOTER',
    decimals: 18,
  },
  {
    chainId: 69,
    name: 'Optimism Kovan',
    symbol: 'KOR',
    decimals: 18,
    wethAddress: '0x4200000000000000000000000000000000000006',
  },
  {
    chainId: 71,
    name: 'Conflux eSpace (Testnet)',
    symbol: 'CFX',
    decimals: 18,
  },
  {
    chainId: 74,
    name: 'IDChain Mainnet',
    symbol: 'EIDI',
    decimals: 18,
  },
  {
    chainId: 76,
    name: 'Mix',
    symbol: 'MIX',
    decimals: 18,
  },
  {
    chainId: 77,
    name: 'POA Network Sokol',
    symbol: 'SPOA',
    decimals: 18,
  },
  {
    chainId: 78,
    name: 'PrimusChain mainnet',
    symbol: 'PETH',
    decimals: 18,
  },
  {
    chainId: 80,
    name: 'GeneChain',
    symbol: 'RNA',
    decimals: 18,
  },
  {
    chainId: 82,
    name: 'Meter Mainnet',
    symbol: 'MTR',
    decimals: 18,
  },
  {
    chainId: 83,
    name: 'Meter Testnet',
    symbol: 'MTR',
    decimals: 18,
  },
  {
    chainId: 85,
    name: 'GateChain Testnet',
    symbol: 'GT',
    decimals: 18,
  },
  {
    chainId: 86,
    name: 'GateChain Mainnet',
    symbol: 'GT',
    decimals: 18,
  },
  {
    chainId: 87,
    name: 'Nova Network',
    symbol: 'SNT',
    decimals: 18,
  },
  {
    chainId: 88,
    name: 'TomoChain',
    symbol: 'TOMO',
    decimals: 18,
  },
  {
    chainId: 89,
    name: 'TomoChain Testnet',
    symbol: 'TOMO',
    decimals: 18,
  },
  {
    chainId: 90,
    name: 'Garizon Stage0',
    symbol: 'GAR',
    decimals: 18,
  },
  {
    chainId: 91,
    name: 'Garizon Stage1',
    symbol: 'GAR',
    decimals: 18,
  },
  {
    chainId: 92,
    name: 'Garizon Stage2',
    symbol: 'GAR',
    decimals: 18,
  },
  {
    chainId: 93,
    name: 'Garizon Stage3',
    symbol: 'GAR',
    decimals: 18,
  },
  {
    chainId: 95,
    name: 'CryptoKylin Testnet',
    symbol: 'EOS',
    decimals: 18,
  },
  {
    chainId: 96,
    name: 'NEXT Smart Chain',
    symbol: 'NEXT',
    decimals: 18,
  },
  {
    chainId: 97,
    name: 'Binance Smart Chain Testnet',
    symbol: 'tBNB',
    decimals: 18,
  },
  {
    chainId: 99,
    name: 'POA Network Core',
    symbol: 'POA',
    decimals: 18,
  },
  {
    chainId: 100,
    name: 'Gnosis Chain (formerly xDai)',
    symbol: 'xDAI',
    decimals: 18,
  },
  {
    chainId: 101,
    name: 'EtherInc',
    symbol: 'ETI',
    decimals: 18,
  },
  {
    chainId: 102,
    name: 'Web3Games Testnet',
    symbol: 'W3G',
    decimals: 18,
  },
  {
    chainId: 106,
    name: 'Velas EVM Mainnet',
    symbol: 'VLX',
    decimals: 18,
  },
  {
    chainId: 107,
    name: 'Nebula Testnet',
    symbol: 'NBX',
    decimals: 18,
  },
  {
    chainId: 108,
    name: 'ThunderCore Mainnet',
    symbol: 'TT',
    decimals: 18,
  },
  {
    chainId: 110,
    name: 'Proton Testnet',
    symbol: 'XPR',
    decimals: 4,
  },
  {
    chainId: 111,
    name: 'EtherLite Chain',
    symbol: 'ETL',
    decimals: 18,
  },
  {
    chainId: 122,
    name: 'Fuse Mainnet',
    symbol: 'FUSE',
    decimals: 18,
  },
  {
    chainId: 123,
    name: 'Fuse Sparknet',
    symbol: 'SPARK',
    decimals: 18,
  },
  {
    chainId: 124,
    name: 'Decentralized Web Mainnet',
    symbol: 'DWU',
    decimals: 18,
  },
  {
    chainId: 125,
    name: 'OYchain Testnet',
    symbol: 'OY',
    decimals: 18,
  },
  {
    chainId: 126,
    name: 'OYchain Mainnet',
    symbol: 'OY',
    decimals: 18,
  },
  {
    chainId: 127,
    name: 'Factory 127 Mainnet',
    symbol: 'FETH',
    decimals: 18,
  },
  {
    chainId: 128,
    name: 'Huobi ECO Chain Mainnet',
    symbol: 'HT',
    decimals: 18,
  },
  {
    chainId: 137,
    name: 'Polygon Mainnet',
    symbol: 'MATIC',
    decimals: 18,
    wethAddress: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  },
  {
    chainId: 142,
    name: 'DAX CHAIN',
    symbol: 'DAX',
    decimals: 18,
  },
  {
    chainId: 162,
    name: 'Lightstreams Testnet',
    symbol: 'PHT',
    decimals: 18,
  },
  {
    chainId: 163,
    name: 'Lightstreams Mainnet',
    symbol: 'PHT',
    decimals: 18,
  },
  {
    chainId: 170,
    name: 'HOO Smart Chain Testnet',
    symbol: 'HOO',
    decimals: 18,
  },
  {
    chainId: 172,
    name: 'Latam-Blockchain Resil Testnet',
    symbol: 'usd',
    decimals: 18,
  },
  {
    chainId: 186,
    name: 'Seele Mainnet',
    symbol: 'Seele',
    decimals: 18,
  },
  {
    chainId: 188,
    name: 'BMC Mainnet',
    symbol: 'BTM',
    decimals: 18,
  },
  {
    chainId: 189,
    name: 'BMC Testnet',
    symbol: 'BTM',
    decimals: 18,
  },
  {
    chainId: 199,
    name: 'BitTorrent Chain Mainnet',
    symbol: 'BTT',
    decimals: 18,
  },
  {
    chainId: 200,
    name: 'Arbitrum on xDai',
    symbol: 'xDAI',
    decimals: 18,
  },
  {
    chainId: 211,
    name: 'Freight Trust Network',
    symbol: '0xF',
    decimals: 18,
  },
  {
    chainId: 222,
    name: 'Permission',
    symbol: 'ASK',
    decimals: 18,
  },
  {
    chainId: 246,
    name: 'Energy Web Chain',
    symbol: 'EWT',
    decimals: 18,
  },
  {
    chainId: 250,
    name: 'Fantom Opera',
    symbol: 'FTM',
    decimals: 18,
  },
  {
    chainId: 256,
    name: 'Huobi ECO Chain Testnet',
    symbol: 'htt',
    decimals: 18,
  },
  {
    chainId: 258,
    name: 'Setheum',
    symbol: 'SETM',
    decimals: 18,
  },
  {
    chainId: 262,
    name: 'SUR Blockchain Network',
    symbol: 'SRN',
    decimals: 18,
  },
  {
    chainId: 269,
    name: 'High Performance Blockchain',
    symbol: 'HPB',
    decimals: 18,
  },
  {
    chainId: 288,
    name: 'Boba Network',
    symbol: 'ETH',
    decimals: 18,
  },
  {
    chainId: 321,
    name: 'KCC Mainnet',
    symbol: 'KCS',
    decimals: 18,
  },
  {
    chainId: 322,
    name: 'KCC Testnet',
    symbol: 'tKCS',
    decimals: 18,
  },
  {
    chainId: 333,
    name: 'Web3Q Mainnet',
    symbol: 'W3Q',
    decimals: 18,
  },
  {
    chainId: 336,
    name: 'Shiden',
    symbol: 'SDN',
    decimals: 18,
  },
  {
    chainId: 338,
    name: 'Cronos Testnet',
    symbol: 'TCRO',
    decimals: 18,
  },
  {
    chainId: 361,
    name: 'Theta Mainnet',
    symbol: 'TFUEL',
    decimals: 18,
  },
  {
    chainId: 363,
    name: 'Theta Sapphire Testnet',
    symbol: 'TFUEL',
    decimals: 18,
  },
  {
    chainId: 364,
    name: 'Theta Amber Testnet',
    symbol: 'TFUEL',
    decimals: 18,
  },
  {
    chainId: 365,
    name: 'Theta Testnet',
    symbol: 'TFUEL',
    decimals: 18,
  },
  {
    chainId: 369,
    name: 'PulseChain Mainnet',
    symbol: 'PLS',
    decimals: 18,
  },
  {
    chainId: 385,
    name: 'Lisinski',
    symbol: 'LISINSKI',
    decimals: 18,
  },
  {
    chainId: 420,
    name: 'Optimistic Ethereum Testnet Goerli',
    symbol: 'GOR',
    decimals: 18,
  },
  {
    chainId: 499,
    name: 'Rupaya',
    symbol: 'RUPX',
    decimals: 18,
  },
  {
    chainId: 512,
    name: 'Double-A Chain Mainnet',
    symbol: 'AAC',
    decimals: 18,
  },
  {
    chainId: 513,
    name: 'Double-A Chain Testnet',
    symbol: 'AAC',
    decimals: 18,
  },
  {
    chainId: 555,
    name: 'Vela1 Chain Mainnet',
    symbol: 'CLASS',
    decimals: 18,
  },
  {
    chainId: 558,
    name: 'Tao Network',
    symbol: 'TAO',
    decimals: 18,
  },
  {
    chainId: 588,
    name: 'Metis Stardust Testnet',
    symbol: 'METIS',
    decimals: 18,
  },
  {
    chainId: 595,
    name: 'Acala Mandala Testnet',
    symbol: 'mACA',
    decimals: 18,
  },
  {
    chainId: 600,
    name: 'Meshnyan testnet',
    symbol: 'MESHT',
    decimals: 18,
  },
  {
    chainId: 666,
    name: 'Pixie Chain Testnet',
    symbol: 'PCTT',
    decimals: 18,
  },
  {
    chainId: 686,
    name: 'Karura Network',
    symbol: 'KAR',
    decimals: 18,
  },
  {
    chainId: 707,
    name: 'BlockChain Station Mainnet',
    symbol: 'BCS',
    decimals: 18,
  },
  {
    chainId: 708,
    name: 'BlockChain Station Testnet',
    symbol: 'tBCS',
    decimals: 18,
  },
  {
    chainId: 721,
    name: 'Factory 127 Testnet',
    symbol: 'FETH',
    decimals: 18,
  },
  {
    chainId: 777,
    name: 'cheapETH',
    symbol: 'cTH',
    decimals: 18,
  },
  {
    chainId: 787,
    name: 'Acala Network',
    symbol: 'ACA',
    decimals: 18,
  },
  {
    chainId: 803,
    name: 'Haic',
    symbol: 'HAIC',
    decimals: 18,
  },
  {
    chainId: 820,
    name: 'Callisto Mainnet',
    symbol: 'CLO',
    decimals: 18,
  },
  {
    chainId: 821,
    name: 'Callisto Testnet',
    symbol: 'TCLO',
    decimals: 18,
  },
  {
    chainId: 880,
    name: 'Ambros Chain Mainnet',
    symbol: 'AMBR',
    decimals: 18,
  },
  {
    chainId: 888,
    name: 'Wanchain',
    symbol: 'WAN',
    decimals: 18,
  },
  {
    chainId: 900,
    name: 'Garizon Testnet Stage0',
    symbol: 'GAR',
    decimals: 18,
  },
  {
    chainId: 901,
    name: 'Garizon Testnet Stage1',
    symbol: 'GAR',
    decimals: 18,
  },
  {
    chainId: 902,
    name: 'Garizon Testnet Stage2',
    symbol: 'GAR',
    decimals: 18,
  },
  {
    chainId: 903,
    name: 'Garizon Testnet Stage3',
    symbol: 'GAR',
    decimals: 18,
  },
  {
    chainId: 940,
    name: 'PulseChain Testnet',
    symbol: 'tPLS',
    decimals: 18,
  },
  {
    chainId: 941,
    name: 'PulseChain Testnet v2b',
    symbol: 'tPLS',
    decimals: 18,
  },
  {
    chainId: 942,
    name: 'PulseChain Testnet v3',
    symbol: 'tPLS',
    decimals: 18,
  },
  {
    chainId: 977,
    name: 'Nepal Blockchain Network',
    symbol: 'YETI',
    decimals: 18,
  },
  {
    chainId: 998,
    name: 'Lucky Network',
    symbol: 'L99',
    decimals: 18,
  },
  {
    chainId: 999,
    name: 'Wanchain Testnet',
    symbol: 'WAN',
    decimals: 18,
  },
  {
    chainId: 1001,
    name: 'Klaytn Testnet Baobab',
    symbol: 'KLAY',
    decimals: 18,
  },
  {
    chainId: 1007,
    name: 'Newton Testnet',
    symbol: 'NEW',
    decimals: 18,
  },
  {
    chainId: 1010,
    name: 'Evrice Network',
    symbol: 'EVC',
    decimals: 18,
  },
  {
    chainId: 1012,
    name: 'Newton',
    symbol: 'NEW',
    decimals: 18,
  },
  {
    chainId: 1022,
    name: 'Sakura',
    symbol: 'SKU',
    decimals: 18,
  },
  {
    chainId: 1023,
    name: 'Clover Testnet',
    symbol: 'CLV',
    decimals: 18,
  },
  {
    chainId: 1024,
    name: 'Clover Mainnet',
    symbol: 'CLV',
    decimals: 18,
  },
  {
    chainId: 1028,
    name: 'BitTorrent Chain Testnet',
    symbol: 'BTT',
    decimals: 18,
  },
  {
    chainId: 1030,
    name: 'Conflux eSpace',
    symbol: 'CFX',
    decimals: 18,
  },
  {
    chainId: 1088,
    name: 'Metis Andromeda Mainnet',
    symbol: 'METIS',
    decimals: 18,
  },
  {
    chainId: 1139,
    name: 'MathChain',
    symbol: 'MATH',
    decimals: 18,
  },
  {
    chainId: 1140,
    name: 'MathChain Testnet',
    symbol: 'MATH',
    decimals: 18,
  },
  {
    chainId: 1197,
    name: 'Iora Chain',
    symbol: 'IORA',
    decimals: 18,
  },
  {
    chainId: 1201,
    name: 'Evanesco Testnet',
    symbol: 'AVIS',
    decimals: 18,
  },
  {
    chainId: 1202,
    name: 'World Trade Technical Chain Mainnet',
    symbol: 'WTT',
    decimals: 18,
  },
  {
    chainId: 1213,
    name: 'Popcateum Mainnet',
    symbol: 'POP',
    decimals: 18,
  },
  {
    chainId: 1214,
    name: 'EnterChain Mainnet',
    symbol: 'ENTER',
    decimals: 18,
  },
  {
    chainId: 1280,
    name: 'HALO Mainnet',
    symbol: 'HO',
    decimals: 18,
  },
  {
    chainId: 1284,
    name: 'Moonbeam',
    symbol: 'GLMR',
    decimals: 18,
  },
  {
    chainId: 1285,
    name: 'Moonriver',
    symbol: 'MOVR',
    decimals: 18,
  },
  {
    chainId: 1287,
    name: 'Moonbase Alpha',
    symbol: 'DEV',
    decimals: 18,
  },
  {
    chainId: 1288,
    name: 'Moonrock',
    symbol: 'ROC',
    decimals: 18,
  },
  {
    chainId: 1618,
    name: 'Catecoin Chain Mainnet',
    symbol: 'CATE',
    decimals: 18,
  },
  {
    chainId: 1620,
    name: 'Atheios',
    symbol: 'ATH',
    decimals: 18,
  },
  {
    chainId: 1657,
    name: 'Btachain',
    symbol: 'BTA',
    decimals: 18,
  },
  {
    chainId: 1856,
    name: 'Teslafunds',
    symbol: 'TSF',
    decimals: 18,
  },
  {
    chainId: 1987,
    name: 'EtherGem',
    symbol: 'EGEM',
    decimals: 18,
  },
  {
    chainId: 2020,
    name: '420coin',
    symbol: '420',
    decimals: 18,
  },
  {
    chainId: 2021,
    name: 'Edgeware Mainnet',
    symbol: 'EDG',
    decimals: 18,
  },
  {
    chainId: 2022,
    name: 'Beresheet Testnet',
    symbol: 'tEDG',
    decimals: 18,
  },
  {
    chainId: 2025,
    name: 'Rangers Protocol Mainnet',
    symbol: 'RPG',
    decimals: 18,
  },
  {
    chainId: 2100,
    name: 'Ecoball Mainnet',
    symbol: 'ECO',
    decimals: 18,
  },
  {
    chainId: 2101,
    name: 'Ecoball Testnet Espuma',
    symbol: 'ECO',
    decimals: 18,
  },
  {
    chainId: 2213,
    name: 'Evanesco Mainnet',
    symbol: 'EVA',
    decimals: 18,
  },
  {
    chainId: 2559,
    name: 'Kortho Mainnet',
    symbol: 'KTO',
    decimals: 11,
  },
  {
    chainId: 3331,
    name: 'ZCore Testnet',
    symbol: 'ZCR',
    decimals: 18,
  },
  {
    chainId: 3333,
    name: 'Web3Q Testnet',
    symbol: 'W3Q',
    decimals: 18,
  },
  {
    chainId: 3334,
    name: 'Web3Q Galileo',
    symbol: 'W3Q',
    decimals: 18,
  },
  {
    chainId: 3400,
    name: 'Paribu Net Mainnet',
    symbol: 'PRB',
    decimals: 18,
  },
  {
    chainId: 3500,
    name: 'Paribu Net Testnet',
    symbol: 'PRB',
    decimals: 18,
  },
  {
    chainId: 3690,
    name: 'Bittex Mainnet',
    symbol: 'BTX',
    decimals: 18,
  },
  {
    chainId: 3966,
    name: 'DYNO Mainnet',
    symbol: 'DYNO',
    decimals: 18,
  },
  {
    chainId: 3967,
    name: 'DYNO Testnet',
    symbol: 'tDYNO',
    decimals: 18,
  },
  {
    chainId: 4002,
    name: 'Fantom Testnet',
    symbol: 'FTM',
    decimals: 18,
  },
  {
    chainId: 4689,
    name: 'IoTeX Network Mainnet',
    symbol: 'IOTX',
    decimals: 18,
  },
  {
    chainId: 4690,
    name: 'IoTeX Network Testnet',
    symbol: 'IOTX',
    decimals: 18,
  },
  {
    chainId: 4918,
    name: 'Venidium Testnet',
    symbol: 'XVM',
    decimals: 18,
  },
  {
    chainId: 5197,
    name: 'EraSwap Mainnet',
    symbol: 'ES',
    decimals: 18,
  },
  {
    chainId: 5315,
    name: 'Uzmi Network Mainnet',
    symbol: 'UZMI',
    decimals: 18,
  },
  {
    chainId: 5700,
    name: 'Syscoin Tanenbaum Testnet',
    symbol: 'tSYS',
    decimals: 18,
  },
  {
    chainId: 5851,
    name: 'Ontology Testnet',
    symbol: 'ONG',
    decimals: 9,
  },
  {
    chainId: 5869,
    name: 'Wegochain Rubidium Mainnet',
    symbol: 'RBD',
    decimals: 18,
  },
  {
    chainId: 6626,
    name: 'Pixie Chain Mainnet',
    symbol: 'PIX',
    decimals: 18,
  },
  {
    chainId: 7341,
    name: 'Shyft Mainnet',
    symbol: 'SHYFT',
    decimals: 18,
  },
  {
    chainId: 7878,
    name: 'Hazlor Testnet',
    symbol: 'TSCAS',
    decimals: 18,
  },
  {
    chainId: 8000,
    name: 'Teleport',
    symbol: 'TELE',
    decimals: 18,
  },
  {
    chainId: 8001,
    name: 'Teleport Testnet',
    symbol: 'TELE',
    decimals: 18,
  },
  {
    chainId: 8029,
    name: 'MDGL Testnet',
    symbol: 'MDGLT',
    decimals: 18,
  },
  {
    chainId: 8080,
    name: 'GeneChain Adenine Testnet',
    symbol: 'tRNA',
    decimals: 18,
  },
  {
    chainId: 8217,
    name: 'Klaytn Mainnet Cypress',
    symbol: 'KLAY',
    decimals: 18,
  },
  {
    chainId: 8285,
    name: 'KorthoTest',
    symbol: 'KTO',
    decimals: 11,
  },
  {
    chainId: 8723,
    name: 'TOOL Global Mainnet',
    symbol: 'OLO',
    decimals: 18,
  },
  {
    chainId: 8724,
    name: 'TOOL Global Testnet',
    symbol: 'OLO',
    decimals: 18,
  },
  {
    chainId: 8888,
    name: 'Ambros Chain Testnet',
    symbol: 'AMBR',
    decimals: 18,
  },
  {
    chainId: 8995,
    name: 'bloxberg',
    symbol: 'U+25B3',
    decimals: 18,
  },
  {
    chainId: 9000,
    name: 'Evmos Testnet',
    symbol: 'tEVMOS',
    decimals: 18,
  },
  {
    chainId: 9001,
    name: 'Evmos',
    symbol: 'EVMOS',
    decimals: 18,
  },
  {
    chainId: 9100,
    name: 'Genesis Coin',
    symbol: 'GNC',
    decimals: 18,
  },
  {
    chainId: 9527,
    name: 'Rangers Protocol Testnet Robin',
    symbol: 'tRPG',
    decimals: 18,
  },
  {
    chainId: 9999,
    name: 'myOwn Testnet',
    symbol: 'MYN',
    decimals: 18,
  },
  {
    chainId: 10000,
    name: 'Smart Bitcoin Cash',
    symbol: 'BCH',
    decimals: 18,
  },
  {
    chainId: 10001,
    name: 'Smart Bitcoin Cash Testnet',
    symbol: 'BCHT',
    decimals: 18,
  },
  {
    chainId: 10101,
    name: 'Blockchain Genesis Mainnet',
    symbol: 'GEN',
    decimals: 18,
  },
  {
    chainId: 10823,
    name: 'CryptoCoinPay',
    symbol: 'CCP',
    decimals: 18,
  },
  {
    chainId: 11111,
    name: 'WAGMI',
    symbol: 'WGM',
    decimals: 18,
  },
  {
    chainId: 11437,
    name: 'Shyft Testnet',
    symbol: 'SHYFTT',
    decimals: 18,
  },
  {
    chainId: 12051,
    name: 'Singularity ZERO Testnet',
    symbol: 'tZERO',
    decimals: 18,
  },
  {
    chainId: 12052,
    name: 'Singularity ZERO Mainnet',
    symbol: 'ZERO',
    decimals: 18,
  },
  {
    chainId: 13381,
    name: 'Phoenix Mainnet',
    symbol: 'PHX',
    decimals: 18,
  },
  {
    chainId: 16000,
    name: 'MetaDot Mainnet',
    symbol: 'MTT',
    decimals: 18,
  },
  {
    chainId: 16001,
    name: 'MetaDot Testnet',
    symbol: 'MTT-test',
    decimals: 18,
  },
  {
    chainId: 19845,
    name: 'BTCIX Network',
    symbol: 'BTCIX',
    decimals: 18,
  },
  {
    chainId: 21816,
    name: 'omChain Mainnet',
    symbol: 'OML',
    decimals: 18,
  },
  {
    chainId: 24484,
    name: 'Webchain',
    symbol: 'WEB',
    decimals: 18,
  },
  {
    chainId: 24734,
    name: 'MintMe.com Coin',
    symbol: 'MINTME',
    decimals: 18,
  },
  {
    chainId: 31102,
    name: 'Ethersocial Network',
    symbol: 'ESN',
    decimals: 18,
  },
  {
    chainId: 31337,
    name: 'GoChain Testnet',
    symbol: 'GO',
    decimals: 18,
  },
  {
    chainId: 32659,
    name: 'Fusion Mainnet',
    symbol: 'FSN',
    decimals: 18,
  },
  {
    chainId: 39797,
    name: 'Energi Mainnet',
    symbol: 'NRG',
    decimals: 18,
  },
  {
    chainId: 42069,
    name: 'pegglecoin',
    symbol: 'peggle',
    decimals: 18,
  },
  {
    chainId: 42161,
    name: 'Arbitrum One',
    symbol: 'ETH',
    decimals: 18,
    wethAddress: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  },
  {
    chainId: 42220,
    name: 'Celo Mainnet',
    symbol: 'CELO',
    decimals: 18,
  },
  {
    chainId: 42261,
    name: 'Emerald Paratime Testnet',
    symbol: 'ROSE',
    decimals: 18,
  },
  {
    chainId: 42262,
    name: 'Emerald Paratime Mainnet',
    symbol: 'ROSE',
    decimals: 18,
  },
  {
    chainId: 43110,
    name: 'Athereum',
    symbol: 'ATH',
    decimals: 18,
  },
  {
    chainId: 43113,
    name: 'Avalanche Fuji Testnet',
    symbol: 'AVAX',
    decimals: 18,
  },
  {
    chainId: 43114,
    name: 'Avalanche C-Chain',
    symbol: 'AVAX',
    decimals: 18,
  },
  {
    chainId: 44787,
    name: 'Celo Alfajores Testnet',
    symbol: 'CELO',
    decimals: 18,
  },
  {
    chainId: 47805,
    name: 'REI Network',
    symbol: 'REI',
    decimals: 18,
  },
  {
    chainId: 49797,
    name: 'Energi Testnet',
    symbol: 'NRG',
    decimals: 18,
  },
  {
    chainId: 55555,
    name: 'REI Chain Mainnet',
    symbol: 'REI',
    decimals: 18,
  },
  {
    chainId: 55556,
    name: 'REI Chain Testnet',
    symbol: 'tREI',
    decimals: 18,
  },
  {
    chainId: 60000,
    name: 'Thinkium Testnet Chain 0',
    symbol: 'TKM',
    decimals: 18,
  },
  {
    chainId: 60001,
    name: 'Thinkium Testnet Chain 1',
    symbol: 'TKM',
    decimals: 18,
  },
  {
    chainId: 60002,
    name: 'Thinkium Testnet Chain 2',
    symbol: 'TKM',
    decimals: 18,
  },
  {
    chainId: 60103,
    name: 'Thinkium Testnet Chain 103',
    symbol: 'TKM',
    decimals: 18,
  },
  {
    chainId: 62320,
    name: 'Celo Baklava Testnet',
    symbol: 'CELO',
    decimals: 18,
  },
  {
    chainId: 63000,
    name: 'eCredits Mainnet',
    symbol: 'ECS',
    decimals: 18,
  },
  {
    chainId: 63001,
    name: 'eCredits Testnet',
    symbol: 'ECS',
    decimals: 18,
  },
  {
    chainId: 70000,
    name: 'Thinkium Mainnet Chain 0',
    symbol: 'TKM',
    decimals: 18,
  },
  {
    chainId: 70001,
    name: 'Thinkium Mainnet Chain 1',
    symbol: 'TKM',
    decimals: 18,
  },
  {
    chainId: 70002,
    name: 'Thinkium Mainnet Chain 2',
    symbol: 'TKM',
    decimals: 18,
  },
  {
    chainId: 70103,
    name: 'Thinkium Mainnet Chain 103',
    symbol: 'TKM',
    decimals: 18,
  },
  {
    chainId: 71393,
    name: 'Polyjuice Testnet',
    symbol: 'CKB',
    decimals: 8,
  },
  {
    chainId: 73799,
    name: 'Energy Web Volta Testnet',
    symbol: 'VT',
    decimals: 18,
  },
  {
    chainId: 78110,
    name: 'Firenze test network',
    symbol: 'FIN',
    decimals: 18,
  },
  {
    chainId: 80001,
    name: 'Mumbai',
    symbol: 'MATIC',
    decimals: 18,
    wethAddress: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
  },
  {
    chainId: 99998,
    name: 'UB Smart Chain(testnet)',
    symbol: 'UBC',
    decimals: 18,
  },
  {
    chainId: 99999,
    name: 'UB Smart Chain',
    symbol: 'UBC',
    decimals: 18,
  },
  {
    chainId: 100000,
    name: 'QuarkChain Mainnet Root',
    symbol: 'QKC',
    decimals: 18,
  },
  {
    chainId: 100001,
    name: 'QuarkChain Mainnet Shard 0',
    symbol: 'QKC',
    decimals: 18,
  },
  {
    chainId: 100002,
    name: 'QuarkChain Mainnet Shard 1',
    symbol: 'QKC',
    decimals: 18,
  },
  {
    chainId: 100003,
    name: 'QuarkChain Mainnet Shard 2',
    symbol: 'QKC',
    decimals: 18,
  },
  {
    chainId: 100004,
    name: 'QuarkChain Mainnet Shard 3',
    symbol: 'QKC',
    decimals: 18,
  },
  {
    chainId: 100005,
    name: 'QuarkChain Mainnet Shard 4',
    symbol: 'QKC',
    decimals: 18,
  },
  {
    chainId: 100006,
    name: 'QuarkChain Mainnet Shard 5',
    symbol: 'QKC',
    decimals: 18,
  },
  {
    chainId: 100007,
    name: 'QuarkChain Mainnet Shard 6',
    symbol: 'QKC',
    decimals: 18,
  },
  {
    chainId: 100008,
    name: 'QuarkChain Mainnet Shard 7',
    symbol: 'QKC',
    decimals: 18,
  },
  {
    chainId: 108801,
    name: 'BROChain Mainnet',
    symbol: 'BRO',
    decimals: 18,
  },
  {
    chainId: 110000,
    name: 'QuarkChain Devnet Root',
    symbol: 'QKC',
    decimals: 18,
  },
  {
    chainId: 110001,
    name: 'QuarkChain Devnet Shard 0',
    symbol: 'QKC',
    decimals: 18,
  },
  {
    chainId: 110002,
    name: 'QuarkChain Devnet Shard 1',
    symbol: 'QKC',
    decimals: 18,
  },
  {
    chainId: 110003,
    name: 'QuarkChain Devnet Shard 2',
    symbol: 'QKC',
    decimals: 18,
  },
  {
    chainId: 110004,
    name: 'QuarkChain Devnet Shard 3',
    symbol: 'QKC',
    decimals: 18,
  },
  {
    chainId: 110005,
    name: 'QuarkChain Devnet Shard 4',
    symbol: 'QKC',
    decimals: 18,
  },
  {
    chainId: 110006,
    name: 'QuarkChain Devnet Shard 5',
    symbol: 'QKC',
    decimals: 18,
  },
  {
    chainId: 110007,
    name: 'QuarkChain Devnet Shard 6',
    symbol: 'QKC',
    decimals: 18,
  },
  {
    chainId: 110008,
    name: 'QuarkChain Devnet Shard 7',
    symbol: 'QKC',
    decimals: 18,
  },
  {
    chainId: 200625,
    name: 'Akroma',
    symbol: 'AKA',
    decimals: 18,
  },
  {
    chainId: 201018,
    name: 'Alaya Mainnet',
    symbol: 'atp',
    decimals: 18,
  },
  {
    chainId: 201030,
    name: 'Alaya Dev Testnet',
    symbol: 'atp',
    decimals: 18,
  },
  {
    chainId: 210309,
    name: 'PlatON Dev Testnet',
    symbol: 'lat',
    decimals: 18,
  },
  {
    chainId: 210425,
    name: 'PlatON Mainnet',
    symbol: 'lat',
    decimals: 18,
  },
  {
    chainId: 234666,
    name: 'Haymo Testnet',
    symbol: 'HYM',
    decimals: 18,
  },
  {
    chainId: 246529,
    name: 'ARTIS sigma1',
    symbol: 'ATS',
    decimals: 18,
  },
  {
    chainId: 246785,
    name: 'ARTIS Testnet tau1',
    symbol: 'tATS',
    decimals: 18,
  },
  {
    chainId: 281121,
    name: 'Social Smart Chain Mainnet',
    symbol: '$OC',
    decimals: 18,
  },
  {
    chainId: 333888,
    name: 'Polis Testnet',
    symbol: 'tPOLIS',
    decimals: 18,
  },
  {
    chainId: 333999,
    name: 'Polis Mainnet',
    symbol: 'POLIS',
    decimals: 18,
  },
  {
    chainId: 421611,
    name: 'Arbitrum Rinkeby',
    symbol: 'ARETH',
    decimals: 18,
    wethAddress: '0xB47e6A5f8b33b3F17603C83a0535A9dcD7E32681',
  },
  {
    chainId: 444900,
    name: 'Weelink Testnet',
    symbol: 'tWLK',
    decimals: 18,
  },
  {
    chainId: 666666,
    name: 'Vision - Vpioneer Test Chain',
    symbol: 'VS',
    decimals: 18,
  },
  {
    chainId: 888888,
    name: 'Vision - Mainnet',
    symbol: 'VS',
    decimals: 18,
  },
  {
    chainId: 955305,
    name: 'Eluvio Content Fabric',
    symbol: 'ELV',
    decimals: 18,
  },
  {
    chainId: 1313114,
    name: 'Etho Protocol',
    symbol: 'ETHO',
    decimals: 18,
  },
  {
    chainId: 1313500,
    name: 'Xerom',
    symbol: 'XERO',
    decimals: 18,
  },
  {
    chainId: 1337702,
    name: 'Kintsugi',
    symbol: 'kiETH',
    decimals: 18,
  },
  {
    chainId: 7762959,
    name: 'Musicoin',
    symbol: 'MUSIC',
    decimals: 18,
  },
  {
    chainId: 11155111,
    name: 'Sepolia',
    symbol: 'SEP',
    decimals: 18,
  },
  {
    chainId: 13371337,
    name: 'PepChain Churchill',
    symbol: 'TPEP',
    decimals: 18,
  },
  {
    chainId: 18289463,
    name: 'IOLite',
    symbol: 'ILT',
    decimals: 18,
  },
  {
    chainId: 20181205,
    name: 'quarkblockchain',
    symbol: 'QKI',
    decimals: 18,
  },
  {
    chainId: 28945486,
    name: 'Auxilium Network Mainnet',
    symbol: 'AUX',
    decimals: 18,
  },
  {
    chainId: 35855456,
    name: 'Joys Digital Mainnet',
    symbol: 'JOYS',
    decimals: 18,
  },
  {
    chainId: 61717561,
    name: 'Aquachain',
    symbol: 'AQUA',
    decimals: 18,
  },
  {
    chainId: 99415706,
    name: 'Joys Digital TestNet',
    symbol: 'TOYS',
    decimals: 18,
  },
  {
    chainId: 192837465,
    name: 'Gather Mainnet Network',
    symbol: 'GTH',
    decimals: 18,
  },
  {
    chainId: 245022926,
    name: 'Neon EVM DevNet',
    symbol: 'NEON',
    decimals: 18,
  },
  {
    chainId: 245022934,
    name: 'Neon EVM MainNet',
    symbol: 'NEON',
    decimals: 18,
  },
  {
    chainId: 245022940,
    name: 'Neon EVM TestNet',
    symbol: 'NEON',
    decimals: 18,
  },
  {
    chainId: 311752642,
    name: 'OneLedger Mainnet',
    symbol: 'OLT',
    decimals: 18,
  },
  {
    chainId: 356256156,
    name: 'Gather Tesnet Network',
    symbol: 'GTH',
    decimals: 18,
  },
  {
    chainId: 486217935,
    name: 'Gather Devnet Network',
    symbol: 'GTH',
    decimals: 18,
  },
  {
    chainId: 1122334455,
    name: 'IPOS Network',
    symbol: 'IPOS',
    decimals: 18,
  },
  {
    chainId: 1313161554,
    name: 'Aurora Mainnet',
    symbol: 'ETH',
    decimals: 18,
  },
  {
    chainId: 1313161555,
    name: 'Aurora Testnet',
    symbol: 'ETH',
    decimals: 18,
  },
  {
    chainId: 1313161556,
    name: 'Aurora Betanet',
    symbol: 'ETH',
    decimals: 18,
  },
  {
    chainId: 1666600000,
    name: 'Harmony Mainnet Shard 0',
    symbol: 'ONE',
    decimals: 18,
  },
  {
    chainId: 1666600001,
    name: 'Harmony Mainnet Shard 1',
    symbol: 'ONE',
    decimals: 18,
  },
  {
    chainId: 1666600002,
    name: 'Harmony Mainnet Shard 2',
    symbol: 'ONE',
    decimals: 18,
  },
  {
    chainId: 1666600003,
    name: 'Harmony Mainnet Shard 3',
    symbol: 'ONE',
    decimals: 18,
  },
  {
    chainId: 1666700000,
    name: 'Harmony Testnet Shard 0',
    symbol: 'ONE',
    decimals: 18,
  },
  {
    chainId: 1666700001,
    name: 'Harmony Testnet Shard 1',
    symbol: 'ONE',
    decimals: 18,
  },
  {
    chainId: 1666700002,
    name: 'Harmony Testnet Shard 2',
    symbol: 'ONE',
    decimals: 18,
  },
  {
    chainId: 1666700003,
    name: 'Harmony Testnet Shard 3',
    symbol: 'ONE',
    decimals: 18,
  },
  {
    chainId: 2021121117,
    name: 'DataHopper',
    symbol: 'HOP',
    decimals: 18,
  },
  {
    chainId: 3125659152,
    name: 'Pirl',
    symbol: 'PIRL',
    decimals: 18,
  },
  {
    chainId: 4216137055,
    name: 'OneLedger Testnet Frankenstein',
    symbol: 'OLT',
    decimals: 18,
  },
  {
    chainId: 11297108099,
    name: 'Palm Testnet',
    symbol: 'PALM',
    decimals: 18,
  },
  {
    chainId: 11297108109,
    name: 'Palm',
    symbol: 'PALM',
    decimals: 18,
  },
  {
    chainId: 197710212030,
    name: 'Ntity Mainnet',
    symbol: 'NTT',
    decimals: 18,
  },
  {
    chainId: 197710212031,
    name: 'Haradev Testnet',
    symbol: 'NTTH',
    decimals: 18,
  },
  {
    chainId: 6022140761023,
    name: 'Molereum Network',
    symbol: 'MOLE',
    decimals: 18,
  },
];
