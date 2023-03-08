import React from 'react'
import styled from 'styled-components'
import { useStores } from '../../../Logic/Providers/StoresProviders'
import CurrentBallEvent from './CurrentBallEvent'
import CurrentBatting from './CurrentBatting'
import CurrentBowling from './CurrentBowling'
import CurrentOver from './CurrentOver'
import CurrentStats from './CurrentStats'
import OtherDetailsButtons from './OtherDetailsButtons'
import RunsInBall from './RunsInBall'

const SChangeScorePage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 10px 5px 10px 5px;
`

function ChangeScorePage() {
  const stores = useStores()

  return (
    <SChangeScorePage>
        <p>Team A vs Team B</p>
        <CurrentStats/>
        <CurrentBatting/>
        <CurrentBowling/>
        <CurrentOver/>
        <CurrentBallEvent/>
        <div style={{display:"flex",width:"100%"}}>
            <OtherDetailsButtons/>
            <RunsInBall/>
        </div>
    </SChangeScorePage>
  )
}

export default ChangeScorePage