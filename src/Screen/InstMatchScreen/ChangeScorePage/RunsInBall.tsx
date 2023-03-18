import { Button, Card, Modal } from '@mantine/core';
import { Observer } from 'mobx-react-lite';
import React,{useState} from 'react'
import { useStores } from '../../../Logic/Providers/StoresProviders';

interface IRunsInBall{
  handleBallUpdate : (a:number)=>void
}

function RunsInBall(props:IRunsInBall) {
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
    const [openTheCustomRunsModel,setOpenTheCustomModel] = useState(false)
    const [tempCustomRuns,setTempRunsCustom] = useState("1")

    function handleZeroRuns(){
      setIsZeroRuns(true)
      setIsOneRun(false)
      setIsTwoRuns(false)
      setIsThreeRuns(false)
      setIsFourRuns(false)
      setIsFiveRuns(false)
      setIsSixRuns(false)
      setIsCustomRuns(false)
      setCustomRuns("...")
      props.handleBallUpdate(0)
    }

    function handleOneRun(){
      setIsOneRun(true)
      setIsZeroRuns(false)
      setIsTwoRuns(false)
      setIsThreeRuns(false)
      setIsFourRuns(false)
      setIsFiveRuns(false)
      setIsSixRuns(false)
      setIsCustomRuns(false)
      setCustomRuns("...")
      props.handleBallUpdate(1)
    }

    function handleTwoRuns(){
      setIsTwoRuns(true)
      setIsZeroRuns(false)
      setIsOneRun(false)
      setIsThreeRuns(false)
      setIsFourRuns(false)
      setIsFiveRuns(false)
      setIsSixRuns(false)
      setIsCustomRuns(false)
      setCustomRuns("...")
      props.handleBallUpdate(2)
    }

    function handleThreeRuns(){
      setIsThreeRuns(true)
      setIsZeroRuns(false)
      setIsOneRun(false)
      setIsTwoRuns(false)
      setIsFourRuns(false)
      setIsFiveRuns(false)
      setIsSixRuns(false)
      setIsCustomRuns(false)
      setCustomRuns("...")
      props.handleBallUpdate(3)
    }

    function handleFourRuns(){
      setIsFourRuns(true)
      setIsZeroRuns(false)
      setIsOneRun(false)
      setIsTwoRuns(false)
      setIsThreeRuns(false)
      setIsFiveRuns(false)
      setIsSixRuns(false)
      setIsCustomRuns(false)
      setCustomRuns("...")
      props.handleBallUpdate(4)
    }

    function handleFiveRuns(){
      setIsFiveRuns(true)
      setIsZeroRuns(false)
      setIsOneRun(false)
      setIsTwoRuns(false)
      setIsThreeRuns(false)
      setIsFourRuns(false)
      setIsSixRuns(false)
      setIsCustomRuns(false)
      setCustomRuns("...")
      props.handleBallUpdate(5)
    }

    function handleSixRuns(){
      setIsSixRuns(true)
      setIsZeroRuns(false)
      setIsOneRun(false)
      setIsTwoRuns(false)
      setIsThreeRuns(false)
      setIsFourRuns(false)
      setIsFiveRuns(false)
      setIsCustomRuns(false)
      setCustomRuns("...")
      props.handleBallUpdate(6)
    }

    function handleCustomRuns(){
      setIsCustomRuns(true)
      setIsZeroRuns(false)
      setIsOneRun(false)
      setIsTwoRuns(false)
      setIsThreeRuns(false)
      setIsFourRuns(false)
      setIsFiveRuns(false)
      setIsSixRuns(false)
      setOpenTheCustomModel(true)
      if(customRuns!=="..."){
        setTempRunsCustom(customRuns)
      }
    }

    return (
      <Observer>
        {()=>{
            return(
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
                <Modal
                  opened={openTheCustomRunsModel}
                  onClose={()=>{
                      setOpenTheCustomModel(false)
                      setIsCustomRuns(false)
                    }}
        
                >
                  <div style={{display:"flex",flexDirection:"column"}}>
                    <label>Enter Custom Runs</label>
                    <input type={"number"} id="customRuns" onChange={(e)=>setTempRunsCustom(e.target.value)}/>
                    <Button mt={"lg"} onClick={()=>{setOpenTheCustomModel(false);props.handleBallUpdate(parseInt(tempCustomRuns))}}>OK</Button>
                  </div>
                </Modal>
              </Card>
            )
          }
        }
      </Observer>
   )
}

export default RunsInBall