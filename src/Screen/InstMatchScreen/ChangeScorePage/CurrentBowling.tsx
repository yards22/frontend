import { Card, Table } from '@mantine/core';
import React from 'react'
import styled from 'styled-components'
import { MBowler } from '../../../Logic/Model/MInstantMatch';
import { useStores } from '../../../Logic/Providers/StoresProviders'


const SCurrentBowling = styled.div`
    width: 100%;
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
`


const currentScoreBowlingRow = (bowler:MBowler)=>(
    <tr key={bowler.bowlerName}>
      <td>{bowler.bowlerName}{"*"}</td>
      <td style={{textAlign:"center"}}>{bowler.noOfOvers}</td>
      <td style={{textAlign:"center"}}>{bowler.noOfMaidenOvers}</td>
      <td style={{textAlign:"center"}}>{bowler.noOfRunsGiven}</td>
      <td style={{textAlign:"center"}}>{bowler.noOfWickets}</td>
      <td style={{textAlign:"center"}}>{bowler.economyRate}</td>
    </tr>
)

function CurrentBowling() {

  const stores = useStores();

  
  
  return (
    <SCurrentBowling>
        <Card
            shadow={!stores.appStore.isPhone ? "md" : "xs"}
            radius={"md"}
            withBorder={!stores.appStore.isPhone}
            style={{
                width : "100%",
                padding : "0px"
            }}
        >  
            <Table>
                <thead>
                    <tr>
                        <th >Bowler</th>
                        <th style={{textAlign:"center"}}>O</th>
                        <th style={{textAlign:"center"}}>M</th>
                        <th style={{textAlign:"center"}}>R</th>
                        <th style={{textAlign:"center"}}>W</th>
                        <th style={{textAlign:"center"}}>ER</th>
                    </tr>
                </thead>
                <tbody>
                    {currentScoreBowlingRow({bowlerName:"sai",noOfRunsGiven:100,noOfOvers:5.1,noOfMaidenOvers:4,noOfWickets:5,economyRate:12.5,isCurrentBowler:true})}
                </tbody>
             </Table>
        </Card>
    </SCurrentBowling>
  )
}

export default CurrentBowling