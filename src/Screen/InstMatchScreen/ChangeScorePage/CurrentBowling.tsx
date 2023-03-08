import { Card, Table } from '@mantine/core';
import { Observer } from 'mobx-react-lite';
import React from 'react'
import styled from 'styled-components'
import { MBowlerInstantMatch } from '../../../Logic/Model/MInstantMatch';
import { useStores } from '../../../Logic/Providers/StoresProviders'


const SCurrentBowling = styled.div`
    width: 100%;
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
`


const currentScoreBowlingRow = (bowler:MBowlerInstantMatch)=>(
    <tr key={bowler.name}>
      <td>{bowler.name}{"*"}</td>
      <td style={{textAlign:"center"}}>{bowler.overs}</td>
      <td style={{textAlign:"center"}}>{bowler.maiden}</td>
      <td style={{textAlign:"center"}}>{bowler.runs}</td>
      <td style={{textAlign:"center"}}>{bowler.wicket}</td>
      <td style={{textAlign:"center"}}>{bowler.balls}</td>
    </tr>
)

function CurrentBowling() {

  const stores = useStores();

  return (
    <Observer>
        { () =>{
            const {instantMatchStore} = stores
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
                                {currentScoreBowlingRow(instantMatchStore.currentInstantMatch.players_in_action.bowler)}
                            </tbody>
                        </Table>
                    </Card>
                </SCurrentBowling>
            )
        }
            
        }
    </Observer>
  )
}

export default CurrentBowling