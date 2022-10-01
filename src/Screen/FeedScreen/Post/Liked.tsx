import React from "react";
import { Text } from "@mantine/core";
interface LikedProps {
  data: string[];
}
function Liked(props: LikedProps) {
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
        <Text
          style={{ display: "inline-block", cursor: "pointer" }}
          variant="link"
        >
          {props.data[0]}
        </Text>
        &nbsp; liked it.
      </Text>
    );
  if (props.data.length === 2)
    return (
      <Text color="dimmed" weight={"500"} size="sm">
        <Text
          style={{ display: "inline-block", cursor: "pointer" }}
          variant="link"
        >
          {props.data[0]}
        </Text>
        &nbsp; and&nbsp;
        <Text
          style={{ display: "inline-block", cursor: "pointer" }}
          variant="link"
        >
          {props.data[1]}
        </Text>
        &nbsp; liked it.
      </Text>
    );
  return (
    <Text color="dimmed" weight={"500"} size="sm">
      <Text
        style={{ display: "inline-block", cursor: "pointer" }}
        variant="link"
      >
        {props.data[0]}
      </Text>
      , &nbsp;
      <Text
        style={{ display: "inline-block", cursor: "pointer" }}
        variant="link"
      >
        {props.data[1]}
      </Text>
      &nbsp;and &nbsp;
      <Text
        style={{ display: "inline-block", cursor: "pointer" }}
        variant="link"
      >
        others
      </Text>
      &nbsp; liked it.
    </Text>
  );
}

export default Liked;
