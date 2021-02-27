import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import cakeABI from 'config/abi/cake.json'
import multicall from 'utils/multicall'
import BigNumber from 'bignumber.js'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

export const fetchPoolsBlockLimits = async () => {
  const poolsWithEnd = poolsConfig.filter((p) => p.sousId !== 0)
  const callsStartBlock = poolsWithEnd.map((poolConfig) => ({
    address: poolConfig.contractAddress[CHAIN_ID],
    name: 'startBlock',
  }))
  const callsEndBlock = poolsWithEnd.map((poolConfig) => ({
    address: poolConfig.contractAddress[CHAIN_ID],
    name: 'bonusEndBlock',
  }))

  const starts = await multicall(sousChefABI, callsStartBlock)
  const ends = await multicall(sousChefABI, callsEndBlock)

  return poolsWithEnd.map((cakePoolConfig, index) => {
    const startBlock = starts[index]
    const endBlock = ends[index]
    return {
      sousId: cakePoolConfig.sousId,
      startBlock: new BigNumber(startBlock).toJSON(),
      endBlock: new BigNumber(endBlock).toJSON(),
    }
  })
}

export const fetchPoolsTotalStaking = async () => {
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
