import { MenuEntry } from '@saltswap/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Exchange',
    href: 'https://exchange.saltswap.finance/#/swap',
    icon: 'ExchangeIcon',
  },
  {
    label: 'Liquidity',
    href: 'https://exchange.saltswap.finance/#/pool',
    icon: 'LiquidityIcon',
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: 'Oceans 🆕',
    icon: 'WaveIcon',
    href: '/oceans',
  },
  {
    label: 'Audit By Certik in progress...',
    icon: 'AuditIcon',
    href: '/',
  },
  // {
  //   label: 'Lottery',
  //   icon: 'TicketIcon',
  //   href: '/lottery',
  // },
  // {
  //   label: 'NFT',
  //   icon: 'NftIcon',
  //   href: '/nft',
  // },
  {
    label: 'Price Graph',
    icon: 'GraphIcon',
    href: '/graph',
  },
  {
    label: 'Listings',
    icon: 'ListingIcon',
    items: [
      {
        label: 'CoinMarketCap',
        href: 'https://coinmarketcap.com/currencies/saltswap-finance',
      },
      {
        label: 'CoinGecko',
        href: 'https://www.coingecko.com/en/coins/saltswap',
      },
      {
        label: 'DappRadar',
        href: 'https://dappradar.com/binance-smart-chain/defi/saltswap',
      },
    ],
  },
  // {
  //   label: 'IFO',
  //   icon: 'IfoIcon',
  //   href: '/ifo',
  // },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      // {
      //   label: 'Voting',
      //   href: 'https://voting.saltswap.finance',
      // },
      {
        label: 'Github',
        href: 'https://github.com/saltswap/',
        icon: 'GithubIcon',
      },
      {
        label: 'Docs',
        href: 'https://saltswap.gitbook.io/salt-swap/',
        icon: 'GitbookIcon',
      },
      {
        label: 'Blog',
        href: 'https://saltswap.medium.com/',
        icon: 'MediumIcon',
      },
    ],
  },
]

export default config
