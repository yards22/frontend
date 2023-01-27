import { useMantineTheme, Text, ActionIcon } from "@mantine/core";
import LinkedUserName from "../../../Atoms/LinkedUserName";
import ProfilePhoto from "../../../Atoms/ProfilePhoto";
import timeAgo from "s-ago";
import { MCommentReply } from "../../../Logic/Model/MComment";
import { Trash2 } from "react-feather";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import { useState } from "react";

interface ReplyTileProps {
  data: MCommentReply;
  commentId: bigint;
}

function ReplyTile(props: ReplyTileProps) {
  const { commentStore } = useStores();
  const { colors } = useMantineTheme();
  const [loading, setLoading] = useState(false);
  return (
    <div
      className={`ml-10 mt-1 flex items-start justify-start border border-solid border-transparent border-l-gray-300`}
    >
      <ProfilePhoto
        profileimageuri={props.data.profile_image_uri}
        username={props.data.username}
        size="sm"
        className="mt-1 ml-2"
      />
      <div className="flex w-full flex-col items-start justify-center pl-2">
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col">
            <LinkedUserName
              type="hard"
              username={props.data.username}
              order={6}
            />
            <Text size={"xs"} color={"dimmed"} className="m-0 p-0">
              {timeAgo(props.data.created_at)}
            </Text>
          </div>
          {props.data.is_own_reply && (
            <ActionIcon
              loading={loading}
              onClick={() => {
                setLoading(true);
                commentStore
                  .DeleteReply(props.data.reply_id, props.commentId)
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
        <Text color={colors.dark[4]} size="sm">
          {props.data.content}
        </Text>
      </div>
    </div>
  );
}

export default ReplyTile;
