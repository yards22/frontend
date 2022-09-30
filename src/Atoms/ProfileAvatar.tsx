import React from "react";
import { Avatar as MantineAvatar, useMantineTheme } from "@mantine/core";
interface AvatarProps {
  imageUrl?: string;
  initials?: string;
  toolTip?: string;
  onClick?: () => void;
}
function ProfileAvatar(props: AvatarProps) {
  const mantineTheme = useMantineTheme();
  if (props.imageUrl)
    return (
      <MantineAvatar
        variant="filled"
        radius="xl"
        size="lg"
        src={props.imageUrl}
      />
    );
  if (props.initials)
    return (
      <MantineAvatar
        variant="filled"
        radius="xl"
        size="lg"
        color={mantineTheme.primaryColor}
        src={props.imageUrl}
      >
        {props.initials}
      </MantineAvatar>
    );
  return (
    <MantineAvatar
      color={mantineTheme.primaryColor}
      variant="filled"
      radius="xl"
      size="lg"
    />
  );
}

export default ProfileAvatar;
