import { useEffect } from "react";
import styled from "styled-components";

const SEditProfilePicContainer = styled.div`
  border: 1px solid black;
  height: 130px;
  width: 130px;
  border-radius: 65px;
  overflow: hidden;
  background-color: red;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface EditProfilePicContainerProps {
  profileImageUri: string | null | undefined;
  username: string | null;
}

function EditProfilePicContainer(props: EditProfilePicContainerProps) {
  return (
    <SEditProfilePicContainer>
      {props.profileImageUri && props.profileImageUri !== "" ? (
        <img src={props.profileImageUri} height="100%" width={"100%"} />
      ) : (
        <h1>{props.username?.charAt(0)}</h1>
      )}
    </SEditProfilePicContainer>
  );
}

export default EditProfilePicContainer;
