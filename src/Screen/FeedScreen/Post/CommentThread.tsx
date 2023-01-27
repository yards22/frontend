import { Observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import CommentTile from "./CommentTile";
import Loading from "../../../Atoms/Loading";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import { Text } from "@mantine/core";
import ReplyTile from "./ReplyTile";
interface CommentThreadProps {
  post_id: bigint;
}

function getReplyButtonText(len: number) {
  if (len === 0) {
    return "No replies";
  }
  if (len === 1) {
    return "View 1 reply";
  }
  return `View ${len} replies`;
}

function CommentThread(props: CommentThreadProps) {
  const { commentStore } = useStores();
  const [showReplies, setShowReplies] = useState<Map<bigint, boolean>>(
    new Map()
  );
  useEffect(() => {
    commentStore.GetComment(props.post_id);
  }, []);
  return (
    <Observer>
      {() => {
        const { comments } = commentStore;
        const show = comments.get(props.post_id);
        if (!show) return <Loading />;
        return (
          <div>
            {/*for each comment */}
            {show.map((comment, index) => {
              return (
                <div
                  key={`post_comment_${props.post_id}_${index}`}
                  className="mb-2 flex flex-col"
                >
                  <CommentTile
                    data={comment}
                    postId={props.post_id}
                    onReply={() => {
                      setShowReplies((p) => {
                        const newMap = new Map(p);
                        newMap.set(comment.comment_id, true);
                        return newMap;
                      });
                    }}
                  />
                  {comment.replies.length > 0 && (
                    <Text
                      onClick={() => {
                        setShowReplies((p) => {
                          const isVisible = p.get(comment.comment_id) || false;
                          const newMap = new Map(p);
                          newMap.set(comment.comment_id, !isVisible);
                          return newMap;
                        });
                      }}
                      size={"sm"}
                      color="blue"
                      className="mt-1 ml-12 cursor-pointer select-none font-bold"
                    >
                      {showReplies.get(comment.comment_id)
                        ? "Collapse"
                        : getReplyButtonText(comment.replies.length)}
                    </Text>
                  )}

                  {/* for each reply of that comment */}
                  {showReplies.get(comment.comment_id) &&
                    comment.replies.map((repItem, repIndex) => {
                      return (
                        <ReplyTile
                          key={`post_reply_${index}_${props.post_id}_${comment.comment_id}_${repIndex}}`}
                          data={repItem}
                          commentId={comment.comment_id}
                        />
                      );
                    })}
                </div>
              );
            })}
          </div>
        );
      }}
    </Observer>
  );
}

export default CommentThread;
