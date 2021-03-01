import pools from 'config/constants/pools'
import erc20ABI from 'config/abi/erc20.json'
import smartChefABI from 'config/abi/smartChef.json'
import multicall from 'utils/multicall'
import { getWeb3 } from 'utils/web3'
import BigNumber from 'bignumber.js'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

const web3 = getWeb3()

export const fetchPoolsAllowance = async (account: string) => {
  const calls = pools.map((p) => ({
    address: p.stakingTokenAddress[CHAIN_ID],
    name: 'allowance',
    params: [account, p.contractAddress[CHAIN_ID]],
  }))

  const allowances = await multicall(erc20ABI, calls)
  return pools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (account: string) => {
  const calls = pools.map((p) => ({
    address: p.stakingTokenAddress[CHAIN_ID],
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(erc20ABI, calls)
  const balance = await web3.eth.getBalance(account)

  return {
    ...pools.reduce(
      (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
      {},
    ), ...pools.reduce(
      (acc, pool) => ({ ...acc, [pool.sousId]: new BigNumber(balance).toJSON() }),
      {},
    )
  }
}

export const fetchUserStakeBalances = async (account) => {
  const userInfo = await multicall(
    smartChefABI,
    pools.map((p) => ({
      address: p.contractAddress[CHAIN_ID],
      name: 'userInfo',
      params: [account],
    })),
  )

  return {
    ...pools.reduce(
      (acc, pool, index) => ({
        ...acc,
        [pool.sousId]: new BigNumber(userInfo[index]?.amount._hex).toJSON(),
      }),
      {},
    ),
  }
}

export const fetchUserPendingRewards = async (account) => {
  const res = await multicall(
    smartChefABI,
    pools.map((p) => ({
      address: p.contractAddress[CHAIN_ID],
      name: 'pendingReward',
      params: [account],
    })),
  )

  return {
    ...pools.reduce(
      (acc, pool, index) => ({
        ...acc,
        [pool.sousId]: new BigNumber(res[index]).toJSON(),
      }),
      {},
    ),
  }
}
