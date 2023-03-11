import { Button, Card, Input, Radio } from '@mantine/core'
import styled from 'styled-components'
import { useStores } from '../../Logic/Providers/StoresProviders'
import { useState } from 'react'
import { showNotification } from '@mantine/notifications'

const SBasicMatchDetails = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0px 5px 10px 5px;
`

interface BasicMatchDetailsProps{
    handleChangeRouteToOpeningPlayerDetails : (a:string,b:string,c:string,d:string,e:string)=>void
}

function BasicMatchDetails(props:BasicMatchDetailsProps) {
    const [hostTeamName,setHostTeamName] = useState("")
    const [visitorTeamName,setVisitorTeamName] = useState("")
    const [tossWonTeam,setTossWonTeam] = useState("")
    const [teamOptedTo,setTeamOptedTo] = useState("")
    const [noOfOvers,setNoOfOvers] = useState("10")

    const stores = useStores();

    function handleChangeRouteToOpeningPlayerDetails(){
        if(hostTeamName===""){
            showNotification({
                message : "Host Team Can't be Empty",
                color : "red"
            })
            return
        }
        if(visitorTeamName===""){
            showNotification({
                message : "Visitor Team Can't be Empty",
                color : "red"
            })
            return
        }
        if(tossWonTeam===""){
            showNotification({
                message : "Choose The Toss",
                color : "red"
            })
            return
        }
        if(teamOptedTo===""){
            showNotification({
                message : `What did ${tossWonTeam} choose to?`,
                color : "red"
            })
            return
        }
        props.handleChangeRouteToOpeningPlayerDetails(hostTeamName,visitorTeamName,tossWonTeam,teamOptedTo,noOfOvers)
    }

    return (
        <SBasicMatchDetails>
            {/* Team Names */}
            <>
                <h4 
                    style={{
                        marginBottom : '5px'
                    }}>
                    Teams
                </h4>
                <Card 
                    shadow={!stores.appStore.isPhone ? "md" : "xs"}
                    p="lg"
                    radius={"md"}
                    withBorder={!stores.appStore.isPhone}
                    style={{
                        width : "100%",
                    }}
                >
                    <input
                        onChange={(e)=>e.target.value!=="" ?setHostTeamName(e.target.value):setHostTeamName("Host Team")}
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
                        placeholder = "Host Team"
                    />
                    <input
                        type={"text"} 
                        onChange={(e)=>e.target.value!=="" ?setVisitorTeamName(e.target.value):setVisitorTeamName("Visitor Team")}
                        style={{
                                height : "25px",
                                border : "none",
                                borderBottom : "1px solid black",
                                width : "100%",
                                outline : "none",
                                fontSize : "15px"
                        }}
                        placeholder = "Visitor Team"
                    />
                </Card>
            </>
            {/* Toss */}
            <>
            <h4 
                style={{
                        marginBottom : '5px'
                }}>
                    Toss Won By ?
                </h4>
                <Card 
                    shadow={!stores.appStore.isPhone ? "md" : "xs"}
                    p="lg"
                    radius={"md"}
                    withBorder={!stores.appStore.isPhone}
                    style={{
                        width : "100%",
                        padding : "5px 15px"
                    }}
                >
                    <Radio.Group
                        name="Toss"
                        withAsterisk
                        onChange={(e)=>setTossWonTeam(e)}
                        >
                        <Radio value={"hostTeam"} label={"Host Team"} />
                        <Radio value={"visitorTeam"} label={"Visitor Team"} />
                    </Radio.Group>
                </Card>
            </>
            {/* Toss won team Opted to */}
            <>
            <h4 
                style={{
                        marginBottom : '5px'
                }}>
                    Opted to ?
                </h4>
                <Card 
                    shadow={!stores.appStore.isPhone ? "md" : "xs"}
                    p="lg"
                    radius={"md"}
                    withBorder={!stores.appStore.isPhone}
                    style={{
                        width : "100%",
                        padding : "5px 15px"
                    }}
                >
                    <Radio.Group
                        name="Opted"
                        withAsterisk
                        onChange={(e)=>setTeamOptedTo(e)}
                        >
                        <Radio value={"bat"} label={"Bat"} />
                        <Radio value={"bowl"} label={"Bowl"} />
                    </Radio.Group>
                </Card>
            </>
             {/* No of Overs */}
             <>
                <h4 
                    style={{
                        marginBottom : '5px'
                    }}>
                    No of Overs
                </h4>
                <Card 
                    shadow={!stores.appStore.isPhone ? "md" : "xs"}
                    p="lg"
                    radius={"md"}
                    withBorder={!stores.appStore.isPhone}
                    style={{
                        width : "100%",
                    }}
                >
                    <input
                        onChange={(e)=>{
                            if(e.target.value.length<3){
                                setNoOfOvers(e.target.value)}
                            }
                        }
                        onBlur={(e)=>{
                            if(noOfOvers===""){
                                setNoOfOvers("10")
                            }
                        }}
                        type={"text"}
                        value={noOfOvers} 
                        style={{
                                marginBottom : "15px",
                                height : "25px",
                                border : "none",
                                borderBottom : "1px solid black",
                                width : "100%",
                                outline : "none",
                                fontSize : "15px"
                        }}
                        placeholder = "10"
                    />
                </Card>
            </>
            <Button mt={"md"} onClick={handleChangeRouteToOpeningPlayerDetails}>
                    Start Match
            </Button>
        </SBasicMatchDetails>
    )
}

export default BasicMatchDetails