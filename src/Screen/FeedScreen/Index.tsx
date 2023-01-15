import { Observer } from "mobx-react-lite";
import { useEffect } from "react";
import styled from "styled-components";
import Loading from "../../Atoms/Loading";
import { useStores } from "../../Logic/Providers/StoresProviders";
import NewPost from "./Post/NewPost";
import NormalPost from "./Post/NormalPost";

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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              gap: "5px",
            }}
          >
            <NewPost />
            {postStore.viewPosts.map((item, index) => {
              return <NormalPost data={item} key={`normal_post_${index}`} />;
            })}
          </div>
        );
      }}
    </Observer>
  );
}

export default FeedIndex;
