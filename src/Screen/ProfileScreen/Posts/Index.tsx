import { Tabs, Title } from "@mantine/core";
import React, { useState } from "react";
import UserPosts from "../UserPosts/UserPosts";

function ProfilePostsIndex() {
  const [activePostsTab, setActivePostsTab] = useState("Posts");
  return (
    <div style={{ padding: "0 10px", marginTop: "40px" }}>
      <Tabs
        value={activePostsTab}
        onTabChange={(e: any) => setActivePostsTab(e)}
        mt={10}
        variant="default"
      >
        <Tabs.List grow>
          <Tabs.Tab value="Posts">
            <Title order={6}>All Posts</Title>
          </Tabs.Tab>
          <Tabs.Tab value="Favorites">
            <Title order={6}>Favorite Posts</Title>
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      {activePostsTab === "Posts" && <UserPosts />}
      {activePostsTab === "Favorites" && <UserPosts />}
    </div>
  );
}

export default ProfilePostsIndex;
