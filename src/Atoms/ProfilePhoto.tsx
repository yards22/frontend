import { Avatar, MantineNumberSize } from "@mantine/core";
import { HTMLAttributes } from "react";
interface ProfilePhotoProps extends HTMLAttributes<HTMLDivElement> {
  username: string | undefined;
  profileimageuri: string | null | undefined;
  size?: MantineNumberSize;
}

function ProfilePhoto(props: ProfilePhotoProps) {
  if (props.profileimageuri) {
    return (
      <Avatar
        size={props.size}
        src={props.profileimageuri}
        {...props}
        style={{ borderRadius: "100000px" }}
      />
    );
  }
  if (props.username)
    <Avatar
      size={props.size}
      src={props.profileimageuri}
      color="cyan"
      {...props}
      style={{ borderRadius: "100000px" }}
    >
      {props.username?.substring(0, 2).toUpperCase()}
    </Avatar>;
  return (
    <Avatar
      size={props.size}
      src={props.profileimageuri}
      color="cyan"
      {...props}
      style={{ borderRadius: "100000px" }}
    />
  );
}

export default ProfilePhoto;
