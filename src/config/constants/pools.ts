import { PoolCategory, PoolConfig, QuoteToken } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    tokenName: 'CAKE',
    stakingTokenName: QuoteToken.SALT,
    stakingTokenAddress: '0x2849b1aE7E04A3D9Bc288673A92477CF63F28aF4', // SALT
    contractAddress: {
      97: '0x9FcA113B2D4E64462229E107A8F4Aa7359D055F5',
      56: '0xfC2BA5B6Ec7A5Fe68546fC8fB55A915b5CA5E261', // SmartChef
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://pancakeswap.finance/',
    harvest: true,
    tokenPerBlock: '0.000001',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
  },
]

export default pools
