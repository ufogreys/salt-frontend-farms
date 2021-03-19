import React, { useEffect, useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { Modal, Button, Flex, LinkExternal } from '@saltswap/uikit'
import BalanceInput from 'components/Input/BalanceInput'
import { getWeb3 } from 'utils/web3'
import { getFullDisplayBalance } from 'utils/formatBalance'

interface Props {
  currency: string
  contract: any
  currencyAddress: string
  onDismiss?: () => void
}

const ContributeModal: React.FC<Props> = ({ currency, contract, currencyAddress, onDismiss }) => {
  const [value, setValue] = useState('')
  const [bnbBalance, setBnbBalance] = useState(new BigNumber(0))
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()

  useEffect(() => {
    const fetch = async () => {
      const balance = await getWeb3().eth.getBalance(account)

      setBnbBalance(new BigNumber(balance))
    }

    if (account) {
      fetch()
    }
  }, [account])

  return (
    <Modal title={`Contribute ${currency}`} onDismiss={onDismiss}>
      <BalanceInput
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        symbol={currency}
        max={getFullDisplayBalance(bnbBalance)}
        onSelectMax={() => setValue(bnbBalance.toString())}
      />
      <Flex justifyContent="space-between" mb="24px">
        <Button fullWidth variant="secondary" onClick={onDismiss} mr="8px">
          Cancel
        </Button>
        <Button
          fullWidth
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await getWeb3().eth.sendTransaction({
              from: account,
              to: contract,
              value: new BigNumber(value).times(new BigNumber(10).pow(18)).toString(),
            })
            setPendingTx(false)
            onDismiss()
          }}
        >
          Confirm
        </Button>
      </Flex>
      <LinkExternal
        href="https://exchange.saltswap.finance/#/add/ETH/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"
        style={{ margin: 'auto' }}
      >
        {`Get ${currency}`}
      </LinkExternal>
    </Modal>
  )
}

export default ContributeModal
