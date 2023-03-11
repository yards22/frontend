import { Button, Modal } from '@mantine/core'
import { useState } from 'react'
import styled from 'styled-components'
import { useStores } from '../../../Logic/Providers/StoresProviders'
import CurrentBallEvent from './CurrentBallEvent'
import CurrentBatting from './CurrentBatting'
import CurrentBowling from './CurrentBowling'
import CurrentOver from './CurrentOver'
import CurrentStatsIndex from './CurrentStats/CurrentStatsIndex'
import OtherDetailsButtons from './OtherDetailsButtons'
import RunsInBall from './RunsInBall'
import ScoreChangeModal from './ScoreChangeModal'

const SChangeScorePage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 10px 5px 10px 5px;
`

function ChangeScorePage() {
  const stores = useStores()
  const [showBallUpdateModel,setShowBallUpdateModel] = useState(false)
  const [isExtra,setIsExtra] = useState(false)
  const [extraType,setExtraType] = useState("")
  const [isWicket,setIsWicket] = useState(false)
  const [noOfRuns,setNumberOfRuns] = useState(0)
 

  function handleCloseBallUpdateModal(){
      setShowBallUpdateModel(false)
  }

  function handleBallEvent(isWide:boolean,isNoBall:boolean,isBye:boolean,isLegBye:boolean,isWicket:boolean){
    let extraType = "";
    if(isWide){
      extraType = "wide"
    }
    if(isNoBall){
      extraType = "noBall"
    }
    if(isBye){
      extraType = extraType+",byes"
    }
    if(isLegBye){
      extraType = extraType.split(",")[0]+",legBye"
    }
    if(extraType!==""){
      setIsExtra(true)
      setExtraType(extraType)
    }else{
      setIsExtra(false)
      setExtraType("")
    }
    setIsWicket(isWicket)

  }

  function handleBallUpdate(runs:number){
    setShowBallUpdateModel(true)
    setNumberOfRuns(runs)
  }

  return (
    <SChangeScorePage>
        <div style={{display:"flex",justifyContent:"space-between",width:"100%",alignItems:"center"}}>
            <p>Team A vs Team B</p>
        </div>
        <CurrentStatsIndex/>
        <CurrentBatting/>
        <CurrentBowling/>
        <CurrentOver/>
        <CurrentBallEvent handleBallEvent={handleBallEvent}/>
        <div style={{display:"flex",width:"100%"}}>
            <OtherDetailsButtons/>
            <RunsInBall handleBallUpdate={handleBallUpdate}/>
        </div>
        <Modal
          opened={showBallUpdateModel}
          onClose={handleCloseBallUpdateModal}
        >
          <ScoreChangeModal isWicket={isWicket} isExtra={isExtra} extraType={extraType} noOfRuns={noOfRuns}/>
        </Modal>
    </SChangeScorePage>
  )
}

export default ChangeScorePage