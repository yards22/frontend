import React from 'react'
import styled from 'styled-components'

const SNavBarIndex = styled.div`
  position: fixed;
  top : 0px;
  right : 0px;
  left : 0px;
  
  height : 45px;
  display : flex;
  justify-content : center;
  align-items : center;
`

function NavBarIndex() {
  return (
    <SNavBarIndex>NavBarIndex</SNavBarIndex>
  )
}

export default NavBarIndex