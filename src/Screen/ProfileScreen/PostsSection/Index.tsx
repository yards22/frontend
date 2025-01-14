import { Button, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "react-feather";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import PostList from "./PostList";

function PostsSectionIndex() {
  const stores = useStores();
  const [selectedTypeOfPosts, setSelectedTypeOfPosts] = useState<
    "mine" | "fav"
  >("mine");
  const { profileStore } = useStores();
  const [sortByNewFirst, setSortNewFirst] = useState(true);
  let postsForUserId: Number | undefined = undefined;
  if (
    !(profileStore.viewProfile?.user_id === profileStore.profile?.user_id) &&
    profileStore.viewProfile?.user_id
  )
    postsForUserId = profileStore.viewProfile?.user_id;
  useEffect(() => {
    stores.postStore.GetPosts(
      selectedTypeOfPosts,
      postsForUserId,
      sortByNewFirst ? "desc" : "asc"
    );
  });

  return (
    <div className="mt-4 flex w-full flex-col p-2">
      <div className="mb-2 flex w-full items-center justify-between">
        {postsForUserId ? (
          <b>Created Posts</b>
        ) : (
          <Select
            placeholder="Pick type"
            data={[
              { value: "mine", label: "Create Posts" },
              { value: "fav", label: "Favorite Posts" }
            ]}
            value={selectedTypeOfPosts}
            onChange={(e: any) => {
              if (e) setSelectedTypeOfPosts(e);
            }}
          />
        )}

        <Button variant="subtle" onClick={() => setSortNewFirst((p) => !p)}>
          Date
          {sortByNewFirst && (
            <ArrowUp size={"18"} style={{ marginLeft: "5px" }} />
          )}
          {!sortByNewFirst && (
            <ArrowDown size={"18"} style={{ marginLeft: "5px" }} />
          )}
        </Button>
      </div>
      <PostList />
    </div>
  );
}

export default PostsSectionIndex;
