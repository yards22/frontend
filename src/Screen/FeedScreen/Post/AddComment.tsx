import { Button, Textarea, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";

interface AddCommentProps {
  isReply: boolean;
}

function AddComment(props: AddCommentProps) {
  const mantineTheme = useMantineTheme();
  const [comment, setComment] = useState("");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        borderBottom: `1.5px solid ${mantineTheme.colors.gray[4]}`,
      }}
    >
      <div style={{ width: "100%" }}>
        <Textarea
          variant="unstyled"
          minRows={1}
          placeholder={`Write a ${props.isReply ? "reply" : "comment"}`}
          autosize
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
      </div>
      <Button
        style={{ marginLeft: "10px" }}
        // variant="white"
        compact
        disabled={comment.length === 0}
      >
        {props.isReply ? "Reply" : "Comment"}
      </Button>
    </div>
  );
}

export default AddComment;
