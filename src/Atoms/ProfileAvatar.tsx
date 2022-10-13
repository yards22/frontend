import {
  Avatar as MantineAvatar,
  MantineSize,
  useMantineTheme,
} from "@mantine/core";
interface AvatarProps {
  imageUrl?: string | null;
  initials?: string;
  toolTip?: string;
  size?: MantineSize;
  onClick?: () => void;
}
function ProfileAvatar(props: AvatarProps) {
  const mantineTheme = useMantineTheme();

  if (props.imageUrl)
    return (
      <MantineAvatar
        variant="filled"
        radius={props.size}
        size={props.size}
        src={props.imageUrl}
      />
    );
  if (props.initials)
    return (
      <MantineAvatar
        variant="filled"
        radius={props.size}
        size={props.size}
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
      radius={props.size}
      size={props.size}
    />
  );
}

export default ProfileAvatar;
