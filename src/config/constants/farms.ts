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
      56: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c', // EGG-BUSD LP
    },
    tokenSymbol: 'SALT',
    tokenAddresses: {
      97: '0x89dcddca577f3658a451775d58ea99da532263c8', // FIXME: SALT
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
      97: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c',
      56: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c', // EGG-BUSD LP
    },
    tokenSymbol: 'SALT',
    tokenAddresses: {
      97: '0x89dcddca577f3658a451775d58ea99da532263c8', // FIXME: SALT
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
      97: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c',
      56: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c', // EGG-BUSD LP
    },
    tokenSymbol: 'SALT',
    tokenAddresses: {
      97: '0x89dcddca577f3658a451775d58ea99da532263c8', // FIXME: SALT
      56: '0x89dcddca577f3658a451775d58ea99da532263c8', // FIXME: SALT
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 3,
    risk: 1,
    lpSymbol: 'BNB-BUSD',
    lpAddresses: {
      97: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c',
      56: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c', // EGG-BUSD LP
    },
    tokenSymbol: 'SALT',
    tokenAddresses: {
      97: '0x89dcddca577f3658a451775d58ea99da532263c8', // FIXME: SALT
      56: '0x89dcddca577f3658a451775d58ea99da532263c8', // FIXME: SALT
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 4,
    risk: 1,
    lpSymbol: 'BUSD-DAI',
    lpAddresses: {
      97: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c',
      56: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c', // EGG-BUSD LP
    },
    tokenSymbol: 'SALT',
    tokenAddresses: {
      97: '0x89dcddca577f3658a451775d58ea99da532263c8', // FIXME: SALT
      56: '0x89dcddca577f3658a451775d58ea99da532263c8', // FIXME: SALT
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 5,
    risk: 1,
    lpSymbol: 'BETH-ETH',
    lpAddresses: {
      97: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c',
      56: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c', // EGG-BUSD LP
    },
    tokenSymbol: 'SALT',
    tokenAddresses: {
      97: '0x89dcddca577f3658a451775d58ea99da532263c8', // FIXME: SALT
      56: '0x89dcddca577f3658a451775d58ea99da532263c8', // FIXME: SALT
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 6,
    risk: 1,
    lpSymbol: 'CAKE-BUSD',
    lpAddresses: {
      97: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c',
      56: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c', // EGG-BUSD LP
    },
    tokenSymbol: 'SALT',
    tokenAddresses: {
      97: '0x89dcddca577f3658a451775d58ea99da532263c8', // FIXME: SALT
      56: '0x89dcddca577f3658a451775d58ea99da532263c8', // FIXME: SALT
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 7,
    risk: 1,
    lpSymbol: 'CAKE-BNB',
    lpAddresses: {
      97: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c',
      56: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c', // EGG-BUSD LP
    },
    tokenSymbol: 'SALT',
    tokenAddresses: {
      97: '0x89dcddca577f3658a451775d58ea99da532263c8', // FIXME: SALT
      56: '0x89dcddca577f3658a451775d58ea99da532263c8', // FIXME: SALT
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 8,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'BUSD',
    lpAddresses: {
      97: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c',
      56: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c', // EGG-BUSD LP
    },
    tokenSymbol: 'SALT',
    tokenAddresses: {
      97: '0x89dcddca577f3658a451775d58ea99da532263c8', // FIXME: SALT
      56: '0x89dcddca577f3658a451775d58ea99da532263c8', // FIXME: SALT
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
      97: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c',
      56: '0xDcE45b2dc62239DD09D6ED97Eefb9276C634602c', // EGG-BUSD LP
    },
    tokenSymbol: 'SALT',
    tokenAddresses: {
      97: '0x89dcddca577f3658a451775d58ea99da532263c8', // FIXME: SALT
      56: '0x89dcddca577f3658a451775d58ea99da532263c8', // FIXME: SALT
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
]

export default farms
