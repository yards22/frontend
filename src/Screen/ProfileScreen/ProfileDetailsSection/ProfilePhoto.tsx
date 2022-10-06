import { useState } from "react";
import styled from "styled-components"
import { Image} from "@mantine/core";

const SProfilePhoto = styled.div`
    width : 130px;
    height : 130px;
    border-radius : 65px;
    background-color : red;
    border : 4px solid white;
    overflow: hidden;
`;

interface ProfilePhotoProps{
   userName : string | undefined,
   profileImageUri : string | null | undefined,
}

function ProfilePhoto(props:ProfilePhotoProps) {

  useState(()=>{
    console.log(props.profileImageUri)
  })
  return (
   
          <SProfilePhoto>
            {props.profileImageUri ? 
                <Image
                  width={"125px"}
                  height={"125px"}
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