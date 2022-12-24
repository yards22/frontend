import React, { useEffect } from 'react'
import { useStores } from '../../Logic/Providers/StoresProviders'

function ComingSoonScreenIndex() {
    const stores = useStores();

    useEffect(()=>{
        stores.appStore.setNavigationState(7)
    })

    return (
        <div>ComingSoonScreenIndex</div>
    )
}

export default ComingSoonScreenIndex