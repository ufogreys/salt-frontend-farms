import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

export const approve = async (lpContract, masterChefContract, account) =>
  lpContract.methods.approve(masterChefContract.options.address, ethers.constants.MaxUint256).send({ from: account })

export const stake = async (masterChefContract, pid, amount, account) =>
  masterChefContract.methods
    .deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => tx.transactionHash)

export const smartStake = async (smartChefContract, amount, account) =>
  smartChefContract.methods
    .deposit(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => tx.transactionHash)

export const unstake = async (masterChefContract, pid, amount, account) =>
  masterChefContract.methods
    .withdraw(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => tx.transactionHash)

export const smartUnstake = async (smartChefContract, amount, account) =>
  smartChefContract.methods
    .withdraw(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => tx.transactionHash)

export const harvest = async (masterChefContract, pid, account) =>
  masterChefContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => tx.transactionHash)

export const smartHarvest = async (smartChefContract, account) =>
  smartChefContract.methods
    .deposit('0')
    .send({ from: account })
    .on('transactionHash', (tx) => tx.transactionHash)
