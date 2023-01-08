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
  padding: ${(p) => (p.theme.isPhone ? "0" : "8px")};
`;

const posts: MPost[] = DummyPosts;
function FeedIndex() {
  const stores = useStores();
  if (!stores.profileStore.profile) stores.profileStore.GetMyProfile();
  useEffect(() => {
    stores.appStore.setNavigationState(0);
  }, []);
  return (
    <SFeedIndex theme={{ isPhone: stores.appStore.isPhone }}>
      <NewPost />
      {posts.map((item, index) => {
        return <NormalPost data={item} key={`normal_post_${index}`} />;
      })}
    </SFeedIndex>
  );
}

export default FeedIndex;
