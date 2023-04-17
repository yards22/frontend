import { Card } from '@mantine/core'
import React from 'react'
import { useStores } from '../../../Logic/Providers/StoresProviders'

function PlayerStatsSection() {

    const stores = useStores();

  return (
    <Card
        shadow={!stores.appStore.isPhone ? "md" : "xs"}
        p="lg"
        radius={"md"}
        withBorder={!stores.appStore.isPhone}
        style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        borderRadius: stores.appStore.isPhone ? "0" : "",
        alignItems: "center",
        margin: stores.appStore.isPhone ? "0" : "10px",
        }}
    >
        Stats
    </Card>
  )
}

export default PlayerStatsSection