import { useMantineTheme, Text } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { Home, Globe, User, Search, Award, BarChart2 } from "react-feather";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NotificationBellWithCount from "../../Atoms/NotificationBellWithCount";
import { useStores } from "../../Logic/Providers/StoresProviders";
import Logo from "../../Logos/22YardzW.png";

const STopBar = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  margin: 0 10px;
  color: ${(p) => p.theme.color};
  cursor: pointer;
  transition: all 0.3s;
  :hover {
    color: #525252;
  }
`;

const STopBarContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 25px;
  height: 60px;
  width: 100%;
`;

function TopBarTablet() {
  const stores = useStores();
  const mantineTheme = useMantineTheme();
  const navigate = useNavigate();
  return (
    <Observer>
      {() => {
        const { appStore } = stores;
        return (
          <STopBarContainer>
            <div
              style={{
                background: mantineTheme.colors[mantineTheme.primaryColor][7]
              }}
              className="rounded-md px-2 py-1"
            >
              <img src={Logo} className="h-6 w-fit" alt="logo" />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center"
              }}
            >
              <STopBar
                theme={{
                  color:
                    appStore.navigationState === 0
                      ? mantineTheme.colors[mantineTheme.primaryColor][7]
                      : "gray"
                }}
                onClick={() => {
                  navigate("/feed");
                  appStore.setNavigationState(0);
                }}
              >
                <Home size={"20"} />
                <Text size="xs">Home</Text>
              </STopBar>
              <STopBar
                theme={{
                  color:
                    appStore.navigationState === 2
                      ? mantineTheme.colors[mantineTheme.primaryColor][7]
                      : "gray"
                }}
                onClick={() => {
                  navigate("/explore");
                  appStore.setNavigationState(2);
                }}
              >
                <Globe size={"20"} />
                <Text size="xs">Explore</Text>
              </STopBar>
              <STopBar
                theme={{
                  color:
                    appStore.navigationState === 1
                      ? mantineTheme.colors[mantineTheme.primaryColor][7]
                      : "gray"
                }}
                onClick={() => {
                  navigate("/explore?inputFocus=true" + new Date().getTime());
                  appStore.setNavigationState(2);
                }}
              >
                <Search size={"20"} />
                <Text size="xs">Search </Text>
              </STopBar>
              <STopBar
                theme={{
                  color:
                    appStore.navigationState === 3
                      ? mantineTheme.colors[mantineTheme.primaryColor][7]
                      : "gray"
                }}
                onClick={() => {
                  navigate("/notifications");
                  appStore.setNavigationState(3);
                }}
              >
                <Observer>
                  {() => {
                    const { notificationStore } = stores;
                    return (
                      <NotificationBellWithCount
                        count={notificationStore.notSeenCount}
                      />
                    );
                  }}
                </Observer>
                <Text size="xs">Notifications</Text>
              </STopBar>
              <STopBar
                theme={{
                  color:
                    appStore.navigationState === 6
                      ? mantineTheme.colors[mantineTheme.primaryColor][7]
                      : "gray"
                }}
                onClick={() => {
                  navigate("/polls");
                  appStore.setNavigationState(6);
                }}
              >
                <BarChart2 size={"20"} />
                <Text size="xs">Polls</Text>
              </STopBar>
              <STopBar
                theme={{
                  color:
                    appStore.navigationState === 5
                      ? mantineTheme.colors[mantineTheme.primaryColor][7]
                      : "gray"
                }}
                onClick={() => {
                  navigate("/leaderboard");
                  appStore.setNavigationState(5);
                }}
              >
                <Award size={"20"} />
                <Text size="xs">LeaderBoard</Text>
              </STopBar>
              <STopBar
                theme={{
                  color:
                    appStore.navigationState === 4
                      ? mantineTheme.colors[mantineTheme.primaryColor][7]
                      : "gray"
                }}
                onClick={() => {
                  navigate("/profile");
                  appStore.setNavigationState(4);
                }}
              >
                <User size={"20"} />
                <Text size="xs">Profile</Text>
              </STopBar>
            </div>
            {/* </div> */}
          </STopBarContainer>
        );
      }}
    </Observer>
  );
}

export default TopBarTablet;
