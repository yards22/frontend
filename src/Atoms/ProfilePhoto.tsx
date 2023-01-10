import { Avatar } from "@mantine/core";
interface ProfilePhotoProps {
  userName: string | undefined;
  profileImageUri: string | null | undefined;
  style?: React.CSSProperties;
}

function ProfilePhoto(props: ProfilePhotoProps) {
  return props.profileImageUri ? (
    <Avatar
      size={"lg"}
      src={props.profileImageUri}
      style={{ ...props.style, borderRadius: "100000px" }}
    />
  ) : (
    <Avatar
      size={"lg"}
      src={props.profileImageUri}
      color="cyan"
      style={{ ...props.style, borderRadius: "100000px" }}
    >
      {props.userName?.substring(0, 2).toUpperCase()}
    </Avatar>
  );
}

export default ProfilePhoto;
