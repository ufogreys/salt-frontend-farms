import React from 'react'
import styled from 'styled-components'
import { Text } from '@saltswap/uikit'
import { IfoStatus } from 'config/constants/types'
import getTimePeriods from 'utils/getTimePeriods'
import useI18n from 'hooks/useI18n'

export interface IfoCardTimeProps {
  isLoading: boolean
  status: IfoStatus
  secondsUntilStart: number
  secondsUntilEnd: number
  finalized: boolean
}

const Details = styled.div`
  align-items: center;
  display: flex;
  height: 24px;
  justify-content: center;
  margin-bottom: 24px;
`

const Countdown = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`

const IfoCardTime: React.FC<IfoCardTimeProps> = ({
  isLoading,
  status,
  secondsUntilStart,
  secondsUntilEnd,
}) => {
  const TranslateString = useI18n()
  const countdownToUse = status === 'coming_soon' ? secondsUntilStart : secondsUntilEnd
  const timeUntil = getTimePeriods(countdownToUse)
  const suffix = status === 'coming_soon' ? 'start' : 'finish'

  if (isLoading) {
    return <Details>{TranslateString(656, 'Loading...')}</Details>
  }

  if (countdownToUse <= 0) {
    return (
      <Details>
        <Text bold>{TranslateString(999, 'Finished!')}</Text>
      </Details>
    )
  }

  return (
    <Details>
      <Countdown>{`${timeUntil.days}d, ${timeUntil.hours}h, ${timeUntil.minutes}m until ${suffix}`}</Countdown>
    </Details>
  )
}

export default IfoCardTime
