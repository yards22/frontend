import { Title, useMantineTheme, Text } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { Home, Globe, Bell, User, Search } from "react-feather";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useStores } from "../../Logic/Providers/StoresProviders";

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

function TopBarDesktop() {
  const stores = useStores();
  const mantineTheme = useMantineTheme();
  const navigate = useNavigate();
  return (
    <Observer>
      {() => {
        const { appStore } = stores;
        return (
          <STopBarContainer>
            <Title color={"black"} order={2}>
              22 Yardz
            </Title>
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
                    appStore.navigationState === 1
                      ? mantineTheme.colors[mantineTheme.primaryColor][7]
                      : "gray"
                }}
                onClick={() => {
                  navigate("/explore");
                  appStore.setNavigationState(1);
                }}
              >
                <Globe size={"20"} />
                <Text size="xs">Explore</Text>
              </STopBar>
              <STopBar
                theme={{
                  color:
                    appStore.navigationState === 2
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
                <Bell size={"20"} />
                <Text size="xs">Notifications</Text>
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

export default TopBarDesktop;
