import ProtectedRoutes from "./ProtectedRoutes";
import ProfileIndex from "./Screen/ProfileScreen/Index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
          <>
            {authStore.user && appStore.isDesktop && <LeftFooterIndex />}
            <SApp
              style={{
                marginBottom: `${appStore.isPhone ? "50px" : "0px"}`,
              }}
            >
              <Router>
                {authStore.user && <TopBar />}

                {authStore.user && appStore.isPhone && <BottomBar />}
    <Routes>
                  <Route path="/login" element={<LoginIndex />} />
                  <Route element={<ProtectedRoutes />}>
                    <Route path="explore" element={<ExploreIndex />} />
                    <Route path="profile" element={<ProfileIndex />} />
                    <Route
                      path="notifications"
                      element={<NotificationIndex />}
                    />
                    <Route path="feed" element={<FeedIndex />} />
                  </Route>
                  <Route>404</Route>
                </Routes>
              </Router>
            </SApp>
            {authStore.user && !appStore.isPhone && <RightFooterIndex />}
          </>
        );
      }}
    </Observer>
  );
}

export default App;
