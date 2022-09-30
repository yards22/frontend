import React from "react";
import styled from "styled-components";
import NewPost from "./Post/NewPost";
const SFeedIndex = styled.section`
  height: 100%;
  width: 100%;
  border: 0.2px solid #dddddda2;
`;

function FeedIndex() {
  return (
    <SFeedIndex>
      <NewPost />
    </SFeedIndex>
  );
}

export default FeedIndex;
