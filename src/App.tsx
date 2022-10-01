import ProtectedRoutes from "./ProtectedRoutes";
import ProfileIndex from "./Screen/ProfileScreen/Index";
import LogoutIndex from "./Screen/LogoutScreen/Index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginIndex from "./Screen/LoginScreen/Index";
import NetworkIndex from "./Screen/NetworkScreen/Index";
import { useStores } from "./Logic/Providers/StoresProviders";
import { useEffect } from "react";
import RightFooterIndex from "./Organs/RightFooter/Index";
import LeftFooterIndex from "./Organs/LeftFooter/Index";
import styled from "styled-components";
import { Observer } from "mobx-react-lite";
import FeedIndex from "./Screen/FeedScreen/Index";
import TopBar from "./Organs/Navbar/TopBar";
import BottomBar from "./Organs/Navbar/BottomBar";

const SApp = styled.section`
  width: 100%;
  max-width: 600px;
  height: fit-content;
`;

function App() {
  const store = useStores();

  function handleScreenWidthChanges() {
    if (window.innerWidth <= 650) {
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
            {<TopBar />}
            {authStore.user && appStore.isDesktop && <LeftFooterIndex />}
            <SApp
              style={{
                marginBottom: `${appStore.isPhone ? "50px" : "0px"}`,
              }}
            >
              <Router>
                <Routes>
                  <Route path="/login" element={<LoginIndex />} />
                  <Route element={<ProtectedRoutes />}>
                    <Route path="network" element={<NetworkIndex />} />
                    <Route path="profile" element={<ProfileIndex />} />
                    <Route path="logout" element={<LogoutIndex />} />
                  </Route>
                  <Route path="/feed" element={<FeedIndex />} />
                  <Route>404</Route>
                </Routes>
              </Router>
            </SApp>
            {authStore.user && !appStore.isPhone && <RightFooterIndex />}
            {appStore.isPhone && <BottomBar />}
          </>
        );
      }}
    </Observer>
  );
}

export default App;
