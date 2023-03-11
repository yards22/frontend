import { Observer } from "mobx-react-lite";
import Loading from "../../../Atoms/Loading";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import NormalPost from "../../FeedScreen/Post/NormalPost";

interface PostListProps{
  type:"fav"|"mine"
}

function PostList(props:PostListProps) {
  const stores = useStores();

  return (
    <Observer>
      {() => {
        const { postStore } = stores;
        if (!postStore.viewPosts) return <Loading />;
        if (postStore.viewPosts.length === 0)
          return (
            <b className="mt-4 w-full text-center text-gray-700">
              No post items.
            </b>
          );
        return (
          <div className="mb-5 flex flex-col gap-3">
            {postStore.viewPosts.map((item, index) => {
              return <NormalPost data={item} type={props.type ==="mine"?"mine":"fav"} key={`normal_post_${index}`} />;
            })}
          </div>
        );
      }}
    </Observer>
  );
}

export default PostList;
