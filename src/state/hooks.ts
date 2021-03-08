import BigNumber from 'bignumber.js'
import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useRefresh from 'hooks/useRefresh'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import poolsConfig from 'config/constants/pools'
import erc20 from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { fetchFarmsPublicDataAsync, fetchPoolsPublicDataAsync, fetchPoolsUserDataAsync } from './actions'
import { State, Farm, Pool } from './types'
import { QuoteToken } from '../config/constants/types'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

const ZERO = new BigNumber(0)

export const useFetchPublicData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync())
    dispatch(fetchPoolsPublicDataAsync())
  }, [dispatch, slowRefresh])
}

// Farms

export const useFarms = (): Farm[] => useSelector((state: State) => state.farms.data)

export const useFarmFromPid = (pid: number): Farm =>
  useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))

export const useFarmFromSymbol = (lpSymbol: string): Farm =>
  useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))

export const useFarmUser = (pid: number) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : ZERO,
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : ZERO,
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : ZERO,
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : ZERO,
  }
}

// Pools

export const usePools = (account: string): Pool[] => {
  const { fastRefresh } = useRefresh()
  const dispatch = useDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  return useSelector((state: State) => state.pools.data)
}

export const usePoolFromPid = (sousId: number): Pool =>
  useSelector((state: State) => state.pools.data.find((p) => p.sousId === sousId))

// Prices

export const usePriceSaltBusd = (): BigNumber => {
  const pid = 0 // SALT-BUSD LP
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceBnbBusd = (): BigNumber => {
  const pid = 3 // BUSD-BNB LP
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceSlimeBnb = () => {
  const [price, setPrice] = useState(new BigNumber(0))

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0xcb645714520080EF4E65De3254d61356262F0818' // SLIME/BNB LP
      const [wbnbTokenBalanceLP, slimeTokenBalanceLP] = await multicall(erc20, [
        {
          address: poolsConfig.find((p) => p.sousId === 1).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: poolsConfig.find((p) => p.sousId === 2).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
      ])

      if (!slimeTokenBalanceLP || !wbnbTokenBalanceLP) return

      setPrice(new BigNumber(wbnbTokenBalanceLP).div(new BigNumber(slimeTokenBalanceLP)))
    }

    fetchPrice()
  }, [])

  return price
}

export const usePriceEggBnb = () => {
  const [price, setPrice] = useState(new BigNumber(0))

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0xd1B59D11316E87C3a0A069E80F590BA35cD8D8D3' // EGG/BNB LP
      const [wbnbTokenBalanceLP, eggTokenBalanceLP] = await multicall(erc20, [
        {
          address: poolsConfig.find((p) => p.sousId === 1).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: poolsConfig.find((p) => p.sousId === 4).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
      ])

      if (!eggTokenBalanceLP || !wbnbTokenBalanceLP) return

      setPrice(new BigNumber(wbnbTokenBalanceLP).div(new BigNumber(eggTokenBalanceLP)))
    }

    fetchPrice()
  }, [])

  return price
}

export const usePriceBrewBnb = () => {
  const [price, setPrice] = useState(new BigNumber(0))

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0x723203e821f1ff2d0e396d5dd2ea390f3c9d42cf' // BREW/BNB LP
      const [wbnbTokenBalanceLP, brewTokenBalanceLP] = await multicall(erc20, [
        {
          address: poolsConfig.find((p) => p.sousId === 1).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: poolsConfig.find((p) => p.sousId === 5).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
      ])

      if (!brewTokenBalanceLP || !wbnbTokenBalanceLP) return

      setPrice(new BigNumber(wbnbTokenBalanceLP).div(new BigNumber(brewTokenBalanceLP)))
    }

    fetchPrice()
  }, [])

  return price
}

export const usePriceBtcbBnb = () => {
  const [price, setPrice] = useState(new BigNumber(0))

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0x7561eee90e24f3b348e1087a005f78b4c8453524' // BTCB/BNB LP
      const [wbnbTokenBalanceLP, btcbTokenBalanceLP] = await multicall(erc20, [
        {
          address: poolsConfig.find((p) => p.sousId === 1).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: poolsConfig.find((p) => p.sousId === 7).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
      ])

      if (!btcbTokenBalanceLP || !wbnbTokenBalanceLP) return

      setPrice(new BigNumber(wbnbTokenBalanceLP).div(new BigNumber(btcbTokenBalanceLP)))
    }

    fetchPrice()
  }, [])

  return price
}

export const usePriceCtcBnb = () => {
  const [price, setPrice] = useState(new BigNumber(0))

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0x4191251c15ae5b5b795c0ed58c33863a3c4ac3c0' // CTC/BNB LP
      const [wbnbTokenBalanceLP, ctcTokenBalanceLP] = await multicall(erc20, [
        {
          address: poolsConfig.find((p) => p.sousId === 1).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: poolsConfig.find((p) => p.sousId === 8).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
      ])

      if (!ctcTokenBalanceLP || !wbnbTokenBalanceLP) return

      setPrice(new BigNumber(wbnbTokenBalanceLP).div(new BigNumber(ctcTokenBalanceLP)).div(10000000000))
    }

    fetchPrice()
  }, [])

  return price
}

export const usePriceEthBusd = (): BigNumber => new BigNumber(1477)

export const useTotalValue = (): BigNumber => {
  const farms = useFarms()
  const { account } = useWallet()
  const pools = usePools(account)
  const bnbPrice = usePriceBnbBusd()
  const ethPrice = usePriceEthBusd()
  const saltPrice = usePriceSaltBusd()
  const totalValue = useRef(new BigNumber(0));

  useEffect(() => {
    let farmsTotalValue = new BigNumber(0)
    for (let i = 0; i < farms.length; i++) {
      const farm = farms[i]
      if (farm.lpTotalInQuoteToken) {
        let val: BigNumber
        if (farm.quoteTokenSymbol === QuoteToken.BNB) {
          val = bnbPrice.times(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
          val = saltPrice.times(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.ETH) {
          val = ethPrice.times(farm.lpTotalInQuoteToken)
        } else {
          val = farm.lpTotalInQuoteToken
        }
        farmsTotalValue = farmsTotalValue.plus(val)
      }
    }

    let poolsTotalValue = new BigNumber(0)
    for (let i = 0; i < pools.length; i++) {
      const pool = pools[i]
      let poolValue: BigNumber
      if (pool.stakingTokenName === QuoteToken.SALT) {
        const totalSaltStaked = new BigNumber(pool.totalStaked).div(new BigNumber(10).pow(18))
        poolValue = saltPrice.times(totalSaltStaked)
      }
      poolsTotalValue = poolsTotalValue.plus(poolValue)
    }

    totalValue.current = farmsTotalValue.plus(poolsTotalValue)
  }, [bnbPrice, ethPrice, farms, pools, saltPrice])

  if (!totalValue) {
    return new BigNumber(0)
  }

  return totalValue.current
}
