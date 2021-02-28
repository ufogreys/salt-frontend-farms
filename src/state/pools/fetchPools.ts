import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import cakeABI from 'config/abi/cake.json'
import wbnbABI from 'config/abi/wbnb.json' // FIXME Populate
import smartChefBnbABI from 'config/abi/smartChefBnb.json'
import multicall from 'utils/multicall'
import BigNumber from 'bignumber.js'
import { QuoteToken } from 'config/constants/types'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

export const fetchPoolsBlockLimits = async () => {
  // CAKE
  const cakePools = poolsConfig.filter((p) => p.tokenName === QuoteToken.CAKE)
  const cakeStarts = await multicall(
    sousChefABI,
    cakePools.map((cakePool) => ({
      address: cakePool.contractAddress[CHAIN_ID],
      name: 'startBlock',
    })),
  )
  const cakeEnds = await multicall(
    sousChefABI,
    cakePools.map((cakePool) => ({
      address: cakePool.contractAddress[CHAIN_ID],
      name: 'bonusEndBlock',
    })),
  )

  // WBNB
  const wbnbPools = poolsConfig.filter((p) => p.tokenName === QuoteToken.BNB)
  const wbnbStarts = await multicall(
    smartChefBnbABI,
    wbnbPools.map((wbnbPool) => ({
      address: wbnbPool.contractAddress[CHAIN_ID],
      name: 'startBlock',
    })),
  )
  const wbnbEnds = await multicall(
    smartChefBnbABI,
    wbnbPools.map((wbnbPool) => ({
      address: wbnbPool.contractAddress[CHAIN_ID],
      name: 'bonusEndBlock',
    })),
  )

  return [
    ...cakePools.map((poolConfig, index) => {
      const startBlock = cakeStarts[index]
      const endBlock = cakeEnds[index]
      return {
        sousId: poolConfig.sousId,
        startBlock: new BigNumber(startBlock).toJSON(),
        endBlock: new BigNumber(endBlock).toJSON(),
      }
    }),
    ...wbnbPools.map((poolConfig, index) => ({
      sousId: poolConfig.sousId,
      startBlock: new BigNumber(wbnbStarts[index]).toJSON(),
      endBlock: new BigNumber(wbnbEnds[index]).toJSON(),
    })),
  ]
}

export const fetchPoolsTotalStaking = async () => {
  // CAKE
  const cakePools = poolsConfig.filter((p) => p.tokenName === QuoteToken.CAKE)
  const cakePoolsTotalStaked = await multicall(
    cakeABI,
    cakePools.map((cakePool) => ({
      address: cakePool.stakingTokenAddress[CHAIN_ID],
      name: 'balanceOf',
      params: [cakePool.contractAddress[CHAIN_ID]],
    })),
  )

  // WBNB
  const wbnbPools = poolsConfig.filter((p) => p.tokenName === QuoteToken.BNB)
  const wbnbPoolsTotalStaked = [new BigNumber(0)] // FIXME
  // const wbnbPoolsTotalStaked = await multicall(
  //   wbnbABI,
  //   wbnbPools.map((wbnbPool) => ({
  //     address: wbnbPool.stakingTokenAddress[CHAIN_ID],
  //     name: 'balanceOf',
  //     params: [wbnbPool.contractAddress[CHAIN_ID]],
  //   })),
  // )

  return [
    ...cakePools.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(cakePoolsTotalStaked[index]).toJSON(),
    })),
    ...wbnbPools.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(wbnbPoolsTotalStaked[index]).toJSON(),
    })),
  ]
}
