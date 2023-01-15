import { Text } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { Zap } from "react-feather";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import NormalPost from "../../FeedScreen/Post/NormalPost";

function TrendingPostsIndex() {
  const stores = useStores();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Text
        weight={"bold"}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        Trending Posts
        <Zap
          fill="red"
          color="black"
          size={20}
          style={{ marginLeft: "10px" }}
        />
      </Text>
      <Observer>
        {() => {
          const { postStore } = stores;
          if (!postStore.viewPosts) return <></>;
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              {postStore.viewPosts.map((item, index) => {
                return <NormalPost data={item} key={`normal_post_${index}`} />;
              })}
            </div>
          );
        }}
      </Observer>
    </div>
  );
}

export default TrendingPostsIndex;
