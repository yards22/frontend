import React, { useEffect } from 'react'
import { useStores } from '../../Logic/Providers/StoresProviders';


function PollsScreenIndex() {
    const stores = useStores();

    useEffect(()=>{
        stores.appStore.setNavigationState(6)
    })

    return (
        <div>PollsScreenIndex</div>
    )
}

export default PollsScreenIndex