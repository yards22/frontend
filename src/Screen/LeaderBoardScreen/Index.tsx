import React, { useEffect } from 'react'
import { useStores } from '../../Logic/Providers/StoresProviders';

function LeaderBoardScreenIndex() {
    const stores = useStores();

    useEffect(()=>{
        stores.appStore.setNavigationState(5)
    })
    return (
        <div>LeaderBoardScreenIndex</div>
    )
}

export default LeaderBoardScreenIndex