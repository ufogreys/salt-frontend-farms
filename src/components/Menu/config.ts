import { MenuEntry } from '@saltswap/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Exchange',
    href: 'https://salt-frontend-pctzm8sk5-ufogreys.vercel.app/#/swap',
    icon: 'ExchangeIcon',
  },
  {
    label: 'Liquidity',
    href: 'https://salt-frontend-pctzm8sk5-ufogreys.vercel.app/#/pool',
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
    label: 'Oceans',
    icon: 'WaveIcon',
    href: '/oceans',
  },
  {
    label: 'Lottery',
    icon: 'TicketIcon',
    href: '/lottery',
  },
  {
    label: 'Launchpad (IDOs)',
    icon: 'IdoIcon',
    href: '/ido',
  },
  {
    label: 'Audited By Certik ✅',
    icon: 'AuditIcon',
    href: 'https://certik.org/projects/in-dex-sale',
  },
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
        href: 'https://coinmarketcap.com/currencies/in-dex-sale',
      },
      {
        label: 'CoinGecko',
        href: 'https://www.coingecko.com/en/coins/in-dex-sale',
      },
      {
        label: 'DappRadar',
        href: 'https://dappradar.com/binance-smart-chain/defi/in-dex-sale',
      },
    ],
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      // {
      //   label: 'Voting',
      //   href: 'https://voting.in-dex-sale.finance',
      // },
      {
        label: 'Github',
        href: 'https://github.com/ufogreys',
        icon: 'GithubIcon',
      },
      {
        label: 'Docs',
        href: 'https://idsdefi.gitbook.io/in-dex-sale/the-company/about-this',
        icon: 'GitbookIcon',
      },
      {
        label: 'IDO Application',
        href: 'https://docs.google.com/forms/d/e/1FAIpQLSfxDeaFCD6BE5Lddt7Iq9b4fpjNj3P1H3Ejh0vqriRJpwe1IA/viewform',
        icon: 'MediumIcon',
      },
    ],
  },
]

export default config
