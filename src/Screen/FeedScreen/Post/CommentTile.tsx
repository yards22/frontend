import { Text, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import LinkedUserName from "../../../Atoms/LinkedUserName";
import timeAgo from "s-ago";
import AddComment from "./AddComment";
import ProfilePhoto from "../../../Atoms/ProfilePhoto";

interface CommentProps {
  comment_id: bigint;
  content: string;
  created_at: Date;
  username: string;
  profile_image_uri: string | null;
  isReply: boolean;
}

function CommentTile(props: CommentProps) {
  const { colors } = useMantineTheme();
  const [showReply, setShowReply] = useState(false);

  return (
    <div
      className={`flex items-start justify-start ${
        props.isReply
          ? "ml-10 border border-solid border-transparent border-l-gray-300 pl-2"
          : ""
      }`}
    >
      <ProfilePhoto
        profileimageuri={props.profile_image_uri}
        username={props.username}
        className="mt-3 mr-2"
        size={props.isReply ? "sm" : "md"}
      />
      <div className="flex w-full flex-col items-start justify-center p-1">
        <div className="flex w-full items-end">
          <LinkedUserName type="hard" username={props.username} order={6} />
          <Text size={"xs"} color={"dimmed"}>
            &nbsp; &nbsp;•&nbsp;&nbsp;
            {timeAgo(props.created_at)}
          </Text>
          &nbsp;&nbsp;&nbsp;&nbsp;
          {!props.isReply && (
            <Text
              onClick={() => setShowReply((p) => !p)}
              size={"sm"}
              color="blue"
              className="cursor-pointer select-none font-bold"
            >
              Reply
            </Text>
          )}
        </div>
        <Text color={colors.dark[4]} size="sm">
          {props.content}
        </Text>
        {showReply && (
          <AddComment
            isReply={props.isReply}
            comment_id={props.comment_id}
            onComment={() => {
              setShowReply(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default CommentTile;
