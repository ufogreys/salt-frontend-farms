import React, { useState, useEffect } from 'react'
import { useModal, Text } from '@saltswap/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'
import { IfoStatus } from 'config/constants/types'
import { getBalanceNumber } from 'utils/formatBalance'
import LabelButton from './LabelButton'
import ContributeModal from './ContributeModal'

export interface Props {
  address: string
  currency: string
  currencyAddress: string
  contract: Contract
  status: IfoStatus
  raisingAmount: BigNumber
  tokenDecimals: number
}

const IfoCardContribute: React.FC<Props> = ({
  currency,
  currencyAddress,
  contract,
  status,
  raisingAmount,
  tokenDecimals,
}) => {
  const [pendingTx, setPendingTx] = useState(false)
  const [contributions, setContributions] = useState(new BigNumber(0))
  const [claimedTokens, setClaimedTokens] = useState(new BigNumber(0))
  const [tokensPerBnb, setTokensPerBnb] = useState(new BigNumber(0))

  const { account } = useWallet()
  const [onPresentContributeModal] = useModal(
    <ContributeModal currency={currency} contract={contract} currencyAddress={currencyAddress} />,
  )

  useEffect(() => {
    const fetch = async () => {
      setContributions(new BigNumber(await contract.methods.contributions(account).call()))
      setClaimedTokens(new BigNumber(await contract.methods.claimedTokens(account).call()))
      setTokensPerBnb(new BigNumber(await contract.methods.tokensPerBnb().call()))
    }

    if (account) {
      fetch()
    }
  }, [account, contract.methods, pendingTx])

  const claim = async () => {
    setPendingTx(true)
    await contract.methods.claimTokens()
    setPendingTx(false)
  }
  const isFinished = status === 'finished'
  const percentOfUserContribution = new BigNumber(contributions).div(raisingAmount).times(100)

  const userClaimed = isFinished && claimedTokens.isGreaterThan(new BigNumber(0))

  const claimableTokens = getBalanceNumber(contributions) * getBalanceNumber(tokensPerBnb)

  return (
    <>
      <LabelButton
        disabled={pendingTx || userClaimed}
        buttonLabel={isFinished ? 'Claim' : 'Contribute'}
        label={isFinished ? 'Your tokens to claim' : `Your contribution (${currency})`}
        value={
          // eslint-disable-next-line no-nested-ternary
          isFinished
            ? userClaimed
              ? 'Claimed'
              : claimableTokens.toFixed(4)
            : getBalanceNumber(contributions, 1 ** 18).toFixed(4)
        }
        onClick={isFinished ? claim : onPresentContributeModal}
      />
      <Text fontSize="14px" color="textSubtle">
        {isFinished
          ? `You'll be refunded any excess tokens when you claim`
          : `${percentOfUserContribution.toFixed(5)}% of total`}
      </Text>
    </>
  )
}

export default IfoCardContribute
