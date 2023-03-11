import { Card } from '@mantine/core'
import { Observer } from 'mobx-react-lite'
import React from 'react'
import { useStores } from '../../../Logic/Providers/StoresProviders'

const dummyOver = [3 , 3 , 4, 1 , 2 , "W"]

function CurrentOver() {
  const stores = useStores()
  const {instantMatchStore} = stores
  const {currentInstantMatch} = instantMatchStore
  return (
      <Observer>
        {()=>{
            return(
                <Card
                    shadow={!stores.appStore.isPhone ? "md" : "xs"}
                    radius={"md"}
                    withBorder={!stores.appStore.isPhone}
                    style={{
                        width : "100%",
                        display : "flex",
                        padding : "5px 10px",
                        overflow : "scroll",
                        marginTop : "10px"
                    }}
                >  
                    <p style={{margin:"0px"}}>This Over : </p>
                    {
                        currentInstantMatch.current_over.map((each:any)=>{
                            return(
                                <p style={{margin:"0px 5px"}}>{each}</p>
                            )
                        })
                    }
                </Card>
            )
          }
        }
      </Observer>
  )
}

export default CurrentOver