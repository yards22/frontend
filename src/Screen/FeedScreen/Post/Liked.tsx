import React, { useState } from "react";
import { Modal, Text } from "@mantine/core";
import LikeList from "./LikeList";
import LinkedUserName from "../../../Atoms/LinkedUserName";
interface LikedProps {
  data: string[];
}
function Liked(props: LikedProps) {
  const [showModal, setShowModal] = useState(false);
  if (props.data.length === 0) {
    return (
      <Text color="dimmed" weight={"500"} size="sm">
        Be the first one to like it.
      </Text>
    );
  }
  if (props.data.length === 1)
    return (
      <Text color="dimmed" weight={"500"} size="sm">
        <LinkedUserName
          style={{ display: "inline-block", cursor: "pointer" }}
          username={props.data[0]}
        />
        &nbsp; liked it.
      </Text>
    );
  if (props.data.length === 2)
    return (
      <Text color="dimmed" weight={"500"} size="sm">
        <LinkedUserName
          style={{ display: "inline-block", cursor: "pointer" }}
          username={props.data[0]}
        />
        &nbsp; and&nbsp;
        <LinkedUserName
          style={{ display: "inline-block", cursor: "pointer" }}
          username={props.data[1]}
        />
        &nbsp; liked it.
      </Text>
    );
  return (
    <>
      <Modal
        opened={showModal}
        onClose={() => setShowModal(false)}
        title="Likes"
      >
        <LikeList likedBy={props.data} />
      </Modal>
      <Text color="dimmed" weight={"500"} size="sm">
        <LinkedUserName
          style={{ display: "inline-block", cursor: "pointer" }}
          username={props.data[0]}
        />
        , &nbsp;
        <LinkedUserName
          style={{ display: "inline-block", cursor: "pointer" }}
          username={props.data[1]}
        />
        &nbsp;and &nbsp;
        <Text
          style={{ display: "inline-block", cursor: "pointer" }}
          variant="link"
          onClick={(e: any) => {
            e.preventDefault();
            setShowModal(true);
          }}
        >
          others
        </Text>
        &nbsp; liked it.
      </Text>
    </>
  );
}

export default Liked;
