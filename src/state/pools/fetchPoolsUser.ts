import pools from 'config/constants/pools'
import smartChefABI from 'config/abi/smartChef.json'
import smartChefBnbABI from 'config/abi/smartChefBnb.json'
import erc20ABI from 'config/abi/erc20.json'
import { QuoteToken } from 'config/constants/types'
import multicall from 'utils/multicall'
import { getWeb3 } from 'utils/web3'
import BigNumber from 'bignumber.js'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

// Pool 0, Cake / Cake is a different kind of contract (master chef)
// BNB pools use the native BNB token (wrapping ? unwrapping is done at the contract level)
const nonBnbPools = pools.filter((p) => p.stakingTokenName !== QuoteToken.BNB)
const bnbPools = pools.filter((p) => p.stakingTokenName === QuoteToken.BNB)
const web3 = getWeb3()

export const fetchPoolsAllowance = async (account) => {
  const calls = nonBnbPools.map((p) => ({
    address: p.stakingTokenAddress[CHAIN_ID],
    name: 'allowance',
    params: [account, p.contractAddress[CHAIN_ID]],
  }))

  const allowances = await multicall(erc20ABI, calls)
  return nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (account) => {
  // Non BNB pools
  const calls = nonBnbPools.map((p) => ({
    address: p.stakingTokenAddress[CHAIN_ID],
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(erc20ABI, calls)
  const tokenBalances = nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )

  // BNB pools
  const bnbBalance = await web3.eth.getBalance(account)
  const bnbBalances = bnbPools.reduce(
    (acc, pool) => ({ ...acc, [pool.sousId]: new BigNumber(bnbBalance).toJSON() }),
    {},
  )

  return { ...tokenBalances, ...bnbBalances }
}

export const fetchUserStakeBalances = async (account) => {
  // CAKE
  const cakePools = pools.filter(p => p.stakingTokenName === QuoteToken.CAKE)
  const cakeCalls = cakePools.map((p) => ({
    address: p.contractAddress[CHAIN_ID],
    name: 'userInfo',
    params: [account],
  }))

  const cakeUserInfo = await multicall(smartChefABI, cakeCalls)
  const stakedCakeBalances = pools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(cakeUserInfo[index].amount._hex).toJSON(),
    }),
    {},
  )

  // WBNB
  const wbnbPools = pools.filter(p => p.stakingTokenName === QuoteToken.BNB)
  const wbnbCalls = wbnbPools.map((p) => ({
    address: p.contractAddress[CHAIN_ID],
    name: 'userInfo',
    params: [account],
  }))
  const wbnbUserInfo = await multicall(smartChefBnbABI, wbnbCalls) // FIXME smartChefBnbABI?
  const stakedWbnbBalances = bnbPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(wbnbUserInfo[index].amount._hex).toJSON(),
    }),
    {},
  )

  return { ...stakedCakeBalances, ...stakedWbnbBalances }
}

export const fetchUserPendingRewards = async (account) => {
  // CAKE
  const cakePools = pools.filter(p => p.stakingTokenName === QuoteToken.CAKE)
  const calls = cakePools.map((p) => ({
    address: p.contractAddress[CHAIN_ID],
    name: 'pendingReward',
    params: [account],
  }))
  const res = await multicall(smartChefABI, calls)
  const cakePendingRewards = pools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(res[index]).toJSON(),
    }),
    {},
  )

  // WBNB
  const wbnbPools = pools.filter(p => p.stakingTokenName === QuoteToken.BNB)
  const wbnbCalls = wbnbPools.map((p) => ({
    address: p.contractAddress[CHAIN_ID],
    name: 'pendingReward',
    params: [account],
  }))
  const wbnbRes = await multicall(smartChefABI, wbnbCalls) // FIXME smartChefBnbABI?
  const wbnbPendingRewards = pools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(wbnbRes[index]).toJSON(),
    }),
    {},
  )

  return { ...cakePendingRewards, ...wbnbPendingRewards }
}
