import { Textarea, Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useStores } from "../../../Logic/Providers/StoresProviders";

interface AddReplyProps {
  commentId: bigint;
  onReply?: () => void;
}

function AddReply(props: AddReplyProps) {
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const { commentStore } = useStores();

  return (
    <div className="flex w-full items-center justify-center border border-solid border-transparent border-b-gray-300">
      <div className="w-full">
        <Textarea
          variant="unstyled"
          minRows={1}
          autoFocus
          placeholder="Write a reply"
          autosize
          onChange={(e) => setReply(e.target.value)}
          value={reply}
        />
      </div>
      <Button
        loading={loading}
        className="ml-2"
        compact
        disabled={reply.length === 0}
        onClick={() => {
          commentStore
            .Comment(props.commentId, reply, true)
            .then(() => {
              setReply("");
            })
            .catch((err) => {
              showNotification({ message: `${err}`, color: "red" });
            })
            .finally(() => {
              setLoading(false);
              if (props.onReply) props.onReply();
            });
        }}
      >
        Reply
      </Button>
    </div>
  );
}

export default AddReply;
