import { Ifo } from './types'

const ifos: Ifo[] = [
  {
    id: 'rebasingprotocol',
    address: {
      56: '0xE5A1ab7017b3b01ec6C0b68790f28577c734e2b1',
      97: '0x8E3Be059992dee2a668902EED64bac9Bab134071',
    },
    isActive: false,
    name: 'RebasingProtocol',
    token: 'RBT',
    subTitle: 'Rebasing Protocol is a decentralized and Elastic Supply token based on Binance Smart Chain',
    description:
      'Rebasing Protocol is a decentralized and Elastic Supply token based on Binance Smart Chain. Rebasing Protocol is built on adaptable, fair, safe, and sustainable core values, compatible with Smart Contract. It has novel features such as token burn and add liquidity to pool automatically from a percent of every transaction. Pegged price can be changed as per community once Governance is launched.',
    saleAmount: '5200',
    raiseAmount: '400',
    projectSiteUrl: 'https://rebasing.live',
    currency: 'BNB',
    currencyAddress: '0xDd3F196c59Df7bdABc18BBcfFb6440298AE117e2',
    tokenDecimals: 9,
    maxContribution: '50',
    minContribution: '0.001',
  },
  {
    id: 'momoprotocol',
    address: {
      56: '0x665807C7531810EC676D90639e339e662B363dd0',
      97: '0x8E3Be059992dee2a668902EED64bac9Bab134071',
    },
    isActive: true,
    name: 'MomoProtocol',
    token: 'MOMO',
    subTitle: 'The 1st BSC project that offers Flashloan Arbitrage & Rewards Contributors through our Social App',
    description:
      'MomoProtocol is an online platform for using, sharing, and getting information related to any field of knowledge. It is a website that will contain the questions and answers and all those questions and answers will be rewarded through tokens of the website. MomoProtocol is also going to Launch Flashloan Arbitrage on BSC. Where users will need Momo Tokens to try the Flashloan without any collateral.',
    saleAmount: '730 000',
    raiseAmount: '2000',
    projectSiteUrl: 'https://momoprotocol.finance/#/',
    currency: 'BNB',
    currencyAddress: '0xafb2997fe9a99022e61c7e01b974e0e3d7704b02',
    tokenDecimals: 18,
    maxContribution: '100',
    minContribution: '0.001',
  },
]

export default ifos
