import { Button, Card } from '@mantine/core';
import React,{useState} from 'react'
import { useStores } from '../../../Logic/Providers/StoresProviders';

function RunsInBall() {
    const stores = useStores();
    const [isZeroRuns,setIsZeroRuns] = useState(false)
    const [isOneRun,setIsOneRun] = useState(false)
    const [isTwoRuns,setIsTwoRuns] = useState(false)
    const [isThreeRuns,setIsThreeRuns] = useState(false)
    const [isFourRuns,setIsFourRuns] = useState(false)
    const [isFiveRuns,setIsFiveRuns] = useState(false)
    const [isSixRuns,setIsSixRuns] = useState(false)
    const [isCustomRuns,setIsCustomRuns] = useState(false)
    const [customRuns,setCustomRuns] = useState("...")

    function handleZeroRuns(){
      setIsZeroRuns(!isZeroRuns)
      setIsOneRun(false)
      setIsTwoRuns(false)
      setIsThreeRuns(false)
      setIsFourRuns(false)
      setIsFiveRuns(false)
      setIsSixRuns(false)
      setIsCustomRuns(false)
      setCustomRuns("...")
    }

    function handleOneRun(){
      setIsOneRun(!isOneRun)
      setIsZeroRuns(false)
      setIsTwoRuns(false)
      setIsThreeRuns(false)
      setIsFourRuns(false)
      setIsFiveRuns(false)
      setIsSixRuns(false)
      setIsCustomRuns(false)
      setCustomRuns("...")
    }

    function handleTwoRuns(){
      setIsTwoRuns(!isTwoRuns)
      setIsZeroRuns(false)
      setIsOneRun(false)
      setIsThreeRuns(false)
      setIsFourRuns(false)
      setIsFiveRuns(false)
      setIsSixRuns(false)
      setIsCustomRuns(false)
      setCustomRuns("...")
    }

    function handleThreeRuns(){
      setIsThreeRuns(!isThreeRuns)
      setIsZeroRuns(false)
      setIsOneRun(false)
      setIsTwoRuns(false)
      setIsFourRuns(false)
      setIsFiveRuns(false)
      setIsSixRuns(false)
      setIsCustomRuns(false)
      setCustomRuns("...")
    }

    function handleFourRuns(){
      setIsFourRuns(!isFourRuns)
      setIsZeroRuns(false)
      setIsOneRun(false)
      setIsTwoRuns(false)
      setIsThreeRuns(false)
      setIsFiveRuns(false)
      setIsSixRuns(false)
      setIsCustomRuns(false)
      setCustomRuns("...")
    }

    function handleFiveRuns(){
      setIsFiveRuns(!isFiveRuns)
      setIsZeroRuns(false)
      setIsOneRun(false)
      setIsTwoRuns(false)
      setIsThreeRuns(false)
      setIsFourRuns(false)
      setIsSixRuns(false)
      setIsCustomRuns(false)
      setCustomRuns("...")
    }

    function handleSixRuns(){
      setIsSixRuns(!isSixRuns)
      setIsZeroRuns(false)
      setIsOneRun(false)
      setIsTwoRuns(false)
      setIsThreeRuns(false)
      setIsFourRuns(false)
      setIsFiveRuns(false)
      setIsCustomRuns(false)
      setCustomRuns("...")
    }

    function handleCustomRuns(){
      setIsCustomRuns(!isCustomRuns)
      setIsZeroRuns(false)
      setIsOneRun(false)
      setIsTwoRuns(false)
      setIsThreeRuns(false)
      setIsFourRuns(false)
      setIsFiveRuns(false)
      setIsSixRuns(false)
    }

    return (
      <Card
          shadow={!stores.appStore.isPhone ? "md" : "xs"}
          radius={"md"}
          withBorder={!stores.appStore.isPhone}
          style={{
              width : "65%",
              padding : "10px",
              marginTop : "10px",
              marginRight : "2px",
              display : "flex",
              flexDirection : "column"
          }}
      >
        <div style={{display : "flex",justifyContent:"space-around",width:"100%", marginBottom:"10px"}}>
          <Button 
              style={{
                borderRadius:"60%", height:"40px",width:"40px",padding:"0px"
              }} 
              variant={`${isZeroRuns?"filled":"outline"}`}
              onClick={handleZeroRuns}
          >
            0
          </Button>
          <Button 
              style={{
                borderRadius:"60%", height:"40px",width:"40px",padding:"0px"
              }} 
              variant={`${isOneRun?"filled":"outline"}`}
              onClick={handleOneRun}
            >
              1
            </Button>
          <Button 
              style={{
                borderRadius:"60%", height:"40px",width:"40px",padding:"0px"
              }} 
              variant={`${isTwoRuns?"filled":"outline"}`}
              onClick={handleTwoRuns}
            >
              2
          </Button>
          <Button 
            style={{
              borderRadius:"60%", height:"40px",width:"40px",padding:"0px"
            }} 
            variant={`${isThreeRuns?"filled":"outline"}`}
            onClick={handleThreeRuns}
          >
            3
          </Button>
        </div>
        <div style={{display : "flex",justifyContent:"space-around",width:"100%"}}>
          <Button 
            style={{
              borderRadius:"60%", height:"40px",width:"40px",padding:"0px"
            }} 
            variant={`${isFourRuns?"filled":"outline"}`}
            onClick={handleFourRuns}
          >
            4
          </Button>
          <Button 
            style={{
              borderRadius:"60%", height:"40px",width:"40px",padding:"0px"}} 
              variant={`${isFiveRuns?"filled":"outline"}`}
              onClick={handleFiveRuns}
            >
              5
            </Button>
          <Button 
            style={{
              borderRadius:"60%", height:"40px",width:"40px",padding:"0px"
            }} 
            variant={`${isSixRuns?"filled":"outline"}`}
            onClick={handleSixRuns}
          >
            6
          </Button>
          <Button 
            style={{
              borderRadius:"60%", height:"40px",width:"40px",padding:"0px"
            }} 
            variant={`${isCustomRuns?"filled":"outline"}`}
            onClick={handleCustomRuns}
          >
            {customRuns}
          </Button>
        </div>
          
      </Card>
   )
}

export default RunsInBall