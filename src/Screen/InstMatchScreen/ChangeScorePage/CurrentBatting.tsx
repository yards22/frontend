import { Card, Table } from '@mantine/core'
import { Observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { MBatsmanInstantMatch } from '../../../Logic/Model/MInstantMatch'
import { useStores } from '../../../Logic/Providers/StoresProviders'

const SCurrentBatting = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`

const currentScoreBattingRow = (batsMan:MBatsmanInstantMatch)=>(
    <tr key={batsMan.name}>
      <td>{batsMan.name}{batsMan.strike_rate ? "*" : ""}</td>
      <td style={{textAlign:"center"}}>{batsMan.runs}</td>
      <td style={{textAlign:"center"}}>{batsMan.balls}</td>
      <td style={{textAlign:"center"}}>{batsMan.fours}</td>
      <td style={{textAlign:"center"}}>{batsMan.sixes}</td>
      <td style={{textAlign:"center"}}>{batsMan.strike_rate}</td>
    </tr>
)

function CurrentBatting() {
    const stores = useStores()

    return(
        <Observer>
            {()=>{
                const {instantMatchStore} = stores
                return (
                        <SCurrentBatting>
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
                                            <th >Batsman</th>
                                            <th style={{textAlign:"center"}}>R</th>
                                            <th style={{textAlign:"center"}}>B</th>
                                            <th style={{textAlign:"center"}}>4s</th>
                                            <th style={{textAlign:"center"}}>6s</th>
                                            <th style={{textAlign:"center"}}>SR</th>
                                        </tr>
                                    </thead>
                                <tbody>
                                    {currentScoreBattingRow(instantMatchStore.currentInstantMatch.players_in_action.striker_batsman)}
                                    {currentScoreBattingRow(instantMatchStore.currentInstantMatch.players_in_action.non_striker_batsman)}
                                </tbody>
                               </Table>
                            </Card>
                        </SCurrentBatting>
                    )
                }
            }
        </Observer>
    )
}

export default CurrentBatting