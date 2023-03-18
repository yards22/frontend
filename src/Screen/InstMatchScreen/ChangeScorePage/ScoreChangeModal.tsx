import { Button, Input, Select } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import React, { useState } from 'react'
import styled from 'styled-components'
import { MScoreItem } from '../../../Logic/Model/MInstantMatch'
import { useStores } from '../../../Logic/Providers/StoresProviders'

interface IScoreChangeModel{
    isWicket : boolean,
    isExtra : boolean,
    extraType : string,
    noOfRuns : number,
    handleCloseBallUpdateModal : () => void,
}

const SScoreChangeModal = styled.div`
    display: flex;
    flex-direction: column;
`
let wicketTypeData = [
    { value: 'bowled', label: 'Bowled' },
    { value: 'catchOut', label: 'Catch Out' },
    { value: 'runOutStriker', label: 'Run out Striker' },
    { value: 'runOutNonStriker', label: 'Run out non-striker' },
    { value: 'stumping', label: 'Stumping' },
    { value: 'lbw', label: 'LBW' },
    { value : 'hitWicket',label:"Hit Wicket"}
]

function ScoreChangeModal(props:IScoreChangeModel) {
    const [wicketType,setWicketType] = useState("")
    const [whoHelpedForWicket,setWhoHelpedForWicket] = useState("")
    const [newBatsman,setNewBatsman] = useState("")
    const stores = useStores()
    const {instantMatchStore} = stores
    const {currentInstantMatch} = instantMatchStore

    function handleAddBall(){
        if(props.isWicket){
            if(wicketType !== "bowled" && wicketType !== "lbw" && wicketType !== "hitWicket"){
                if(whoHelpedForWicket===""){
                    showNotification({
                        message : "Enter the Helped Player Name",
                        color : "red"
                    })
                    return
                }
                if(newBatsman===""){
                    showNotification({
                        message : "Enter New Batsman Name",
                        color : "red"
                    })
                    return
                }
            }
        }

        let updatedCurrentMatch = currentInstantMatch

        //increase the ball by 1 if it is not wide and no ball
        if(!props.isExtra || (props.isExtra && props.extraType.split(",")[0]!=="wide" && props.extraType.split(",")[0]!== "noBall")){
            updatedCurrentMatch.balls +=1;
        }

        //if reached over end
        if(updatedCurrentMatch.balls===6){
            updatedCurrentMatch.overs+=1;
            updatedCurrentMatch.balls=0;
        }

      
        if(updatedCurrentMatch.current_innings === 1){
            //increasing team score by runs
            updatedCurrentMatch.innings_one.score += props.noOfRuns;

            //if extra then add one more to score
            if(props.isExtra && props.extraType.split(",")[0]==="wide" && props.extraType.split(",")[0]=== "noBall"){
                updatedCurrentMatch.innings_one.score += 1;
            }

            //odd runs striker exchange
            if((updatedCurrentMatch.balls !== 0 && props.noOfRuns%2===1) || (updatedCurrentMatch.balls === 0 && props.noOfRuns%2===0)){
                let st = updatedCurrentMatch.players_in_action.striker_batsman
                updatedCurrentMatch.players_in_action.striker_batsman = updatedCurrentMatch.players_in_action.non_striker_batsman
                updatedCurrentMatch.players_in_action.non_striker_batsman = st;
            }
            
        }else{
            updatedCurrentMatch.innings_two.score += props.noOfRuns;
        }
       
        //innings change if reached total overs
        if(updatedCurrentMatch.overs = currentInstantMatch.total_overs){
            updatedCurrentMatch.current_innings = 2;
        }

        instantMatchStore.SetCurrentMatch(updatedCurrentMatch)

        console.log(updatedCurrentMatch)
        props.handleCloseBallUpdateModal()
    }

    return (
        <SScoreChangeModal>
            <p>No of Runs in this Ball : {props.noOfRuns}</p>
            <p>Extras : {`${props.isExtra ? props.extraType : "no Extra"}`}</p>
            {
                props.isWicket && 
                <div>
                    <Select 
                        label="Select Wicket Type"
                        placeholder='Wicket Type'
                        data={wicketTypeData}
                        onChange={(e)=>setWicketType(e || "")}
                    />
                    {
                        wicketType !== "bowled" && wicketType !== "lbw" && wicketType !== "hitWicket" && 
                        <>
                            <Input.Wrapper label="Who Helped">
                                <Input onChange={(e)=>setWhoHelpedForWicket(e.target.value)}/>
                            </Input.Wrapper>
                            <Input.Wrapper label="New Batsman">
                                <Input onChange={(e)=>setNewBatsman(e.target.value)}/>
                            </Input.Wrapper>
                        </>
                    }
                </div>
            }
            <Button mt={"lg"} onClick={handleAddBall}>ADD BALL</Button>
        </SScoreChangeModal>
    )
}

export default ScoreChangeModal