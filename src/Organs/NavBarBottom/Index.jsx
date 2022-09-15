import React from 'react'
import styled from 'styled-components'

const SNavBarBottomIndex = styled.div`
  position: fixed;
  bottom : 0px;
  right : 0px;
  left : 0px;
  
  height : 45px;
  display : flex;
  justify-content : center;
  align-items : center;
`

function NavBarBottomIndex() {
  return (
    <SNavBarBottomIndex>NavBarBottomIndex</SNavBarBottomIndex>
  )
}

export default NavBarBottomIndex