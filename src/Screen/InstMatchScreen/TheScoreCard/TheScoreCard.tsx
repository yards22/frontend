import React from 'react'
import styled from 'styled-components'
import { useStores } from '../../../Logic/Providers/StoresProviders'
import CurrentBatting from './CurrentBatting'
import CurrentBowling from './CurrentBowling'

const STheScoreCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 10px 5px 10px 5px;
`

function TheScoreCard() {
  const stores = useStores()

  return (
    <STheScoreCard>
        <p>{stores.instantMatchStore.currentMatch?.events[stores.instantMatchStore.currentMatch?.events.length-1]}</p>
        <CurrentBatting/>
        <CurrentBowling/>
    </STheScoreCard>
  )
}

export default TheScoreCard