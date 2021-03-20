import { Ifo } from './types'

const ifos: Ifo[] = [
  {
    id: 'rebasingprotocol',
    address: {
      56: '0x219B7Ff08d2cAdCfdc729c8EBcCCE1EA594F8D10', // TODO
      97: '0x219B7Ff08d2cAdCfdc729c8EBcCCE1EA594F8D10',
    },
    isActive: true,
    name: 'RebasingProtocol',
    token: 'RBT',
    subTitle: 'Rebasing Protocol is a decentralized and Elastic Supply token based on Binance Smart Chain',
    description:
      'Rebasing Protocol is a decentralized and Elastic Supply token based on Binance Smart Chain. Rebasing Protocol is built on adaptable, fair, safe, and sustainable core values, compatible with Smart Contract. It has novel features such as token burn and add liquidity to pool automatically from a percent of every transaction. Pegged price can be changed as per community once Governance is launched.',
    launchDate: 'Mar. 20',
    launchTime: '4PM CET',
    saleAmount: '5000',
    raiseAmount: '400',
    cakeToBurn: '0',
    projectSiteUrl: 'https://rebasing.live',
    currency: 'BNB',
    currencyAddress: '0xDd3F196c59Df7bdABc18BBcfFb6440298AE117e2', // FIX This is WBNB
    tokenDecimals: 18,
    releaseBlockNumber: 7086064,
    maxContribution: '500',
    minContribution: '0.1',
  },
  /*
  {
    id: 'momoprotocol',
    address: {
      56: '', // TODO
      97: '0x219B7Ff08d2cAdCfdc729c8EBcCCE1EA594F8D10',
    },
    isActive: false,
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
    minContribution: '0.1',
  }, */
]

export default ifos
