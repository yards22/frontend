import styled from "styled-components";

const SProfilePhoto = styled.div`
  width: 130px;
  height: 130px;
  position: absolute;
  left: 25px;
  top: 134px;
  border-radius: 65px;
  background-color: red;
  border: 4px solid white;
  overflow: hidden;
`;

interface ProfilePhotoProps {
  userName: string | undefined;
  profileImageUri: string | null | undefined;
}

function ProfilePhoto(props: ProfilePhotoProps) {
  return (
    <SProfilePhoto>
      {props.profileImageUri ? (
        <img src={props.profileImageUri} height="100%" width={"100%"} />
      ) : (
        <h1 style={{ color: "white" }}> {props.userName?.charAt(0)}</h1>
      )}
    </SProfilePhoto>
  );
}

export default ProfilePhoto;
