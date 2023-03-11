import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useStores } from '../../Logic/Providers/StoresProviders'
import { createBatsManInstantMatch, createBowlerInstantMatch } from '../../Logic/Utils/InstantMatchUtil'
import BasicMatchDetails from './BasicMatchDetails'
import OpeningPlayerDetails from './OpeningPlayerDetails'
import TheScoreCard from './ChangeScorePage/ChangeScorePageIndex'

const SInstMatchIndex = styled.div`
  display: flex;
  width: 100%;
  padding-top: 10px;
`

const BASIC_MATCH_DETAILS = "basicMatchDetails"
const OPENING_PLAYERS_DETAILS = "openingPlayersDetails"

function InstMatchIndex() {
  const [currentSubRoute,setCurrentRoute] = useState(BASIC_MATCH_DETAILS)
  //first sub route values
  const [hostTeam,setHostTeam] = useState("")
  const [visitorTeam,setVisitorTeam] = useState("")
  const [tossWonTeam,setTossWonTeam] = useState("")
  const [teamOptedTo,setTeamOptedTo] = useState("")
  const [noOfOvers,setNoOfOvers] = useState("")

  const stores = useStores()
  const navigate = useNavigate()

  function getBattingOrder():string[]{
    if((tossWonTeam===hostTeam && teamOptedTo==="bat") || (tossWonTeam===visitorTeam && teamOptedTo==="bowl")){
      //setting up host team bat
      return [hostTeam,visitorTeam]
    }else{
        //setting up host team bowl
        return [visitorTeam,hostTeam]
    }
  }

  function handleChangeRouteToOpeningPlayerDetails(hostTeam:string,visitorTeam:string,tossWonTeam:string,teamOptedTo:string,noOfOvers:string){
    setHostTeam(hostTeam)
    setVisitorTeam(visitorTeam)
    if(tossWonTeam==="hostTeam"){
      setTossWonTeam(hostTeam)
    }else{
      setTossWonTeam(visitorTeam)
    }
    setTeamOptedTo(teamOptedTo)
    setNoOfOvers(noOfOvers)
    setCurrentRoute(OPENING_PLAYERS_DETAILS)
  }

  function handleChangeRouteToScoreCard(strikerBatsmanName:string,nonStrikerBatsmanName:string,currentBowlerName:string){
      let battingOrder = getBattingOrder();
      let tossEvent = `${tossWonTeam} won the toss and decided to ${teamOptedTo}`
      stores.instantMatchStore.CreateNewMatch({
        owner_id : stores.authStore.user ? stores.authStore.user.user_id : 1,
        visitor_team : visitorTeam,
        host_team : hostTeam,
        total_overs : parseInt(noOfOvers),
        venue : "ground",
        toss_details : {
          toss_won_by : tossWonTeam,
          opted_to : teamOptedTo
        },
        players_in_action :{
          bowler : createBowlerInstantMatch(currentBowlerName,true),
          striker_batsman : createBatsManInstantMatch(strikerBatsmanName,true,false),
          non_striker_batsman : createBatsManInstantMatch(nonStrikerBatsmanName,false,true),
        },
         current_innings : 1,
         batting_order : battingOrder,
         innings_one : {
          score : 0,
          wickets : 0,
          run_rate : 0,
        },
        innings_two : {
          score : 0,
          wickets : 0,
          run_rate : 0,
        },
        overs : 0,
        balls : 0,
        current_over : [],
      }).then(e => {
        navigate(`/instantMatch/${e}`)
      })
  }

  return (
    <SInstMatchIndex>
       { currentSubRoute === BASIC_MATCH_DETAILS && <BasicMatchDetails handleChangeRouteToOpeningPlayerDetails={handleChangeRouteToOpeningPlayerDetails}/> }
       { currentSubRoute === OPENING_PLAYERS_DETAILS && <OpeningPlayerDetails handleChangeRouteToScoreCard={handleChangeRouteToScoreCard}/> }
    </SInstMatchIndex>
  )
}

export default InstMatchIndex