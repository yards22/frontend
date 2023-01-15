import { Observer } from "mobx-react-lite";
import { useEffect } from "react";
import styled from "styled-components";
import Loading from "../../Atoms/Loading";
import { useStores } from "../../Logic/Providers/StoresProviders";
import NewPost from "./Post/NewPost";
import NormalPost from "./Post/NormalPost";
const SFeedIndex = styled.section`
  width: 100%;
  max-width: 600px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

function FeedIndex() {
  const stores = useStores();
  if (!stores.profileStore.profile) stores.profileStore.GetMyProfile();
  useEffect(() => {
    stores.appStore.setNavigationState(0);
    stores.postStore.GetPosts("feed");
  }, []);
  return (
    <Observer>
      {() => {
        const { postStore } = stores;
        if (!postStore.viewPosts) return <Loading />;
        return (
          <SFeedIndex theme={{ isPhone: stores.appStore.isPhone }}>
            <NewPost />
            {postStore.viewPosts.map((item, index) => {
              return <NormalPost data={item} key={`normal_post_${index}`} />;
            })}
          </SFeedIndex>
        );
      }}
    </Observer>
  );
}

export default FeedIndex;
