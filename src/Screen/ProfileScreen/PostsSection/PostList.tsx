import { Observer } from "mobx-react-lite";
import Loading from "../../../Atoms/Loading";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import NormalPost from "../../FeedScreen/Post/NormalPost";

function PostList() {
  const stores = useStores();

  return (
    <Observer>
      {() => {
        const { postStore } = stores;
        if (!postStore.viewPosts) return <Loading />;
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {postStore.viewPosts.map((item, index) => {
              return <NormalPost data={item} key={`normal_post_${index}`} />;
            })}
          </div>
        );
      }}
    </Observer>
  );
}

export default PostList;
