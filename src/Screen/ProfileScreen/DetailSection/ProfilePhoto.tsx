import styled from "styled-components";
import { Image } from "@mantine/core";

const SProfilePhoto = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 70px;
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
        <Image
          width={"100px"}
          height={"100px"}
          src={props.profileImageUri}
          withPlaceholder
        />
      ) : (
        <h1 style={{ color: "white" }}> {props.userName?.charAt(0)}</h1>
      )}
    </SProfilePhoto>
  );
}

export default ProfilePhoto;
