import styled from "styled-components"
import {  Image } from "@mantine/core";

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
   height : number | string,
}

function ProfilePhoto(props:ProfilePhotoProps) {

  return (
      <>
        {
          props.profileImageUri ? 
            <Image
              width={props.height}
              height = {props.height}
              src={props.profileImageUri}
              withPlaceholder
              radius={70}
          />
          :  
          <SProfilePhoto>
              <h1
                style={{color : "white"}}
              > {props.userName?.charAt(0)}</h1>
          </SProfilePhoto>         
        } 
      </>
  )
}

export default ProfilePhoto