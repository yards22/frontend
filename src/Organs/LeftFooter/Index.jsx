import React from 'react'
import styled from 'styled-components'
import { useStores } from '../../Logic/Providers/StoresProviders'

const SLeftFooter = styled.div`
  display : flex;
  align-items:center;
  justify-content : center;
  width : 350px;
  border : 1px solid black
`

function LeftFooterIndex() {
  const store = useStores();
  return (
    <SLeftFooter>
        LeftFooterIndex
    </SLeftFooter>
  )
}

export default LeftFooterIndex