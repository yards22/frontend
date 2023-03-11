import { Button, Card } from '@mantine/core';
import React from 'react'
import { useStores } from '../../../Logic/Providers/StoresProviders'

function OtherDetailsButtons() {
    const stores = useStores();
    return (
        <Card
            shadow={!stores.appStore.isPhone ? "md" : "xs"}
            radius={"md"}
            withBorder={!stores.appStore.isPhone}
            style={{
                width : "35%",
                padding : "10px",
                marginTop : "10px",
                marginRight : "10px",
                display : "flex",
                flexDirection : "column",
                justifyContent : "space-around",
            }}
        >
            <Button style={{ marginBottom : "5px"}}>
                Extras
            </Button>
            <Button>
                Undo
            </Button>
        </Card> 
    )
}

export default OtherDetailsButtons