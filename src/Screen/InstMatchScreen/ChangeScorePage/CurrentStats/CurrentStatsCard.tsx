import { Card } from '@mantine/core';
import React from 'react'
import { useStores } from '../../../../Logic/Providers/StoresProviders'

interface ICurrentStatsCard{
  score : number,
  wickets : number,
  run_rate : number,
  teamName : string,
  innings : number,
  overs : number,
  balls : number
}

function CurrentStatsCard(props:ICurrentStatsCard) {

    const stores = useStores();
  return (
    <Card
        shadow={!stores.appStore.isPhone ? "md" : "xs"}
        radius={"md"}
        withBorder={!stores.appStore.isPhone}
        style={{
            width : "100%",
            padding : "5px 50px 5px 20px",
            display : "flex",
            marginTop : '5px'
        }}
    >   
        <div style={{
                display :"flex",
                flexDirection : "column",
                justifyContent : "space-around",
                width : "100%",
              
             }}>
             <h5 style={{margin:"0px"}}>{props.teamName.toUpperCase()}, Innings {props.innings}</h5>
             <h1 style={{margin:"0px",fontWeight:"200"}}>{props.score} - {props.wickets} ({props.overs}.{props.balls})</h1>
             
        </div>
        <div style={{
                display :"flex",
                flexDirection : "column",
                justifyContent : "space-around",
                alignItems : "end",
                width : "100%",
             }}>
             <h5 style={{margin:"0px",fontWeight:"400"}}>CRR</h5>
             <h5 style={{margin:"0px",fontWeight:"400"}}>{props.run_rate}</h5>
        </div>

    </Card>
  )
}

export default CurrentStatsCard