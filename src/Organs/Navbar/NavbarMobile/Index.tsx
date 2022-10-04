import styled from "styled-components"

const SNavBarMobile = styled.div`
    position: fixed;
    top : 50px;
    left : 0px;
    bottom: 0px;
    background-color: #242b36;
    display: flex;
    width: 40vw;
    min-width: 150px;
    flex-direction: column;
    align-items: center;
    color: white;
`

function NavBarMobile() {
  return (
    <SNavBarMobile>
        <a href='/feed' style={{marginTop:"8px",color:"white"}}>Feed</a>
        <a href='/network' style={{marginTop:"8px",color:"white"}}>Network</a>
        <a href='/notification' style={{marginTop:"8px",color:"white"}}>Notification</a>
        <a href='/profile'style={{marginTop:"8px",color:"white"}}>Profile</a>
        <a href='/logout'style={{marginTop:"8px",color:"white"}}>Logout</a>
    </SNavBarMobile>
  )
}

export default NavBarMobile