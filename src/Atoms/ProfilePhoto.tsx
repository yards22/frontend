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
   height : number | string,
}

function ProfilePhoto(props:ProfilePhotoProps) {

  return (
      <>
        {
          props.profileImageUri ? 
            <Image
<<<<<<< HEAD:src/Screen/ProfileScreen/ProfileDetailsSection/ProfilePhoto.tsx
              width={"110px"}
              height={"110px"}
=======
              width={props.height}
              height = {props.height}
>>>>>>> c25a7624bc8a582915eb55777a5b25b36cca6371:src/Atoms/ProfilePhoto.tsx
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