import { Button, Textarea } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useStores } from "../../../Logic/Providers/StoresProviders";

interface AddCommentProps {
  isReply: boolean;
  post_id?: bigint;
  comment_id?: bigint;
  onComment?: () => void;
}

function AddComment(props: AddCommentProps) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { commentStore } = useStores();
  const location = useLocation();
  const commentRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (location.search.includes("open_comments=true") && !props.isReply) {
    } else {
      commentRef.current?.focus();
    }
  }, [location.search, props.isReply]);

  return (
    <div className="flex w-full items-center justify-center border border-solid border-transparent border-b-gray-300">
      <div className="w-full">
        <Textarea
          ref={commentRef}
          variant="unstyled"
          minRows={1}
          placeholder={`Write a ${props.isReply ? "reply" : "comment"}`}
          autosize
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
      </div>
      <Button
        loading={loading}
        className="ml-2"
        compact
        disabled={comment.length === 0}
        onClick={() => {
          const parent_id = props.comment_id || props.post_id;
          if (!parent_id) return;
          commentStore
            .Comment(parent_id, comment, props.comment_id != null)
            .then(() => {
              setComment("");
            })
            .catch((err) => {
              showNotification({ message: `${err}`, color: "red" });
            })
            .finally(() => {
              setLoading(false);
              if (props.onComment) props.onComment();
            });
        }}
      >
        {props.isReply ? "Reply" : "Comment"}
      </Button>
    </div>
  );
}

export default AddComment;
