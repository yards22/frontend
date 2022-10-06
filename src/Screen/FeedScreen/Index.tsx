import { useEffect } from "react";
import styled from "styled-components";
import { DummyPosts } from "../../Data/Dummies/Post";
import MPost from "../../Logic/Model/MPost";
import { useStores } from "../../Logic/Providers/StoresProviders";
import NewPost from "./Post/NewPost";
import NormalPost from "./Post/NormalPost";
const SFeedIndex = styled.section`
  width: 100%;
  max-width: 600px;
  border: 0.2px solid #bdbdbda0;
`;

const posts: MPost[] = DummyPosts;
function FeedIndex() {
  const stores = useStores();
  useEffect(() => {
    stores.appStore.setNavigationState(0);
  }, []);
  return (
    <SFeedIndex>
      <NewPost />
      {posts.map((item, index) => {
        return <NormalPost data={item} key={`normal_post_${index}`} />;
      })}
    </SFeedIndex>
  );
}

export default FeedIndex;
