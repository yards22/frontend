import styled from "styled-components";
import { DummyPosts } from "../../../Data/Dummies/Post";
import NormalPost from "../../FeedScreen/Post/NormalPost";

const SUserPosts = styled.div`
  display: flex;
  flex-direction: column;
`;

function UserPosts() {
  return (
    <SUserPosts>
      {DummyPosts.map((item, index) => {
        return <NormalPost data={item} key={`normal_post_${index}`} />;
      })}
    </SUserPosts>
  );
}

export default UserPosts;
