import {
  Avatar,
  ColorSchemeProvider,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React, { CSSProperties, useState } from "react";
import styled from "styled-components";
import LinkedUserName from "./LinkedUserName";
import timeAgo from "s-ago";
import AddComment from "../Screen/FeedScreen/Post/AddComment";

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
`;
const SComment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 5px 10px;
  width: 100%;
  margin-left: 8px;
`;
function CommentTile(props: CommentProps) {
  const { colors } = useMantineTheme();
  const [showReply, setShowReply] = useState(false);
  return (
    <SCommentContainer
      style={props.style}
      theme={{ isChild: props.isChildComment }}
    >
      <Avatar
        style={{ marginTop: "10px" }}
        src={props.profile_pic_uri}
        size={props.isChildComment ? "sm" : "md"}
        radius={"sm"}
      />
      <SComment>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <LinkedUserName type="hard" username={props.username} order={6} />
          <Text size={"xs"} color={"dimmed"} style={{}}>
            &nbsp; &nbsp;•&nbsp;&nbsp;
            {timeAgo(new Date(new Date().getTime() - 1000 * 5 * 60))}
          </Text>
          &nbsp;&nbsp;&nbsp;&nbsp;
          {!props.isChildComment && (
            <Text
              onClick={() => setShowReply((p) => !p)}
              size={"sm"}
              color="blue"
              style={{
                fontWeight: "bold",
                cursor: "pointer",
                userSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
                WebkitUserSelect: "none",
              }}
            >
              Reply
            </Text>
          )}
        </div>
        <Text color={colors.dark[4]} size="sm">
          {props.content}
        </Text>
        {showReply && <AddComment isReply />}
      </SComment>
    </SCommentContainer>
  );
}

export default CommentTile;
