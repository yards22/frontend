import { Card } from '@mantine/core'
import { Observer } from 'mobx-react-lite'
import React from 'react'
import { Table } from 'react-feather'
import styled from 'styled-components'
import { MBatsman } from '../../../Logic/Model/MInstantMatch'
import { useStores } from '../../../Logic/Providers/StoresProviders'

const SCurrentBatting = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const currentScoreBattingRow = (batsMan:MBatsman)=>(
    <tr key={batsMan.batsmanName}>
      <td>{batsMan.batsmanName}</td>
      <td>{batsMan.runsScored}</td>
      <td>{batsMan.ballsFaced}</td>
      <td>{batsMan.noOfFours}</td>
      <td>{batsMan.noOfSixes}</td>
      <td>{batsMan.strikeRate}</td>
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
                            <p>CurrentBatting : Team {instantMatchStore.currentMatch?.currentBatingTeam}</p>
                            <Card
                               shadow={!stores.appStore.isPhone ? "md" : "xs"}
                               p="lg"
                               radius={"md"}
                               withBorder={!stores.appStore.isPhone}
                               style={{
                                   width : "100%",
                               }}
                            >
                                <Table>
                                   
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