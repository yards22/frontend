import styled from 'styled-components'
import { useStores } from '../../Logic/Providers/StoresProviders'
import { Observer } from 'mobx-react-lite';
import { useState } from 'react';
import NavBarMobile from './NavbarMobile/Index';

const SNavBarIndex = styled.div`
  position: fixed;
  top : 0px;
  right : 0px;
  left : 0px;
  height : 50px;
  display : flex;
  justify-content : end;
  align-items : center;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #e63737;
  z-index: 1;
`

function NavBarIndex() {
  const [expandNavbar,setExpandNavbar] = useState(false)
  const stores = useStores();
  return (
    <Observer>
        {
          ()=>{
            const {appStore} = stores
            return (
              <SNavBarIndex>
                <div
                  style={{
                    display: "flex",
                  }}
                >  
                  { !appStore.isPhone ?
                    <>
                      <a href='/feed' style={{marginRight:"8px"}}>Feed</a>
                      <a href='/explore' style={{marginRight:"8px"}}>Explore</a>
                      <a href='/notification' style={{marginRight:"8px"}}>Notification</a>
                      <a href='/profile'style={{marginRight:"8px"}}>Profile</a>
                      <a href='/logout'style={{marginRight:"8px"}}>Logout</a>
                    </>
                     :
                     <>
                       <button onClick={()=>{setExpandNavbar(!expandNavbar)}}>Navbar</button>
                       {
                          expandNavbar && <NavBarMobile/>
                       }
                     </>
                  }
                  
                </div>
            </SNavBarIndex>
            )
          }
        }
    </Observer>
  )
}

export default NavBarIndex