import { ActionIcon, Avatar, Title, useMantineTheme } from "@mantine/core";
import styled from "styled-components";
import MPost from "../../../Logic/Model/MPost";
import { Heart, MessageCircle } from "react-feather";
import Liked from "./Liked";
import LinkedUserName from "../../../Atoms/LinkedUserName";
import { useState } from "react";
import Comments from "./Comments";

const SNormalPost = styled.div`
  width: 100%;
  height: fit-content;
  min-height: 50px;
  padding: 20px;
  border-bottom: 0.2px solid #bdbdbda0;
  background-color: white;
  margin: 5px 0px;
  border-radius: 8px;
  :hover {
    /* background: ${(p) => p.theme.bgColorOnHover}; */
  }
`;

interface NormalPostProps {
  data: MPost;
}

function NormalPost(props: NormalPostProps) {
  const mantineTheme = useMantineTheme();
  const [showComments, setShowComments] = useState(false);
  return (
    <SNormalPost theme={{ bgColorOnHover: mantineTheme.colors["gray"][0] }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Avatar size="md" variant="gradient" radius={"xl"}>
          HS
        </Avatar>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <LinkedUserName
            type="hard"
            order={5}
            style={{
              textDecoration: "none",
              marginLeft: "10px",
              padding: "0",
              marginTop: "0",
              marginBottom: "0",
              cursor: "pointer",
            }}
            username={props.data.username}
          />

          <Title
            order={6}
            color="dimmed"
            style={{
              marginLeft: "10px",
              fontWeight: "300",
              padding: "0",
              marginTop: "0",
            }}
          >
            4h
          </Title>
        </div>
      </div>
      <div style={{ marginLeft: "50px", marginTop: "10px" }}>
        {props.data.content}
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Liked data={props.data.liked_by} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ActionIcon color={"red"} variant="subtle" radius={"xl"} size="xl">
              <Heart
                size={"16"}
                fill={props.data.is_liked ? "red" : "transparent"}
                strokeWidth={"2"}
              />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              radius={"xl"}
              size="xl"
              onClick={() => {
                setShowComments((p) => !p);
              }}
            >
              <MessageCircle size={"16"} />
            </ActionIcon>
          </div>
        </div>
      </div>
      {showComments && (
        <div
          style={{
            marginLeft: "50px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Title order={6}>Comments</Title>
          <Comments />
        </div>
      )}
    </SNormalPost>
  );
}

export default NormalPost;
