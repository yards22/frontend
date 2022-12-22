import React, { useEffect } from 'react'
import { useStores } from '../../Logic/Providers/StoresProviders';

function FeedBackScreenIndex() {
    const stores = useStores();

    useEffect(()=>{
        stores.appStore.setNavigationState(8)
    })
    return (
        <div>FeedBackScreenIndex</div>
    )
}

export default FeedBackScreenIndex