import { Button, Card } from '@mantine/core';
import React from 'react'
import { useStores } from '../../../Logic/Providers/StoresProviders';

function RunsInBall() {
    const stores = useStores();
    return (
      <Card
          shadow={!stores.appStore.isPhone ? "md" : "xs"}
          radius={"md"}
          withBorder={!stores.appStore.isPhone}
          style={{
              width : "65%",
              padding : "10px",
              marginTop : "10px",
              marginRight : "2px",
              display : "flex",
              flexDirection : "column"
          }}
      >
        <div style={{display : "flex",justifyContent:"space-around",width:"100%", marginBottom:"10px"}}>
          <Button style={{borderRadius:"60%", height:"40px",width:"40px",padding:"0px"}}>0</Button>
          <Button style={{borderRadius:"60%", height:"40px",width:"40px",padding:"0px"}}>1</Button>
          <Button style={{borderRadius:"60%", height:"40px",width:"40px",padding:"0px"}}>2</Button>
          <Button style={{borderRadius:"60%", height:"40px",width:"40px",padding:"0px"}}>3</Button>
        </div>
        <div style={{display : "flex",justifyContent:"space-around",width:"100%"}}>
          <Button style={{borderRadius:"60%", height:"40px",width:"40px",padding:"0px"}}>4</Button>
          <Button style={{borderRadius:"60%", height:"40px",width:"40px",padding:"0px"}}>5</Button>
          <Button style={{borderRadius:"60%", height:"40px",width:"40px",padding:"0px"}}>6</Button>
          <Button style={{borderRadius:"60%", height:"40px",width:"40px",padding:"0px"}}>...</Button>
        </div>
          
      </Card>
   )
}

export default RunsInBall