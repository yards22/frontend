import { Avatar, MantineNumberSize } from "@mantine/core";
import { HTMLAttributes } from "react";
interface ProfilePhotoProps extends HTMLAttributes<HTMLDivElement> {
  username?: string | undefined;
  profileimageuri?: string | null | undefined;
  size?: MantineNumberSize;
}

function ProfilePhoto(props: ProfilePhotoProps) {
  if (props.profileimageuri) {
    return (
      <Avatar
        size={props.size}
        src={props.profileimageuri}
        {...props}
        className="rounded-full"
      />
    );
  }
  if (props.username)
    return (
      <Avatar
        size={props.size}
        color="blue"
        variant="gradient"
        {...props}
        className="rounded-full"
      >
        {props.username?.substring(0, 2).toUpperCase()}
      </Avatar>
    );
  return (
    <Avatar
      size={props.size}
      color="blue"
      variant="gradient"
      {...props}
      className="rounded-full"
    />
  );
}

export default ProfilePhoto;
