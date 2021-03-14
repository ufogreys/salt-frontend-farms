import React, { useContext } from 'react'
import styled from 'styled-components'
import { Text } from '@saltswap/uikit'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import { useCurrentTime } from 'hooks/useTimer'
import moment from 'moment'
import { createStyles, LinearProgress, Theme, withStyles } from '@material-ui/core'
import { ThemeContext } from 'contexts/ThemeContext'
import { getTicketSaleTime } from '../helpers/CountdownHelpers'

const ProgressWrapper = styled.div`
  display: block;
  width: 100%;
`

const TopTextWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const MiddleTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const BottomTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const StyledPrimaryText = styled(Text)`
  margin-left: 8px;
`

const BorderLinearProgress = withStyles((theme: Theme) => {
  const { isDark } = useContext(ThemeContext)

  return createStyles({
    root: {
      height: 20,
      borderRadius: 10,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: isDark ? '#6d6d6d' : '#1a90ff',
    },
  })
})(LinearProgress)

const LotteryProgress = () => {
  const TranslateString = useI18n()
  const lotteryHasDrawn = useGetLotteryHasDrawn()
  const currentMillis = useCurrentTime()
  const timeUntilTicketSale = getTicketSaleTime(currentMillis)
  // const timeUntilLotteryDraw = getLotteryDrawTime(currentMillis)
  const timeFirstReset = moment.utc('14/03/2021T09:00', 'DD/MM/YYYYTHH:mm')
  const timeLotteryDraw = moment.utc('17/03/2021T09:00', 'DD/MM/YYYYTHH:mm')
  const timeUntilLotteryDraw = timeLotteryDraw.fromNow()

  const progress = (moment().diff(timeFirstReset).valueOf() / timeLotteryDraw.diff(timeFirstReset)).valueOf() * 100

  return (
    <ProgressWrapper>
      <BorderLinearProgress variant="determinate" value={progress} />
      <MiddleTextWrapper>
        <TopTextWrapper>
          <Text fontSize="20px" bold color="#c8efff">
            {lotteryHasDrawn ? TranslateString(0, 'Until ticket sale') : TranslateString(0, 'Lottery draw')}
          </Text>
          <StyledPrimaryText fontSize="20px" bold color="#FFFFFF">
            {lotteryHasDrawn ? timeUntilTicketSale : timeUntilLotteryDraw}
          </StyledPrimaryText>
        </TopTextWrapper>
        <Text fontSize="12px" color="invertedContrast">
          {timeLotteryDraw.toLocaleString()}
        </Text>
      </MiddleTextWrapper>
      {lotteryHasDrawn && (
        <BottomTextWrapper>
          <Text color="invertedContrast">
            {TranslateString(0, 'Lottery draw')} {timeUntilLotteryDraw}
          </Text>
        </BottomTextWrapper>
      )}
    </ProgressWrapper>
  )
}

export default LotteryProgress
