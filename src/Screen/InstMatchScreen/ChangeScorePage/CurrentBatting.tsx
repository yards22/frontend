import { Card, Table } from '@mantine/core'
import { Observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { MBatsman } from '../../../Logic/Model/MInstantMatch'
import { useStores } from '../../../Logic/Providers/StoresProviders'

const SCurrentBatting = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`

const currentScoreBattingRow = (batsMan:MBatsman)=>(
    <tr key={batsMan.batsmanName}>
      <td>{batsMan.batsmanName}{batsMan.isStriker?"*":""}</td>
      <td style={{textAlign:"center"}}>{batsMan.runsScored}</td>
      <td style={{textAlign:"center"}}>{batsMan.ballsFaced}</td>
      <td style={{textAlign:"center"}}>{batsMan.noOfFours}</td>
      <td style={{textAlign:"center"}}>{batsMan.noOfSixes}</td>
      <td style={{textAlign:"center"}}>{batsMan.strikeRate}</td>
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
                                    {currentScoreBattingRow({batsmanName:"sai",runsScored:100,ballsFaced:51,noOfFours:4,noOfSixes:5,strikeRate:12.5,isNonStriker:false,isStriker:true})}
                                    {currentScoreBattingRow({batsmanName:"chand",runsScored:100,ballsFaced:51,noOfFours:4,noOfSixes:5,strikeRate:12.5,isNonStriker:true,isStriker:false})}
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