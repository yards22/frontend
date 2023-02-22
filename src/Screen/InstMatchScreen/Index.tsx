import React, { useState } from 'react'
import styled from 'styled-components'
import BasicMatchDetails from './BasicMatchDetails'
import OpeningPlayerDetails from './OpeningPlayerDetails'
import TheScoreCard from './TheScoreCard'

const SInstMatchIndex = styled.div`
  display: flex;
  width: 100%;
  padding-top: 10px;
`

const BASIC_MATCH_DETAILS = "basicMatchDetails"
const OPENING_PLAYERS_DETAILS = "openingPlayersDetails"
const SCORECARD = "scorecard"

function InstMatchIndex() {
  const [currentSubRoute,setCurrentRoute] = useState(BASIC_MATCH_DETAILS)

  function handleChangeTheSubRouteNext(){
    if(currentSubRoute===BASIC_MATCH_DETAILS){
      setCurrentRoute(OPENING_PLAYERS_DETAILS)
    }else{
      setCurrentRoute(SCORECARD)
    }
  }

  return (
    <SInstMatchIndex>
       { currentSubRoute === BASIC_MATCH_DETAILS && <BasicMatchDetails handleChangeTheSubRouteNext={handleChangeTheSubRouteNext}/> }
       { currentSubRoute === OPENING_PLAYERS_DETAILS && <OpeningPlayerDetails handleChangeTheSubRouteNext={handleChangeTheSubRouteNext}/> }
       { currentSubRoute === SCORECARD && <TheScoreCard/> }
    </SInstMatchIndex>
  )
}

export default InstMatchIndex