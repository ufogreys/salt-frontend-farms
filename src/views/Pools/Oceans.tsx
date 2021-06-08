import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Heading } from '@saltswap/uikit'
import { BLOCKS_PER_YEAR } from 'config'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import {
  useFarms,
  usePriceBnbBusd,
  usePools,
  usePriceSlimeBnb,
  usePriceEggBnb,
  usePriceBrewBnb,
  usePriceBtcbBnb,
  usePriceCtcBnb,
  usePriceBlueBnb,
  usePriceMomoBnb,
  usePricePalmBnb,
  usePriceMchBnb,
  usePriceSafepBnb,
  usePriceUbuBnb,
  usePriceGenBnb,
  usePriceShrimpBnb,
  usePriceShellBnb,
  usePriceBlueSaltLPBnb,
  usePriceSlmeSaltLPBnb,
  usePriceSaltBusdLPBnb,
  usePriceSaltMomoLPBnb,
  usePriceSaltPalmLPBnb,
  usePriceSaltMchLPBnb,
} from 'state/hooks'
import { QuoteToken } from 'config/constants/types'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import PoolCard from './components/PoolCard'
import PoolTabButtons from './components/PoolTabButtons'
import Divider from './components/Divider'

const Farm: React.FC = () => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const { account } = useWallet()
  const farms = useFarms()
  const pools = usePools(account)
  const bnbPriceUSD = usePriceBnbBusd()
  const block = useBlock()
  const slimePrice = usePriceSlimeBnb()
  const eggPrice = usePriceEggBnb()
  const brewPrice = usePriceBrewBnb()
  const btcbPrice = usePriceBtcbBnb()
  const ctcPrice = usePriceCtcBnb()
  const bluePrice = usePriceBlueBnb()
  const momoPrice = usePriceMomoBnb()
  const palmPrice = usePricePalmBnb()
  const mchPrice = usePriceMchBnb()
  const safepPrice = usePriceSafepBnb()
  const ubuPrice = usePriceUbuBnb()
  const genPrice = usePriceGenBnb()
  const shrimpPrice = usePriceShrimpBnb()
  const shellPrice = usePriceShellBnb()
  const saltBlueLPPrice = usePriceBlueSaltLPBnb()
  const saltSlmeLPPrice = usePriceSlmeSaltLPBnb()
  const saltBusdLPPrice = usePriceSaltBusdLPBnb()
  const saltMomoLPPrice = usePriceSaltMomoLPBnb()
  const saltPalmLPPrice = usePriceSaltPalmLPBnb()
  const saltMchLPPrice = usePriceSaltMchLPBnb()

  const priceToBnb = (tokenName: string, tokenPrice: BigNumber, quoteToken: QuoteToken): BigNumber => {
    const tokenPriceBN = new BigNumber(tokenPrice)
    if (tokenName === 'BNB' || tokenName === 'WBNB') {
      return new BigNumber(1)
    }
    if (tokenName === 'SLME') {
      return slimePrice
    }
    if (tokenName === 'EGG') {
      return eggPrice
    }
    if (tokenName === 'BREW') {
      return brewPrice
    }
    if (tokenName === 'BTCB') {
      return btcbPrice
    }
    if (tokenName === 'CTC') {
      return ctcPrice
    }
    if (tokenName === 'BLUE') {
      return bluePrice
    }
    if (tokenName === 'MOMO') {
      return momoPrice
    }
    if (tokenName === 'PALM') {
      return palmPrice
    }
    if (tokenName === 'MCH') {
      return mchPrice
    }
    if (tokenName === 'SAFEP') {
      return safepPrice
    }
    if (tokenName === 'UBU') {
      return ubuPrice
    }
    if (tokenName === 'GEN') {
      return genPrice
    }
    if (tokenName === 'SHRIMP') {
      return shrimpPrice
    }
    if (tokenName === 'SHELL') {
      return shellPrice
    }
    if (tokenPrice && quoteToken === QuoteToken.BUSD) {
      return tokenPriceBN.div(bnbPriceUSD)
    }
    return tokenPriceBN
  }

  const poolsWithApy = pools.map((pool) => {
    const rewardTokenFarm = farms.find((f) => f.tokenSymbol === pool.tokenName)
    const stakingTokenFarm = farms.find((s) => s.tokenSymbol === pool.stakingTokenName)

    // /!\ Assume that the farm quote price is BNB
    const stakingTokenPriceInBNB = priceToBnb(
      QuoteToken.SALT,
      stakingTokenFarm?.tokenPriceVsQuote,
      stakingTokenFarm?.quoteTokenSymbol,
    )
    const rewardTokenPriceInBNB = priceToBnb(
      pool.tokenName,
      rewardTokenFarm?.tokenPriceVsQuote,
      rewardTokenFarm?.quoteTokenSymbol,
    )
    // console.log('pool.tokenName', pool.tokenName)
    // console.log('rewardTokenPriceInBNB', rewardTokenPriceInBNB.toString())
    // console.log('stakingTokenPriceInBNB', stakingTokenPriceInBNB.toString())
    const totalRewardPricePerYear = rewardTokenPriceInBNB.times(pool.tokenPerBlock).times(BLOCKS_PER_YEAR)
    let totalStakingTokenInPool = new BigNumber(0)
    if (pool.tokenName === 'BLUE') {
      // console.log("salt-blue LP", saltBlueLPPrice.times(getBalanceNumber(pool.totalStaked)).toString())
      totalStakingTokenInPool = saltBlueLPPrice.times(getBalanceNumber(pool.totalStaked))
    } else if (pool.tokenName === 'SLME') {
      totalStakingTokenInPool = saltSlmeLPPrice.times(getBalanceNumber(pool.totalStaked))
      // console.log('salt-skime LP', totalStakingTokenInPool.toString())
    } else if (pool.tokenName === 'BUSD') {
      totalStakingTokenInPool = saltBusdLPPrice.times(getBalanceNumber(pool.totalStaked))
      // console.log('salt-busd LP', totalStakingTokenInPool.toString())
    } else if (pool.tokenName === 'MOMO') {
      totalStakingTokenInPool = saltMomoLPPrice.times(getBalanceNumber(pool.totalStaked))
      // console.log('salt-busd LP', totalStakingTokenInPool.toString())
    } else if (pool.tokenName === 'PALM') {
      totalStakingTokenInPool = saltPalmLPPrice.times(getBalanceNumber(pool.totalStaked))
      // console.log('salt-PALM LP', totalStakingTokenInPool.toString())
    } else if (pool.tokenName === 'MCH') {
      totalStakingTokenInPool = saltMchLPPrice.times(getBalanceNumber(pool.totalStaked))
      // console.log('salt-MCH LP', saltMchLPPrice.toString())
    } else {
      totalStakingTokenInPool = stakingTokenPriceInBNB.times(getBalanceNumber(pool.totalStaked))
    }

    // tokens per block * price of CAKE * blocks_per_year / ( tokens in pool x salt price) * 100
    const apy = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)

    return {
      ...pool,
      isFinished: pool.isFinished || block > pool.endBlock,
      apy,
    }
  })

  const [finishedPools, openPools] = partition(poolsWithApy, (pool) => pool.isFinished)

  return (
    <Page>
      <Hero>
        <div>
          <Heading as="h1" size="xxl" mb="16px">
            {TranslateString(282, 'Oceans')}
          </Heading>
          <ul>
            <li>{TranslateString(580, 'Stake SALT to earn new tokens.')}</li>
            <li>{TranslateString(404, 'You can unstake at any time.')}</li>
            <li>{TranslateString(406, 'Rewards are calculated per block.')}</li>
          </ul>
        </div>
        <img src="/images/ocean.png" alt="icean pool icon" width={435} height={218} />
      </Hero>
      <PoolTabButtons />
      <Divider />
      <FlexLayout>
        <Route exact path={`${path}`}>
          <>
            {orderBy(openPools, ['sortOrder'], 'desc').map((pool) => (
              <PoolCard key={pool.sousId} pool={pool} />
            ))}
          </>
        </Route>
        <Route path={`${path}/history`}>
          {orderBy(finishedPools, ['sortOrder']).map((pool) => (
            <PoolCard key={pool.sousId} pool={pool} />
          ))}
        </Route>
      </FlexLayout>
    </Page>
  )
}

const Hero = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 1fr;
  margin-left: auto;
  margin-right: auto;
  max-width: 250px;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: 16px;
    li {
      margin-bottom: 4px;
    }
  }
  img {
    height: auto;
    max-width: 100%;
  }
  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
    margin: 0;
    max-width: none;
  }
`

export default Farm
