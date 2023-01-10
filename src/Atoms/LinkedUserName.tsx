import { Title, TitleProps, Text, useMantineTheme } from "@mantine/core";
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

interface LinkedUserNameProps extends TitleProps {
  username: string;
  type?: "hard" | "soft";
}

function LinkedUserName(props: LinkedUserNameProps) {
  const mantineTheme = useMantineTheme();
  if (props.type === "hard")
    return (
      <Link
        to={"/profile?username=" + props.username}
        style={{ textDecoration: "none" }}
      >
        <SLinkedUserNameHard
          {...props}
          theme={{ linkHover: mantineTheme.colors["blue"][7] }}
        >
          {props.username}
        </SLinkedUserNameHard>
      </Link>
    );

  return (
    <Link
      to={"/profile?username=" + props.username}
      style={{ textDecoration: "none" }}
    >
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
