import { PoolCategory, PoolConfig, QuoteToken } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    tokenName: 'CAKE',
    stakingTokenName: QuoteToken.SALT,
    stakingTokenAddress: {
      97: '0x85582d24455caaf44fc4f914bdca2a6cb73e6681',
      56: '0x2849b1aE7E04A3D9Bc288673A92477CF63F28aF4', // SALT
    },
    contractAddress: {
      97: '0x9FcA113B2D4E64462229E107A8F4Aa7359D055F5',
      56: '0xfC2BA5B6Ec7A5Fe68546fC8fB55A915b5CA5E261', // SmartChef
    },
    rewardTokenAddress: {
      97: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee', // BUSD, didnt find CAKE
      56: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', // CAKE
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://pancakeswap.finance/',
    harvest: true,
    tokenPerBlock: '0.00295',
    sortOrder: 1,
    isFinished: true,
    tokenDecimals: 18,
    burnFee: 0,
  },
  {
    sousId: 1,
    tokenName: 'WBNB',
    stakingTokenName: QuoteToken.SALT,
    stakingTokenAddress: {
      97: '0x85582d24455caaf44fc4f914bdca2a6cb73e6681',
      56: '0x2849b1aE7E04A3D9Bc288673A92477CF63F28aF4', // SALT
    },
    contractAddress: {
      97: '0xF08d05d91426A63aB35Ef7f4bBC6E8717B59e838',
      56: '0x8eAFF0bF4C7e8a9aA3cFe13e2B4533D23251fdaF', // SmartChef
    },
    rewardTokenAddress: {
      97: '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867', // DAI, didnt had WBNB
      56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // WBNB
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://binance.com/',
    harvest: true,
    tokenPerBlock: '0.0001736111111',
    sortOrder: 2,
    isFinished: true,
    tokenDecimals: 18,
    burnFee: 0,
  },
  {
    sousId: 2,
    tokenName: 'SLME',
    stakingTokenName: QuoteToken.SALT,
    stakingTokenAddress: {
      97: '0x85582d24455caaf44fc4f914bdca2a6cb73e6681',
      56: '0x2849b1aE7E04A3D9Bc288673A92477CF63F28aF4', // SALT
    },
    contractAddress: {
      97: '0xF08d05d91426A63aB35Ef7f4bBC6E8717B59e838',
      56: '0xFC4A74E326F34dA2954F8B0De39A759e14B5472f', // SmartChef
    },
    rewardTokenAddress: {
      97: '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867', // DAI, didnt had SLIME
      56: '0x4fcfa6cc8914ab455b5b33df916d90bfe70b6ab1', // SLIME
    },
    poolCategory: PoolCategory.COMMUNITY,
    projectLink: 'https://slime.finance/',
    harvest: true,
    tokenPerBlock: '0.00496031746',
    sortOrder: 3,
    isFinished: true,
    tokenDecimals: 18,
    burnFee: 0,
  },
  {
    sousId: 3,
    tokenName: 'BUSD',
    stakingTokenName: QuoteToken.SALT,
    stakingTokenAddress: {
      97: '0x85582d24455caaf44fc4f914bdca2a6cb73e6681',
      56: '0x2849b1aE7E04A3D9Bc288673A92477CF63F28aF4', // SALT
    },
    contractAddress: {
      97: '0xF08d05d91426A63aB35Ef7f4bBC6E8717B59e838',
      56: '0x1495989d4592c7e94fe1E9448A172894f179956E', // SmartChef
    },
    rewardTokenAddress: {
      97: '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867', // DAI
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56', // BUSD
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://binance.com/',
    harvest: true,
    tokenPerBlock: '0.694',
    sortOrder: 4,
    isFinished: true,
    tokenDecimals: 18,
    burnFee: 0,
  },
  {
    sousId: 4,
    tokenName: 'EGG',
    stakingTokenName: QuoteToken.SALT,
    stakingTokenAddress: {
      97: '0x85582d24455caaf44fc4f914bdca2a6cb73e6681',
      56: '0x2849b1aE7E04A3D9Bc288673A92477CF63F28aF4', // SALT
    },
    contractAddress: {
      97: '0xF08d05d91426A63aB35Ef7f4bBC6E8717B59e838',
      56: '0x2974b4aECbEc5FFEA565E7Ef47395429f44D0c81', // SmartChef
    },
    rewardTokenAddress: {
      97: '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867', // DAI
      56: '0xf952fc3ca7325cc27d15885d37117676d25bfda6', // EGG
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://goosedefi.com',
    harvest: true,
    tokenPerBlock: '0.002624734287',
    sortOrder: 5,
    isFinished: true,
    tokenDecimals: 18,
    burnFee: 0,
  },
  {
    sousId: 5,
    tokenName: 'BREW',
    stakingTokenName: QuoteToken.SALT,
    stakingTokenAddress: {
      97: '0x85582d24455caaf44fc4f914bdca2a6cb73e6681',
      56: '0x2849b1aE7E04A3D9Bc288673A92477CF63F28aF4', // SALT
    },
    contractAddress: {
      97: '0xF08d05d91426A63aB35Ef7f4bBC6E8717B59e838',
      56: '0x88d2fb892c9577Ecb542EF6860AF13524e668b02', // SmartChef
    },
    rewardTokenAddress: {
      97: '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867', // DAI
      56: '0x790be81c3ca0e53974be2688cdb954732c9862e1', // BREW
    },
    poolCategory: PoolCategory.COMMUNITY,
    projectLink: 'https://cafeswap.finance/',
    harvest: true,
    tokenPerBlock: '0.005006944444',
    sortOrder: 6,
    isFinished: false,
    tokenDecimals: 18,
    burnFee: 0,
  },
  {
    sousId: 6,
    tokenName: 'BUSD',
    stakingTokenName: QuoteToken.SALT,
    stakingTokenAddress: {
      97: '0x85582d24455caaf44fc4f914bdca2a6cb73e6681',
      56: '0x2849b1aE7E04A3D9Bc288673A92477CF63F28aF4', // SALT
    },
    contractAddress: {
      97: '0xF08d05d91426A63aB35Ef7f4bBC6E8717B59e838',
      56: '0x36e3BC1E58B409160A191784E21327ACA6AcBc5C', // SmartChef
    },
    rewardTokenAddress: {
      97: '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867', // DAI
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56', // BUSD
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://binance.com/',
    harvest: true,
    tokenPerBlock: '0.3863194444',
    sortOrder: 7,
    isFinished: true,
    tokenDecimals: 18,
    burnFee: 5,
  },
  {
    sousId: 7,
    tokenName: 'BTCB',
    stakingTokenName: QuoteToken.SALT,
    stakingTokenAddress: {
      97: '0x85582d24455caaf44fc4f914bdca2a6cb73e6681',
      56: '0x2849b1aE7E04A3D9Bc288673A92477CF63F28aF4', // SALT
    },
    contractAddress: {
      97: '0xF08d05d91426A63aB35Ef7f4bBC6E8717B59e838',
      56: '0xe2f75e1e327331c41a206D187f4D08F75FA9bF17', // SmartChef
    },
    rewardTokenAddress: {
      97: '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867', // DAI
      56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c', // BTCB
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://binance.com/',
    harvest: true,
    tokenPerBlock: '0.000006944444444',
    sortOrder: 8,
    isFinished: true,
    tokenDecimals: 18,
    burnFee: 5,
  },
  {
    sousId: 8,
    tokenName: 'CTC',
    stakingTokenName: QuoteToken.SALT,
    stakingTokenAddress: {
      97: '0xa0286abcdf5ac136cdbea4fecea0f83c093e5107',
      56: '0x2849b1aE7E04A3D9Bc288673A92477CF63F28aF4', // SALT
    },
    contractAddress: {
      97: '0xFD8fa2A7a5DebB757C1CDe08B113DF395A774160', // test ctc
      56: '0x85f27A63cFb4Dc5a36d7Eb5EF8620D343817e156', // SmartChef
    },
    rewardTokenAddress: {
      97: '0xAA8Af527961533Ba61CeF965ED750060d459a918', // FAKECTC
      56: '0xb7F80a74aaA4FD30a3EE7C03FDe3DC88e6002C12', // CTC
    },
    poolCategory: PoolCategory.COMMUNITY,
    projectLink: 'https://www.cryptocoinctc.org/',
    harvest: true,
    tokenPerBlock: '0.8680538',
    sortOrder: 9,
    isFinished: true,
    tokenDecimals: 8,
    burnFee: 0,
  },
  {
    sousId: 9,
    tokenName: 'BUSD',
    stakingTokenName: QuoteToken.SALT,
    stakingTokenAddress: {
      97: '0x85582d24455caaf44fc4f914bdca2a6cb73e6681',
      56: '0x2849b1aE7E04A3D9Bc288673A92477CF63F28aF4', // SALT
    },
    contractAddress: {
      97: '0xF08d05d91426A63aB35Ef7f4bBC6E8717B59e838',
      56: '0xc44E823f72f6d038BC255cD82A48B3942B00c2Ef', // SmartChef
    },
    rewardTokenAddress: {
      97: '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867', // DAI
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56', // BUSD
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://binance.com/',
    harvest: true,
    tokenPerBlock: '0.3863194444',
    sortOrder: 10,
    isFinished: false,
    tokenDecimals: 18,
    burnFee: 10,
  },
  {
    sousId: 10,
    tokenName: 'CTC',
    stakingTokenName: QuoteToken.SALT,
    stakingTokenAddress: {
      97: '0xa0286abcdf5ac136cdbea4fecea0f83c093e5107',
      56: '0x2849b1aE7E04A3D9Bc288673A92477CF63F28aF4', // SALT
    },
    contractAddress: {
      97: '0xFD8fa2A7a5DebB757C1CDe08B113DF395A774160', // test ctc
      56: '0xf1eFc9e49EB1805AEd72917a0479bddFB5560d32', // SmartChef
    },
    rewardTokenAddress: {
      97: '0xAA8Af527961533Ba61CeF965ED750060d459a918', // FAKECTC
      56: '0xb7F80a74aaA4FD30a3EE7C03FDe3DC88e6002C12', // CTC
    },
    poolCategory: PoolCategory.COMMUNITY,
    projectLink: 'https://www.cryptocoinctc.org/',
    harvest: true,
    tokenPerBlock: '0.8680538',
    sortOrder: 11,
    isFinished: false,
    tokenDecimals: 8,
    burnFee: 0,
  },
  {
    sousId: 11,
    tokenName: 'CAKE',
    stakingTokenName: QuoteToken.SALT,
    stakingTokenAddress: {
      97: '0x85582d24455caaf44fc4f914bdca2a6cb73e6681',
      56: '0x2849b1aE7E04A3D9Bc288673A92477CF63F28aF4', // SALT
    },
    contractAddress: {
      97: '0x9FcA113B2D4E64462229E107A8F4Aa7359D055F5',
      56: '0x0A30d83b4396F34b25EB1956a79FabB5d3BaB931', // SmartChef
    },
    rewardTokenAddress: {
      97: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee', // BUSD, didnt find CAKE
      56: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', // CAKE
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://pancakeswap.finance/',
    harvest: true,
    tokenPerBlock: '0.003681388889',
    sortOrder: 12,
    isFinished: false,
    tokenDecimals: 18,
    burnFee: 15,
  },
]

export default pools
