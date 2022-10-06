import { Title, Text, useMantineTheme } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import React from "react";
import { Home, Bell, User, Search } from "react-feather";
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
function TopBar() {
  const stores = useStores();
  const mantineTheme = useMantineTheme();
  if (stores.appStore.isPhone) {
    return (
      <div
        style={{
          background: mantineTheme.colors[mantineTheme.primaryColor][6],
          position : "fixed",
          top : "0",
          left : "0",
          right : "0",
          height: "50px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Title color={"white"} order={5}>
          22 Yards
        </Title>
      </div>
    );
  }
  return (
    <Observer>
      {() => {
        const { appStore } = stores;
        return (
          <div
            style={{
              position : "fixed",
              top : "0",
              left : "0",
              right : "0",
              background: mantineTheme.colors["gray"][0],
              border: "1px solid " + mantineTheme.colors["green"][3],
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              height: "60px",
              width: "100%",
            }}
          >
            <STopBar
              theme={{
                color:
                  appStore.navigationState === 0
                    ? mantineTheme.colors[mantineTheme.primaryColor][7]
                    : "gray",
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
            >
              <User size={"20"} />
              <Text size="xs">Profile</Text>
            </STopBar>
          </div>
        );
      }}
    </Observer>
  );
}

export default TopBar;
