import { Button, Card, Input, Radio } from '@mantine/core'
import styled from 'styled-components'
import { useStores } from '../../Logic/Providers/StoresProviders'
import { useState } from 'react'

const SBasicMatchDetails = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0px 5px 10px 5px;
`

interface BasicMatchDetailsProps{
    handleChangeTheSubRouteNext : ()=>void
}

function BasicMatchDetails(props:BasicMatchDetailsProps) {
    const [hostTeamName,setHostTeamName] = useState("Host Team")
    const [visitorTeamName,setVisitorTeamName] = useState("Visitor Team")
    const [noOfOvers,setNoOfOvers] = useState("10")

    const stores = useStores();
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
                        >
                        <Radio value={hostTeamName} label={hostTeamName} />
                        <Radio value={visitorTeamName} label={visitorTeamName} />
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
            <Button mt={"md"} onClick={()=>props.handleChangeTheSubRouteNext()}>
                    Start Match
            </Button>
        </SBasicMatchDetails>
    )
}

export default BasicMatchDetails