import { Title, Text, useMantineTheme, Burger } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { useState } from "react";
import { Home, Bell, User, Search, Globe } from "react-feather";
import { createSearchParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useStores } from "../../Logic/Providers/StoresProviders";

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

const SMobileBar = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  margin: 8px 0px;
  color: ${(p) => p.theme.color};
  cursor: pointer;
  transition: all 0.3s;
  :hover {
    color: #525252;
  }
`;
function TopBar() {
  const stores = useStores();
  const mantineTheme = useMantineTheme();
  const navigate = useNavigate();
  const [isNavBarOpened, setIsNavBarOpened] = useState(false)

  if (stores.appStore.isPhone) {
    return (
      <Observer>
      {()=>{
        const { appStore } = stores;
        return(
          <div
            style={{
              background: mantineTheme.colors[mantineTheme.primaryColor][6],
              position: "fixed",
              top: "0",
              left: "0",
              zIndex: "100",
              right: "0",
              height: "60px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Burger 
              opened={isNavBarOpened}
              color = {'white'}
              style = {{
                position : "absolute",
                left : "13px"
              }}
              onClick = {()=>{setIsNavBarOpened(!isNavBarOpened)}}
            />
            <Title color={"white"} order={5}>
              22 Yards
            </Title>
          { isNavBarOpened && 
            <div 
              style={{
                background: 'white',
                position : "fixed",
                top : "60px",
                left : "0px",
                right : "0px",
                bottom : "0px",
                zIndex : "101",
                display : "flex",
                flexDirection : "column",
                alignItems : 'start',
                padding : "20px 13px"
              }}
            > 
              <SMobileBar
                theme={{
                  color:
                    appStore.navigationState === 5
                      ? mantineTheme.colors[mantineTheme.primaryColor][7]
                      : "gray",
                }}
                onClick={() => {
                  navigate("/profile");
                  appStore.setNavigationState(5);
                  setIsNavBarOpened(false)
                }}
              >
                {/* <Home size={"25"} /> */}
                <Text style={{fontSize : "20px"}} ml={"sm"}>Profile</Text>
              </SMobileBar>
              <SMobileBar
                theme={{
                  color:
                    appStore.navigationState === 6
                      ? mantineTheme.colors[mantineTheme.primaryColor][7]
                      : "gray",
                }}
                onClick={() => {
                  navigate("/leaderBoard");
                  appStore.setNavigationState(6);
                  setIsNavBarOpened(false)
                }}
              >
                {/* <Home size={"25"} /> */}
                <Text style={{fontSize : "20px"}} ml={"sm"}>LeaderBoard</Text>
              </SMobileBar>
              <SMobileBar
                theme={{
                  color:
                    appStore.navigationState === 7
                      ? mantineTheme.colors[mantineTheme.primaryColor][7]
                      : "gray",
                }}
                onClick={() => {
                  navigate("/polls");
                  appStore.setNavigationState(7);
                  setIsNavBarOpened(false)
                }}
              >
                {/* <Home size={"25"} /> */}
                <Text style={{fontSize : "20px"}} ml={"sm"}>Polls</Text>
              </SMobileBar>
              <SMobileBar
                theme={{
                  color:
                    appStore.navigationState === 8
                      ? mantineTheme.colors[mantineTheme.primaryColor][7]
                      : "gray",
                }}
                onClick={() => {
                  navigate("/comingSoon");
                  appStore.setNavigationState(8);
                  setIsNavBarOpened(false)
                }}
              >
                {/* <Home size={"25"} /> */}
                <Text style={{fontSize : "20px"}} ml={"sm"}>Coming Soon</Text>
              </SMobileBar>
              <SMobileBar
                theme={{
                  color:
                    appStore.navigationState === 9
                      ? mantineTheme.colors[mantineTheme.primaryColor][7]
                      : "gray",
                }}
                onClick={() => {
                  navigate("/feedback");
                  appStore.setNavigationState(9);
                  setIsNavBarOpened(false)
                }}
              >
                {/* <Home size={"25"} /> */}
                <Text style={{fontSize : "20px"}} ml={"sm"}>Feed Back</Text>
              </SMobileBar>
          </div>
        }
          </div>
        )
      }}
      </Observer>
    );
  }
  return (
    <Observer>
      {() => {
        const { appStore } = stores;
        return (
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              right: "0",
              borderBottom: "1px solid #eaeaea",
              display: "flex",
              justifyContent: "center",
              height: "60px",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "1400px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: "25px",
                paddingRight: "25px",
              }}
            >
              <Title color={"black"} order={2}>
                22 Yards
              </Title>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <STopBar
                  theme={{
                    color:
                      appStore.navigationState === 0
                        ? mantineTheme.colors[mantineTheme.primaryColor][7]
                        : "gray",
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
                        : "gray",
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
                        : "gray",
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
                        : "gray",
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
                        : "gray",
                  }}
                  onClick={() => {
                    navigate({
                      pathname: "/profile",
                      search: `${createSearchParams({
                        user: `${stores.profileStore.profile?.username}`,
                      })}`,
                    });
                    appStore.setNavigationState(4);
                  }}
                >
                  <User size={"20"} />
                  <Text size="xs">Profile</Text>
                </STopBar>
              </div>
            </div>
          </div>
        );
      }}
    </Observer>
  );
}

export default TopBar;
