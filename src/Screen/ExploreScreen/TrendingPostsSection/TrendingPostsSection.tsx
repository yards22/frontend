import styled from "styled-components";
import { DummyPosts } from "../../../Data/Dummies/Post";
import NormalPost from "../../FeedScreen/Post/NormalPost";

const STrendingPostsSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
`;

function TrendingPostsSection() {
  return (
    <STrendingPostsSection>
      {DummyPosts.map((item, index) => {
        return <NormalPost data={item} key={`normal_post_${index}`} />;
      })}
    </STrendingPostsSection>
  );
}

export default TrendingPostsSection;
