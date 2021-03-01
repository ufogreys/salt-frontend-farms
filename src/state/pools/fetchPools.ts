import poolsConfig from 'config/constants/pools'
import smartChefABI from 'config/abi/smartChef.json'
import saltABI from 'config/abi/cake.json'
import multicall from 'utils/multicall'
import BigNumber from 'bignumber.js'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

export const fetchPoolsBlockLimits = async () => {
  const poolStarts = await multicall(
    smartChefABI,
    poolsConfig.map((pool) => ({
      address: pool.contractAddress[CHAIN_ID],
      name: 'startBlock',
    })),
  )
  const poolEnds = await multicall(
    smartChefABI,
    poolsConfig.map((pool) => ({
      address: pool.contractAddress[CHAIN_ID],
      name: 'bonusEndBlock',
    })),
  )

  return poolsConfig.map((poolConfig, index) => ({
    sousId: poolConfig.sousId,
    startBlock: new BigNumber(poolStarts[index]).toJSON(),
    endBlock: new BigNumber(poolEnds[index]).toJSON(),
  }))
}

export const fetchPoolsTotalStaking = async () => {
  const poolsTotalStaked = await multicall(
    saltABI,
    poolsConfig.map((pool) => ({
      address: pool.stakingTokenAddress[CHAIN_ID],
      name: 'balanceOf',
      params: [pool.contractAddress[CHAIN_ID]],
    })),
  )

  return poolsConfig.map((p, index) => ({
    sousId: p.sousId,
    totalStaked: new BigNumber(poolsTotalStaked[index]).toJSON(),
  }))
}
