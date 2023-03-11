import { Button, Card, Checkbox } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { useStores } from '../../../Logic/Providers/StoresProviders'

function CurrentBallEvent() {
    const [isWide,setIsWide] = useState(false)
    const [isNoBall,setIsNoBall] = useState(false)
    const [isByes,setIsByes] = useState(false)
    const [isLegByes,setIsLegByes] = useState(false)
    const [isWicket,setIsWicket] = useState(false)

    const stores = useStores();

    useEffect(()=>{
        
    },[isWicket,isWide,isByes,isLegByes,isNoBall])

    return (
        <Card
            shadow={!stores.appStore.isPhone ? "md" : "xs"}
            radius={"md"}
            withBorder={!stores.appStore.isPhone}
            style={{
                width : "100%",
                padding : "10px 20px 10px 20px",
                marginTop : "10px",
                display : "flex",
                flexDirection : "column",
                flexWrap : "wrap",
            }}
        > 
           <div 
              style={{
                display : "flex",
                justifyContent : "space-between",
                alignItems : "center",
                marginBottom : "8px",
              }}
            >
                <Checkbox label="Wide" checked={isWide} onChange={(e)=>setIsWide(e.target.checked)}/>
                <Checkbox label="No Ball" checked={isNoBall} onChange={(e)=>setIsNoBall(e.target.checked)}/>
                <Checkbox label="Byes" checked={isByes} onChange={(e)=>setIsByes(e.target.checked)}/>
                <Checkbox label="Leg Byes" checked={isLegByes} onChange={(e)=>setIsLegByes(e.target.checked)}/>
           </div>
           <div style={{display : "flex", justifyContent :"space-between", alignItems : "center"}}>
              <Checkbox label="Wicket" checked={isWicket} onChange={(e)=>setIsWicket(e.target.checked)}/>
              <div style={{display : "flex"}}>
                    <Button style={{margin:"0px 3px"}}>Retire</Button>
                    <Button style={{margin:"0px 3px"}}>Swap Batsman</Button>
              </div>
           </div>
        </Card>
    )
}

export default CurrentBallEvent