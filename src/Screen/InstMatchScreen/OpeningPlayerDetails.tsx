import { Button, Card } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useState } from 'react'
import styled from 'styled-components'
import { useStores } from '../../Logic/Providers/StoresProviders'

const SOpeningPlayerDetails = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0px 5px 10px 5px;
`

interface OpeningPlayerDetailsProps{
    handleChangeRouteToScoreCard : (a:string,b:string,c:string)=>void
}

function OpeningPlayerDetails(props:OpeningPlayerDetailsProps) {
    const [strikerBatsman,setStrikerBatsman] = useState("")
    const [nonStrikerBatsman,setNonStrikerBatsman] = useState("")
    const [openingBowler,setOpeningBowler] = useState("")

    const stores=useStores()

    function handleChangeRouteToScoreCard(){
        if(strikerBatsman===""){
            showNotification({
                message : "Striker Name Can't be empty",
                color : "red"
            })
            return
        }
        if(nonStrikerBatsman===""){
            showNotification({
                message : "Non Striker Name cannot be empty",
                color : "red"
            })
            return
        }
        if(openingBowler===""){
            showNotification({
                message : "Opening Bowler Name Cannot be Empty",
                color : "red"
            })
            return
        }
        props.handleChangeRouteToScoreCard(strikerBatsman,nonStrikerBatsman,openingBowler)
    }
    return (
        <SOpeningPlayerDetails>
         <>
                <Card 
                    shadow={!stores.appStore.isPhone ? "md" : "xs"}
                    p="lg"
                    radius={"md"}
                    withBorder={!stores.appStore.isPhone}
                    style={{
                        width : "100%",
                    }}
                >
                    <h4 style={{ marginBottom:"10px"}}>Striker Batsman</h4>
                    <input
                        onChange={(e)=> setStrikerBatsman(e.target.value)}
                        type={"text"} 
                        style={{
                                marginBottom : "15px",
                                height : "25px",
                                border : "none",
                                borderBottom : "1px solid black",
                                width : "100%",
                                outline : "none",
                                fontSize : "15px"
                        }}
                        placeholder = "Striker Batsman Name"
                    />
                    <h4 style={{ marginBottom:"10px"}}>Non-Striker Batsman</h4>
                    <input
                        type={"text"} 
                        onChange={(e)=>setNonStrikerBatsman(e.target.value)}
                        style={{
                                height : "25px",
                                border : "none",
                                borderBottom : "1px solid black",
                                width : "100%",
                                outline : "none",
                                fontSize : "15px",
                                marginBottom :"15px"
                        }}
                        placeholder = "Non Striker Batsman Name"
                    />
                    <h4 style={{ marginBottom:"10px"}}>Opening Bowler</h4>
                    <input
                        type={"text"} 
                        onChange={(e)=>setOpeningBowler(e.target.value)}
                        style={{
                                height : "25px",
                                border : "none",
                                borderBottom : "1px solid black",
                                width : "100%",
                                outline : "none",
                                fontSize : "15px",
                                marginBottom : "15px"
                        }}
                        placeholder = "Opening Bowler Name"
                    />
                </Card>
                <Button mt={"md"} onClick={handleChangeRouteToScoreCard}>
                    Start Match
                </Button>
            </>
    </SOpeningPlayerDetails>
  )
}

export default OpeningPlayerDetails