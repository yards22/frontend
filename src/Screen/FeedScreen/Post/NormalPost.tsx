import { ActionIcon, Button, Card, Menu, Modal, Title, useMantineTheme } from "@mantine/core";
import MPost from "../../../Logic/Model/MPost";
import { AlertCircle, Edit, Edit2, Heart, Link2, MessageCircle, MoreVertical, Star, Trash } from "react-feather";
import Liked from "./Liked";
import LinkedUserName from "../../../Atoms/LinkedUserName";
import { useEffect, useState } from "react";
import CommentThread from "./CommentThread";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import AddComment from "./AddComment";
import sAgo from "s-ago";
import NormalPostMedia from "./NormalPostMedia";
import {
  CopyToClipboard,
  GetHostUrl,
  HashWithDate
} from "../../../Logic/Utils/Common";
import { showNotification } from "@mantine/notifications";
import ProfilePhoto from "../../../Atoms/ProfilePhoto";
import { useLocation } from "react-router-dom";
import ParsedPost from "../../../Atoms/ParsedPost";
import styled from "styled-components";
interface NormalPostProps {
  data: MPost;
  type: "feed" | "mine" | "trending" | "fav",
}

const DeleteIcon = styled.div`
    display :flex;
    justify-content:flex-end;
    flex-direction:row;
    width:100%;
`

function NormalPost(props: NormalPostProps) {
  const mantineTheme = useMantineTheme();
  const [showComments, setShowComments] = useState(false);
  const stores = useStores();
  const location = useLocation();

  const OnDelete = async ()=>{
    stores.postStore.DeletePost(props.data.post_id)
    .then(()=>{
       console.log("deleted")
    }).catch((err)=>{
      throw err;
    }).finally(()=>{
      stores.postStore.GetPosts(props.type)
    })
  } 

  useEffect(() => {
    if (location.search.includes("open_comments=true")) {
      setShowComments(true);
    }
  }, [location.search]);

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
            className="ml-2 mt-0 p-0 text-xs font-normal"
          >
            {sAgo(props.data.created_at)}
          </Title>
        </div>
        <DeleteIcon>
            {
              stores.profileStore.viewProfile?.user_id === props.data.user_id ? 
              <Menu>
                <Menu.Target>
                  <Button variant="subtle" color="dark" size="xs" compact={true}>
                    <MoreVertical/>
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>More</Menu.Label>
                  <Menu.Item icon={<Edit2 size={14} />}>Edit</Menu.Item>
                  <Menu.Item color="red" icon={<Trash size={14}/>} onClick={OnDelete}>Delete</Menu.Item>
                  <Menu.Item color="red" icon={<AlertCircle size={14} />}>Report</Menu.Item>
                </Menu.Dropdown>
              </Menu>
                : null
            }
            </DeleteIcon>
         
      </div>
      <div style={{ marginTop: "10px" }}>
        <ParsedPost content={props.data.content} />
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
                const postId = props.data.post_id;
                const hashedPostId = HashWithDate(
                  props.data.created_at,
                  postId
                );
                CopyToClipboard(`${GetHostUrl()}/post?pr=${hashedPostId}`).then(
                  () => {
                    showNotification({
                      title: "Copied To Clipboard",
                      message: "You can share post via copied link."
                    });
                  }
                );
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
