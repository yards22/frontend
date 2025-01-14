import ProtectedRoutes from "./ProtectedRoutes";
import ProfileIndex from "./Screen/ProfileScreen/Index";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import LeaderBoardScreenIndex from "./Screen/LeaderBoardScreen/Index";
import PollsScreenIndex from "./Screen/PollsScreen/Index";
import FeedBackScreenIndex from "./Screen/FeedbackScreen/Index";
import FollowingScreenIndex from "./Screen/FollowingScreen/Index";
import FollowersScreenIndex from "./Screen/FollowersScreen/Index";
import PostIndex from "./Screen/PostScreen/Index";
import PrivacyPolicy from "./Screen/TCPP/PrivacyPolicy";
import TC from "./Screen/TCPP/TC";
import Auction from "./Screen/ComingSoonScreen/Auction";
import News from "./Screen/ComingSoonScreen/News";
import LiveScore from "./Screen/ComingSoonScreen/LiveScore";
import InstMatchIndex from "./Screen/InstMatchScreen/Index";
import TheScoreCard from "./Screen/InstMatchScreen/ChangeScorePage/ChangeScorePageIndex";

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
    window.addEventListener("resize", handleScreenWidthChanges);
  }, []);

  return (
    <Observer>
      {() => {
        const { appStore, authStore } = store;
        return (
          <Router>
            {authStore.user && appStore.isDesktop && <RightFooterIndex />}
            <SApp
              style={{
                marginBottom: `${appStore.isPhone ? "70px" : "0px"}`
              }}
              className={!appStore.isPhone ? "mx-3 " : ""}
            >
              <>
                {authStore.user && appStore.isPhone && <BottomBar />}
                {authStore.user && <TopBar />}

                <Routes>
                  <Route path="/" element={<LoginIndex />} />
                  <Route element={<ProtectedRoutes />}>
                    <Route path="explore" element={<ExploreIndex />} />
                    <Route path="profile" element={<ProfileIndex />} />
                    <Route path="profile/edit" element={<EditProfileIndex />} />
                    <Route
                      path="notifications"
                      element={<NotificationIndex />}
                    />
                    <Route path="feed" element={<FeedIndex />} />
                    <Route path="feedback" element={<FeedBackScreenIndex />} />
                    <Route path="polls" element={<PollsScreenIndex />} />
                    <Route path="auction-table" element={<Auction />} />
                    <Route path="news" element={<News />} />
                    <Route path="live-scores" element={<LiveScore />} />
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
                    <Route path="post" element={<PostIndex />} />
                    {/* <Route path="instantMatch" element={<InstMatchIndex/>} />
                    <Route path="instantMatch/:id" element={<TheScoreCard/>} /> */}
                    <Route path="**" element={<Navigate to={"feed"}/>}/>
                  </Route>
                  <Route path="privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="terms-and-conditions" element={<TC />} />
                  <Route>404</Route>
                </Routes>
              </>
            </SApp>
            {authStore.user && !appStore.isPhone && <LeftFooterIndex />}
          </Router>
        );
      }}
    </Observer>
  );
}

export default App;
