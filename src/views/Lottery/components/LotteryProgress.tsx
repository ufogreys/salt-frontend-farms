import React from 'react'
import styled from 'styled-components'
import { Text } from '@saltswap/uikit'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import { useCurrentTime } from 'hooks/useTimer'
import moment from 'moment'
import { createStyles, LinearProgress, Theme, withStyles } from '@material-ui/core'
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

const BottomTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const StyledPrimaryText = styled(Text)`
  margin-left: 8px;
`

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 20,
      borderRadius: 10,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }),
)(LinearProgress)

const LotteryProgress = () => {
  const TranslateString = useI18n()
  const lotteryHasDrawn = useGetLotteryHasDrawn()
  const currentMillis = useCurrentTime()
  const timeUntilTicketSale = getTicketSaleTime(currentMillis)
  // const timeUntilLotteryDraw = getLotteryDrawTime(currentMillis)
  const timeFirstReset = moment('14/03/2021 07:00:00', 'DD/MM/YYYY HH:mm:ss')
  const timeLotteryDraw = moment('17/03/2021 07:00:00', 'DD/MM/YYYY HH:mm:ss')
  const timeUntilLotteryDraw = timeLotteryDraw.fromNow()

  const progress = (moment().diff(timeFirstReset).valueOf() / timeLotteryDraw.diff(timeFirstReset)).valueOf() * 100

  return (
    <ProgressWrapper>
      <BorderLinearProgress variant="determinate" value={progress} />
      <TopTextWrapper>
        <Text fontSize="20px" bold color="#c8efff">
          {lotteryHasDrawn ? TranslateString(0, 'Until ticket sale') : TranslateString(0, 'Lottery draw')}
        </Text>
        <StyledPrimaryText fontSize="20px" bold color="#FFFFFF">
          {lotteryHasDrawn ? timeUntilTicketSale : timeUntilLotteryDraw}
        </StyledPrimaryText>
      </TopTextWrapper>
      {lotteryHasDrawn && (
        <BottomTextWrapper>
          <Text color="invertedContrast">
            {timeUntilLotteryDraw} {TranslateString(0, 'Until lottery draw')}
          </Text>
        </BottomTextWrapper>
      )}
    </ProgressWrapper>
  )
}

export default LotteryProgress
