import { Avatar, Text } from "@mantine/core";
import React, { CSSProperties } from "react";
import styled from "styled-components";
import LinkedUserName from "./LinkedUserName";

interface CommentProps {
  content: string;
  created_at: Date;
  username: string;
  profile_pic_uri: string;
  isChildComment: boolean;
  menu?: React.ReactNode;
  style?: CSSProperties;
}

const SCommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 5px 0;
`;
const SComment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 5px 10px;
  background: #f4f4f481;
  border-radius: 10px;
  width: fit-content;
  margin-left: 8px;
`;
function CommentTile(props: CommentProps) {
  return (
    <SCommentContainer style={props.style}>
      <Avatar
        src={props.profile_pic_uri}
        size={props.isChildComment ? "sm" : "md"}
        radius={"xl"}
      />
      <SComment>
        <LinkedUserName type="hard" username={props.username} order={6} />
        <Text color={"dimmed"} size="sm">
          {props.content}
        </Text>
      </SComment>
    </SCommentContainer>
  );
}

export default CommentTile;
