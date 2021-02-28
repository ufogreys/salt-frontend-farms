import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import cakeABI from 'config/abi/cake.json'
import multicall from 'utils/multicall'
import BigNumber from 'bignumber.js'
import { QuoteToken } from 'config/constants/types'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

export const fetchPoolsBlockLimits = async () => {
  return [] // FIXME

  const callsStartBlock = poolsConfig.map((poolConfig) => ({
    address: poolConfig.contractAddress[CHAIN_ID],
    name: 'startBlock',
  }))
  const callsEndBlock = poolsConfig.map((poolConfig) => ({
    address: poolConfig.contractAddress[CHAIN_ID],
    name: 'bonusEndBlock',
  }))

  const starts = await multicall(sousChefABI, callsStartBlock)
  const ends = await multicall(sousChefABI, callsEndBlock)

  return poolsConfig.map((poolConfig, index) => {
    const startBlock = starts[index]
    const endBlock = ends[index]
    return {
      sousId: poolConfig.sousId,
      startBlock: new BigNumber(startBlock).toJSON(),
      endBlock: new BigNumber(endBlock).toJSON(),
    }
  })
}

export const fetchPoolsTotalStaking = async () => {
  return [] // FIXME

  const pools = poolsConfig.map((poolConfig) => ({
    address: poolConfig.stakingTokenAddress[CHAIN_ID],
    name: 'balanceOf',
    params: [poolConfig.contractAddress[CHAIN_ID]],
  }))

  const poolsTotalStaked = await multicall(cakeABI, pools)

  return [
    ...poolsConfig.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(poolsTotalStaked[index]).toJSON(),
    })),
  ]
}
