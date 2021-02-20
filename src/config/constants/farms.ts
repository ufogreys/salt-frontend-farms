import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'SALT',
    lpAddresses: {
      97: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c',
      56: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c', // FIXME:
    },
    tokenSymbol: 'SALT',
    tokenAddresses: {
      97: '0x89dcddca577f3658a451775d58ea99da532263c8',
      56: '0x89dcddca577f3658a451775d58ea99da532263c8', // FIXME: SALT
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 1,
    risk: 2,
    lpSymbol: 'SALT-BUSD',
    lpAddresses: {
      97: '0xf62e8d3EcA464C9Fa9D46f169211eF4a41E41fE8',
      56: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c', // FIXME:
    },
    tokenSymbol: 'SALT',
    tokenAddresses: {
      97: '0x89dcddca577f3658a451775d58ea99da532263c8',
      56: '0x89dcddca577f3658a451775d58ea99da532263c8', // FIXME: SALT
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 2,
    risk: 2,
    lpSymbol: 'SALT-BNB',
    lpAddresses: {
      97: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c', // FIXME:
      56: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c', // FIXME:
    },
    tokenSymbol: 'SALT',
    tokenAddresses: {
      97: '0x89dcddca577f3658a451775d58ea99da532263c8',
      56: '0x89dcddca577f3658a451775d58ea99da532263c8', // FIXME: SALT
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 3,
    risk: 1,
    lpSymbol: 'BNB-BUSD',
    lpAddresses: {
      97: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c', // FIXME:
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', // FIXME:
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', // https://bscscan.com/address/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 4,
    risk: 1,
    lpSymbol: 'DAI-BUSD',
    lpAddresses: {
      97: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c', // FIXME:
      56: '0x3ab77e40340ab084c3e23be8e5a6f7afed9d41dc',
    },
    tokenSymbol: 'DAI',
    tokenAddresses: {
      97: '0x89dcddca577f3658a451775d58ea99da532263c8', // FIXME:
      56: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3', // https://bscscan.com/address/0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 6,
    risk: 1,
    lpSymbol: 'CAKE-BUSD',
    lpAddresses: {
      97: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c', // FIXME:
      56: '0x0ed8e0a2d99643e1e65cca22ed4424090b8b7458', // https://bscscan.com/address/0x0ed8e0a2d99643e1e65cca22ed4424090b8b7458
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '0x89dcddca577f3658a451775d58ea99da532263c8', // FIXME:
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82', // https://bscscan.com/address/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 7,
    risk: 1,
    lpSymbol: 'CAKE-BNB',
    lpAddresses: {
      97: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c', // FIXME:
      56: '0xa527a61703d82139f8a06bc30097cc9caa2df5a6', // https://bscscan.com/address/0xa527a61703d82139f8a06bc30097cc9caa2df5a6
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '0x89dcddca577f3658a451775d58ea99da532263c8', // FIXME:
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82', // https://bscscan.com/address/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 8,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'BUSD',
    lpAddresses: {
      97: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c', // FIXME:
      56: '0x19e7cbecdd23a16dfa5573df54d98f7caae03019', // This will be ignored
    },
    tokenSymbol: 'BUSD',
    tokenAddresses: {
      97: '0x89dcddca577f3658a451775d58ea99da532263c8', // FIXME:
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56', // https://bscscan.com/address/0xe9e7cea3dedca5984780bafc599bd69add087d56
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 9,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'BNB',
    lpAddresses: {
      97: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c', // FIXME:
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', // https://bscscan.com/address/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '0x89dcddca577f3658a451775d58ea99da532263c8', // FIXME:
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', // https://bscscan.com/address/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
]

export default farms
