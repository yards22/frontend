import {
  ActionIcon,
  Avatar,
  Card,
  Title,
  useMantineTheme,
} from "@mantine/core";
import MPost from "../../../Logic/Model/MPost";
import { Heart, MessageCircle } from "react-feather";
import Liked from "./Liked";
import LinkedUserName from "../../../Atoms/LinkedUserName";
import { useState } from "react";
import Comments from "./Comments";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import AddComment from "./AddComment";

interface NormalPostProps {
  data: MPost;
}

function NormalPost(props: NormalPostProps) {
  const mantineTheme = useMantineTheme();
  const [showComments, setShowComments] = useState(false);
  const stores = useStores();
  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      style={{
        width: "100%",
        height: "fit-content",
        minHeight: "50px",
        padding: "20px",
        margin: "10px 0",
        borderRadius: stores.appStore.isPhone ? "0" : "8px",
      }}
    >
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
      <div style={{ marginTop: "10px" }}>
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
                color={mantineTheme.colors["red"][6]}
                size={"20"}
                fill={
                  props.data.is_liked
                    ? mantineTheme.colors["red"][3]
                    : "transparent"
                }
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
              <MessageCircle size={"20"} />
            </ActionIcon>
          </div>
        </div>
      </div>
      {showComments && (
        <div
          style={{
            marginTop: "10px",
          }}
        >
          <AddComment isReply={false} />
          <Title order={6} style={{ marginTop: "20px" }}>
            Comments
          </Title>
          <Comments />
        </div>
      )}
    </Card>
  );
}

export default NormalPost;
