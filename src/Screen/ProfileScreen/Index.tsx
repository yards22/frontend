import { Loader, Tabs, Title } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useStores } from "../../Logic/Providers/StoresProviders";
import UserFavourites from "./Favourites/UserFavourites";
import Followers from "./Followers/Followers";
import Following from "./Following/Following";
import InterestsSection from "./InterestsSection/InterestsSection";
import ProfileDetailsSectionIndex from "./ProfileDetailsSection/Index";
import UserPosts from "./UserPosts/UserPosts";

const SProfileIndex = styled.div`
  width: 100%;
`;

function ProfileIndex() {
  const store = useStores();
  const [currentRenderingInProfileRoute, setCurrentRenderingInProfileRoute] =
    useState("Profile");
  const [activePostsTab, setActivePostsTab] = useState("Posts");
  const [profileInfo, setProfileInfo] = useState<any>(null);
  const search = useLocation().search;
  const currentUser = new URLSearchParams(search).get("user");

  useEffect(() => {
    getTheCurrentUser();
    store.appStore.setNavigationState(4);
  }, []);

  async function getTheCurrentUser() {
    await store.profileStore.GetProfile(store.authStore.token);
  }

  useEffect(() => {}, [profileInfo]);

  function handleCurrentRenderingInProfileRoute(current: string) {
    setCurrentRenderingInProfileRoute(current);
  }

  return (
    <Observer>
      {() => {
        const { profileStore } = store;
        return profileStore.profile ? (
          <SProfileIndex>
            {currentRenderingInProfileRoute === "Profile" && (
              <>
                <ProfileDetailsSectionIndex
                  profileInfo={
                    store.profileStore.profile?.username === currentUser
                      ? store.profileStore.profile
                      : profileInfo
                  }
                  handleCurrentRenderingInProfileRoute={
                    handleCurrentRenderingInProfileRoute
                  }
                />
                <InterestsSection />
                <div style={{ padding: "0 10px" }}>
                  <Tabs
                    value={activePostsTab}
                    onTabChange={(e: any) => setActivePostsTab(e)}
                    style={{
                      marginTop: "20px",
                    }}
                    mt={10}
                    variant="pills"
                  >
                    <Tabs.List grow>
                      <Tabs.Tab value="Posts">All Posts</Tabs.Tab>
                      <Tabs.Tab value="Favorites">Favorite Posts</Tabs.Tab>
                    </Tabs.List>
                  </Tabs>
                  {activePostsTab === "Posts" && <UserPosts />}
                  {activePostsTab === "Favorites" && <UserFavourites />}
                </div>
              </>
            )}
            {currentRenderingInProfileRoute === "Following" && (
              <Following
                handleCurrentRenderingInProfileRoute={
                  handleCurrentRenderingInProfileRoute
                }
              />
            )}
            {currentRenderingInProfileRoute === "Followers" && (
              <Followers
                handleCurrentRenderingInProfileRoute={
                  handleCurrentRenderingInProfileRoute
                }
              />
            )}
          </SProfileIndex>
        ) : (
          <div
            style={{
              height: "50%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Loader />
          </div>
        );
      }}
    </Observer>
  );
}

export default ProfileIndex;
