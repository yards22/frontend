import { ActionIcon, Card, Title, useMantineTheme } from "@mantine/core";
import MPost from "../../../Logic/Model/MPost";
import { Heart, MessageCircle, Star } from "react-feather";
import Liked from "./Liked";
import LinkedUserName from "../../../Atoms/LinkedUserName";
import { useState } from "react";
import CommentThread from "./CommentThread";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import AddComment from "./AddComment";
import ProfileAvatar from "../../../Atoms/ProfileAvatar";
import sAgo from "s-ago";
import NormalPostMedia from "./NormalPostMedia";
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
        margin: "5px 0",
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
        <ProfileAvatar
          imageUrl={props.data.profile_pic_ref}
          initials={props.data.username.substring(0, 2).toUpperCase()}
        />
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
            {sAgo(props.data.created_at)}
          </Title>
        </div>
      </div>
      <div style={{ marginTop: "10px" }}>
        {props.data.content}
        {props.data.media && <NormalPostMedia media={props.data.media} />}
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
            <ActionIcon color={"red"} variant="subtle" radius={"xl"} size="xl">
              <Star
                color={mantineTheme.colors["yellow"][6]}
                size={"20"}
                fill={
                  props.data.is_favorite
                    ? mantineTheme.colors["yellow"][3]
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
            Comment
          </Title>
          <CommentThread />
        </div>
      )}
    </Card>
  );
}

export default NormalPost;
