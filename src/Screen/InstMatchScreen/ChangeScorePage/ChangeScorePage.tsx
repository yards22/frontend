import React from 'react'
import styled from 'styled-components'
import { useStores } from '../../../Logic/Providers/StoresProviders'
import CurrentBatting from './CurrentBatting'
import CurrentBowling from './CurrentBowling'
import CurrentOver from './CurrentOver'
import CurrentStats from './CurrentStats'

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
    </SChangeScorePage>
  )
}

export default ChangeScorePage