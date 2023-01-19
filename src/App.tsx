import ProtectedRoutes from "./ProtectedRoutes";
import ProfileIndex from "./Screen/ProfileScreen/Index";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoginIndex from "./Screen/LoginScreen/Index";
import ExploreIndex from "./Screen/ExploreScreen/Index";
import { useStores } from "./Logic/Providers/StoresProviders";
import { useEffect } from "react";
import RightFooterIndex from "./Organs/RightFooter/Index";
import LeftFooterIndex from "./Organs/LeftFooter/Index";
import styled from "styled-components";
import { Observer } from "mobx-react-lite";
import NotificationIndex from "./Screen/NotificationScreen/Index";
import FeedIndex from "./Screen/FeedScreen/Index";
import TopBar from "./Organs/Navbar/TopBar";
import BottomBar from "./Organs/Navbar/BottomBar";
import EditProfileIndex from "./Screen/EditProfileScreen/Index";
import ComingSoonScreenIndex from "./Screen/ComingScoonScreen/Index";
import LeaderBoardScreenIndex from "./Screen/LeaderBoardScreen/Index";
import PollsScreenIndex from "./Screen/PollsScreen/Index";
import FeedBackScreenIndex from "./Screen/FeedbackScreen/Index";
import FollowingScreenIndex from "./Screen/FollowingScreen/Index";
import FollowersScreenIndex from "./Screen/FollowersScreen/Index";
import PostIndex from "./Screen/PostScreen/Index";

const SApp = styled.section`
  width: 100%;
  max-width: 600px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

function App() {
  const store = useStores();

  function handleScreenWidthChanges() {
    store.appStore.setDeviceWidth(window.innerWidth);
    if (window.innerWidth <= 700) {
      store.appStore.setIsPhone(true);
    } else if (window.innerWidth <= 1250) {
      store.appStore.setIsTablet(true);
    } else {
      store.appStore.setIsDesktop(true);
    }
  }

  useEffect(() => {
    handleScreenWidthChanges();
    window.addEventListener(
      "resize",
      handleScreenWidthChanges
    );
  }, []);

  return (
    <Observer>
      {() => {
        const { appStore, authStore } = store;
        return (
          <Router>
            {authStore.user && appStore.isDesktop && (
              <RightFooterIndex />
            )}
            <SApp
              style={{
                marginBottom: `${
                  appStore.isPhone ? "50px" : "0px"
                }`,
              }}
              className={!appStore.isPhone ? "mx-3 " : ""}
            >
              <>
                {authStore.user && appStore.isPhone && (
                  <BottomBar />
                )}
                {authStore.user && <TopBar />}

                <Routes>
                  <Route
                    path="/"
                    element={<LoginIndex />}
                  />
                  <Route element={<ProtectedRoutes />}>
                    <Route
                      path="explore"
                      element={<ExploreIndex />}
                    />
                    <Route
                      path="profile"
                      element={<ProfileIndex />}
                    />
                    <Route
                      path="profile/edit"
                      element={<EditProfileIndex />}
                    />
                    <Route
                      path="notifications"
                      element={<NotificationIndex />}
                    />
                    <Route
                      path="feed"
                      element={<FeedIndex />}
                    />
                    <Route
                      path="feedback"
                      element={<FeedBackScreenIndex />}
                    />
                    <Route
                      path="polls"
                      element={<PollsScreenIndex />}
                    />
                    <Route
                      path="comingSoon"
                      element={<ComingSoonScreenIndex />}
                    />
                    <Route
                      path="leaderboard"
                      element={<LeaderBoardScreenIndex />}
                    />
                    <Route
                      path="following"
                      element={<FollowingScreenIndex />}
                    />
                    <Route
                      path="followers"
                      element={<FollowersScreenIndex />}
                    />
                    <Route
                      path="post"
                      element={<PostIndex />}
                    />
                  </Route>
                  <Route>404</Route>
                </Routes>
              </>
            </SApp>
            {authStore.user && !appStore.isPhone && (
              <LeftFooterIndex />
            )}
          </Router>
        );
      }}
    </Observer>
  );
}

export default App;
