import { useState } from "react";
import styled from "styled-components"
import { Center, Image, RingProgress } from "@mantine/core";

const SProfilePhoto = styled.div`
    width : 110px;
    height : 110px;
    border-radius : 50px;
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
              width={"105px"}
              height={"105px"}
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