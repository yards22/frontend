import { Title, TitleProps, useMantineTheme } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const SLinkedUserName = styled(Title)`
  cursor: pointer;
  color: #282828;
  text-decoration: none;
  :hover {
    color: ${(p) => p.theme.linkHover};
  }
`;
interface LinkedUserNameProps extends TitleProps {
  username: string;
  user_id?: number;
}
function LinkedUserName(props: LinkedUserNameProps) {
  const mantineTheme = useMantineTheme();
  return (
    <Link to={""} style={{ textDecoration: "none" }}>
      <SLinkedUserName
        {...props}
        theme={{ linkHover: mantineTheme.colors["blue"][7] }}
      >
        {props.username}
      </SLinkedUserName>
    </Link>
  );
}

export default LinkedUserName;
