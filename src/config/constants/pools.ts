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
    isFinished: false,
    tokenDecimals: 18,
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
    isFinished: false,
    tokenDecimals: 18,
  },
]

export default pools
