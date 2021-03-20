import { Ifo } from './types'

const ifos: Ifo[] = [
  {
    id: 'momoprotocol',
    address: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
    isActive: true,
    name: 'MomoProtocol',
    token: 'MOMO',
    subTitle: 'The 1st BSC project that offers Flashloan Arbitrage & Rewards Contributors through our Social App',
    description:
      'MomoProtocol is an online platform for using, sharing, and getting information related to any field of knowledge. It is a website that will contain the questions and answers and all those questions and answers will be rewarded through tokens of the website. MomoProtocol is also going to Launch Flashloan Arbitrage on BSC. Where users will need Momo Tokens to try the Flashloan without any collateral.',
    launchDate: 'Mar. 22',
    launchTime: '4PM CET',
    saleAmount: '20,000',
    raiseAmount: '2,000',
    cakeToBurn: '0',
    projectSiteUrl: 'https://momoprotocol.finance/#/',
    currency: 'BNB',
    currencyAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // FIX This is WBNB
    tokenDecimals: 18,
    releaseBlockNumber: 7086064,
    maxContribution: '50',
    minContribution: '0.1'
  },
]

export default ifos
