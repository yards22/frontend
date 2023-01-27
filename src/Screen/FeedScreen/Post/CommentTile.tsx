import { ActionIcon, Text, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import LinkedUserName from "../../../Atoms/LinkedUserName";
import timeAgo from "s-ago";
import ProfilePhoto from "../../../Atoms/ProfilePhoto";
import { MComment } from "../../../Logic/Model/MComment";
import AddReply from "./AddReply";
import { MessageSquare, Trash2 } from "react-feather";
import { useStores } from "../../../Logic/Providers/StoresProviders";

interface CommentTileProps {
  data: MComment;
  postId: bigint;
  onReply?: () => void;
}

function CommentTile(props: CommentTileProps) {
  const { colors } = useMantineTheme();
  const [showReplyTextbox, setShowReplyTextbox] = useState(false);
  const [loading, setLoading] = useState(false);
  const { commentStore } = useStores();

  return (
    <div className="m-0 flex items-start justify-start">
      <ProfilePhoto
        profileimageuri={props.data.profile_image_uri}
        username={props.data.username}
        className="mt-3 mr-2"
        size="md"
      />
      <div className="flex w-full flex-col items-start justify-center p-1">
        <div className="flex w-full flex-row ">
          <div className="flex flex-1 flex-col">
            <LinkedUserName
              type="hard"
              username={props.data.username}
              order={6}
              className="m-0 p-0"
            />
            <Text size={"xs"} color={"dimmed"}>
              {timeAgo(props.data.created_at)}
            </Text>
          </div>
          <div className="flex">
            <ActionIcon
              onClick={() => setShowReplyTextbox((p) => !p)}
              className="ml-4 cursor-pointer select-none font-bold"
            >
              <MessageSquare size={16} />
            </ActionIcon>
            {props.data.is_own_comment && (
              <ActionIcon
                loading={loading}
                onClick={() => {
                  setLoading(true);
                  commentStore
                    .DeleteComment(props.postId, props.data.comment_id)
                    .then(() => {})
                    .catch((err) => {})
                    .finally(() => {
                      setLoading(false);
                    });
                }}
                color="red"
                className="ml-2 cursor-pointer select-none font-bold"
              >
                <Trash2 size={16} />
              </ActionIcon>
            )}
          </div>
        </div>
        <Text color={colors.dark[4]} size="sm">
          {props.data.content}
        </Text>
        {showReplyTextbox && (
          <AddReply
            commentId={props.data.comment_id}
            onReply={() => {
              setShowReplyTextbox(false);
              if (props.onReply) props.onReply();
            }}
          />
        )}
      </div>
    </div>
  );
}

export default CommentTile;
