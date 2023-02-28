import { Card } from '@mantine/core';
import React from 'react'
import { useStores } from '../../../Logic/Providers/StoresProviders'

function CurrentStats() {

    const stores = useStores();
  return (
    <Card
        shadow={!stores.appStore.isPhone ? "md" : "xs"}
        radius={"md"}
        withBorder={!stores.appStore.isPhone}
        style={{
            width : "100%",
            padding : "5px 50px 5px 20px"
        }}
    >   
        <div style={{
                display :"flex",
                justifyContent : "space-between",
                width : "100%"
             }}>
             <h5 style={{margin:"0px"}}>Team A, first inning</h5>
             <h5 style={{margin:"0px 6px 0px 0px",fontWeight:"400"}}>CRR</h5>
        </div>
        <div style={{
                display :"flex",
                justifyContent : "space-between",
                alignItems : "center",
                width : "100%"
             }}>
             <h1 style={{margin:"0px",fontWeight:"200"}}>36 - 0 (1.0)</h1>
             <h5 style={{margin:"0px",fontWeight:"400"}}>36.00</h5>
        </div>

    </Card>
  )
}

export default CurrentStats