import styled from "styled-components"
import {  Image } from "@mantine/core";

const SProfilePhoto = styled.div`
    width : 110px;
    height : 110px;
    border-radius : 55px;
    background-color : red;
    border : 4px solid white;
    overflow: hidden;
`;

interface ProfilePhotoProps{
   userName : string | undefined,
   profileImageUri : string | null | undefined,
}

function ProfilePhoto(props:ProfilePhotoProps) {

  return (
      <SProfilePhoto>
        {props.profileImageUri ? 
            <Image
              width={"110px"}
              height={"110px"}
              src={props.profileImageUri}
              withPlaceholder
          />
          :  
        <h1
          style={{color : "white"}}
        > {props.userName?.charAt(0)}</h1>}
      </SProfilePhoto>
  )
}

export default ProfilePhoto