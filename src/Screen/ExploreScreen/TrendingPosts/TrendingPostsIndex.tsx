import { Text } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import NormalPost from "../../FeedScreen/Post/NormalPost";

function TrendingPostsIndex() {
  const stores = useStores();
  return (
    <div className="flex w-full flex-col">
      <Text weight={"bold"} className="mb-2">
        Trending Posts
      </Text>
      <Observer>
        {() => {
          const { postStore } = stores;
          if (!postStore.viewPosts) return <></>;
          return (
            <div className="flex flex-col gap-1">
              {postStore.viewPosts.map((item, index) => {
                return <NormalPost data={item} type="trending"  key={`normal_post_${index}`} />;
              })}
            </div>
          );
        }}
      </Observer>
    </div>
  );
}

export default TrendingPostsIndex;
