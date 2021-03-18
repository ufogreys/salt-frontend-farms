/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react'
import { Currency, Pair } from '@pancakeswap-libs/sdk'
import { Text } from '@saltswap/uikit'
import styled from 'styled-components'
import { darken } from 'polished'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useTokenBalance from 'hooks/useTokenBalance'
import BigNumber from 'bignumber.js'
import BnbLogo from './bnb.png'
import { Input as NumericalInput } from '../NumericalInput'
import TranslatedText from '../../../../components/TranslatedText'
import { TranslateString } from '../../../../utils/translateTextHelpers'
import { RowBetween } from '../Row'

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`

const CurrencySelect = styled.button<{ selected: boolean }>`
  align-items: center;
  height: 34px;
  font-size: 16px;
  font-weight: 500;
  background-color: transparent;
  color: ${({ selected, theme }) => (selected ? theme.colors.text : '#FFFFFF')};
  border-radius: 12px;
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  padding: 0 0.5rem;

  :focus,
  :hover {
    background-color: ${({ theme }) => darken(0.05, theme.colors.input)};
  }
`

const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.colors.textSubtle)};
  }
`

const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const InputPanel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1;
`

const Container = styled.div`
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
`

const StyledBnbLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

interface CurrencyInputPanelProps {
  value: string
  placeholder: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
}

export default function CurrencyInputPanel({
  value,
  placeholder,
  onUserInput,
  onMax,
  label = TranslateString(132, 'Input'),
  currency,
  disableCurrencySelect = true,
  hideBalance = false,
  id,
}: CurrencyInputPanelProps) {
  const { account } = useWallet()
  const bnbBalance = useTokenBalance('0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee') // TODO Change to BNB address

  return (
    <InputPanel id={id}>
      <Container>
        <LabelRow>
          <RowBetween>
            <Text fontSize="14px">{label}</Text>
            {account && (
              <Text onClick={onMax} fontSize="14px" style={{ display: 'inline', cursor: 'pointer' }}>
                {!hideBalance && !!currency && bnbBalance
                  ? `Balance: ${new BigNumber(bnbBalance).div(new BigNumber(10).pow(18)).toFixed(6)}`
                  : ' -'}
              </Text>
            )}
          </RowBetween>
        </LabelRow>
        <InputRow selected={disableCurrencySelect}>
          <NumericalInput
            className="token-amount-input"
            value={value}
            placeholder={placeholder}
            onUserInput={(val) => {
              onUserInput(val)
            }}
          />
          <CurrencySelect selected={!!currency}>
            <Aligner>
              <StyledBnbLogo src={BnbLogo} size="24px" style={{ marginRight: '8px' }} />
              <Text>
                {(currency && currency.symbol && currency.symbol.length > 20
                  ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                      currency.symbol.length - 5,
                      currency.symbol.length,
                    )}`
                  : currency?.symbol) || <TranslatedText translationId={82}>Select a currency</TranslatedText>}
              </Text>
            </Aligner>
          </CurrencySelect>
        </InputRow>
      </Container>
    </InputPanel>
  )
}
