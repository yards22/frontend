import { ActionIcon, Card, Title, useMantineTheme } from "@mantine/core";
import MPost from "../../../Logic/Model/MPost";
import { Heart, Link2, MessageCircle, Star } from "react-feather";
import Liked from "./Liked";
import LinkedUserName from "../../../Atoms/LinkedUserName";
import { useState } from "react";
import CommentThread from "./CommentThread";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import AddComment from "./AddComment";
import sAgo from "s-ago";
import NormalPostMedia from "./NormalPostMedia";
import { CopyToClipboard, GetHostUrl } from "../../../Logic/Utils/Common";
import { showNotification } from "@mantine/notifications";
import ProfilePhoto from "../../../Atoms/ProfilePhoto";
interface NormalPostProps {
  data: MPost;
}

function NormalPost(props: NormalPostProps) {
  const mantineTheme = useMantineTheme();
  const [showComments, setShowComments] = useState(false);
  const stores = useStores();

  return (
    <Card
      onClick={() => {}}
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      className={`w-full, h-fit min-h-[50] p-5 ${
        stores.appStore.isPhone ? "rounded-none" : "rounded-lg"
      }`}
    >
      <div className="flex items-center justify-start">
        <ProfilePhoto
          profileimageuri={props.data.profile_pic_ref}
          username={props.data.username}
        />
        <div className="flex flex-col justify-center">
          <LinkedUserName
            type="hard"
            order={5}
            className="ml-2 mt-0 mb-0 cursor-pointer p-0 no-underline"
            username={props.data.username}
          />

          <Title
            order={6}
            color="dimmed"
            className="ml-2 mt-0 p-0 text-xs font-thin"
          >
            {sAgo(props.data.created_at)}
          </Title>
        </div>
      </div>
      <div style={{ marginTop: "10px" }}>
        {props.data.content}
        {props.data.media && props.data.media.length > 0 && (
          <NormalPostMedia media={props.data.media} />
        )}
        <div className="mt-2 flex flex-col flex-wrap items-end">
          <div className="w-full">
            <Liked data={props.data.liked_by} />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <ActionIcon
              color={"red"}
              variant="subtle"
              radius={"xl"}
              size="xl"
              onClick={() => {
                stores.postStore.ToggleLike(
                  props.data.post_id,
                  stores.profileStore.profile?.username || ""
                );
              }}
            >
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
              color={"red"}
              variant="subtle"
              radius={"xl"}
              size="xl"
              onClick={() => {
                stores.postStore.ToggleFav(props.data.post_id);
              }}
            >
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
            <ActionIcon
              color={"indigo"}
              variant="subtle"
              radius={"xl"}
              size="xl"
              onClick={() => {
                CopyToClipboard(
                  `${GetHostUrl()}/post?post_id=${props.data.post_id}`
                ).then(() => {
                  showNotification({
                    title: "Copied To Clipboard",
                    message: "You can share post via copied link."
                  });
                });
              }}
            >
              <Link2 size={"20"} />
            </ActionIcon>
          </div>
        </div>
      </div>
      {showComments && (
        <div className="mt-3">
          <AddComment isReply={false} post_id={props.data.post_id} />
          <Title order={6} className="mt-5">
            Comment
          </Title>
          <CommentThread post_id={props.data.post_id} />
        </div>
      )}
    </Card>
  );
}

export default NormalPost;
