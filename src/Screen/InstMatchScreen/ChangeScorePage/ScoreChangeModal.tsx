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
    noOfRuns : number
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

        let updatedCurrentMatch = currentInstantMatch;
        

        // let currentBall: MScoreItem={
        //     match_id :  currentInstantMatch.match_id.toString(),
        //     owner_id : currentInstantMatch.owner_id,
        //     innings_details : {
        //         innings_id : currentInstantMatch.current_innings,
        //         overs : currentInstantMatch.
        //     }

        // };
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