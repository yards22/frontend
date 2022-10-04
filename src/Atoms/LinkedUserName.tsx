import {
  Title,
  TitleProps,
  Text,
  useMantineTheme,
  TextProps,
} from "@mantine/core";
import { Link } from "react-router-dom";
import styled from "styled-components";
const SLinkedUserNameHard = styled(Title)`
  cursor: pointer;
  color: #282828;
  text-decoration: none;
  :hover {
    color: ${(p) => p.theme.linkHover};
  }
`;

interface LinkedUserNamePropsForHard extends TitleProps {
  username: string;
  user_id?: number;
  type?: "hard" | "soft";
}

interface LinkedUserNamePropsForSoft extends TextProps {
  username: string;
  user_id?: number;
  type?: "hard" | "soft";
}

function LinkedUserName(
  props: LinkedUserNamePropsForSoft | LinkedUserNamePropsForHard
) {
  const mantineTheme = useMantineTheme();
  if (props.type === "hard")
    return (
      <Link to={""} style={{ textDecoration: "none" }}>
        <SLinkedUserNameHard
          {...props}
          theme={{ linkHover: mantineTheme.colors["blue"][7] }}
        >
          {props.username}
        </SLinkedUserNameHard>
      </Link>
    );

  return (
    <Link to={""} style={{ textDecoration: "none" }}>
      <Text
        style={{ display: "inline-block", cursor: "pointer" }}
        {...(props as any)}
        variant="link"
      >
        {props.username}
      </Text>
    </Link>
  );
}

export default LinkedUserName;
