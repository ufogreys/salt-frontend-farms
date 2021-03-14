import React from 'react'
import { Text } from '@saltswap/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useTokenBalance from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getSaltAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import { usePriceSaltBusd } from 'state/hooks'
import CardValue from './CardValue'
import CardBusdValue from './SaltBusdValue'

const CakeWalletBalance = () => {
  const TranslateString = useI18n()
  const cakeBalance = useTokenBalance(getSaltAddress())
  const busdBalance = new BigNumber(getBalanceNumber(cakeBalance)).multipliedBy(usePriceSaltBusd()).toNumber()
  const { account } = useWallet()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '36px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return (
    <>
      <CardValue value={getBalanceNumber(cakeBalance)} fontSize="24px" />
      <CardBusdValue value={busdBalance} />
    </>
  )
}

export default CakeWalletBalance
