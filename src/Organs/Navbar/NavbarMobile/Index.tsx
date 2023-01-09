import { useMantineTheme, Text } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useStores } from "../../../Logic/Providers/StoresProviders";

const SNavBarMobile = styled.div`
  background: white;
  position: fixed;
  top: 60px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 101;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 20px 13px;
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

interface INavBarMobile {
  setIsNavBarOpened: (e: boolean) => void;
}

function NavBarMobile({ setIsNavBarOpened }: INavBarMobile) {
  const stores = useStores();
  const mantineTheme = useMantineTheme();
  const navigate = useNavigate();
  const { appStore } = stores;
  return (
    <Observer>
      {() => {
        return (
          <SNavBarMobile>
            <SMobileBar
              theme={{
                color:
                  appStore.navigationState === 4
                    ? mantineTheme.colors[mantineTheme.primaryColor][7]
                    : "gray",
              }}
              onClick={() => {
                navigate("/profile");
                appStore.setNavigationState(4);
                setIsNavBarOpened(false);
              }}
            >
              {/* <Home size={"25"} /> */}
              <Text style={{ fontSize: "20px" }} ml={"sm"}>
                Profile
              </Text>
            </SMobileBar>
            <SMobileBar
              theme={{
                color:
                  appStore.navigationState === 5
                    ? mantineTheme.colors[mantineTheme.primaryColor][7]
                    : "gray",
              }}
              onClick={() => {
                navigate("/leaderboard");
                appStore.setNavigationState(5);
                setIsNavBarOpened(false);
              }}
            >
              {/* <Home size={"25"} /> */}
              <Text style={{ fontSize: "20px" }} ml={"sm"}>
                LeaderBoard
              </Text>
            </SMobileBar>
            <SMobileBar
              theme={{
                color:
                  appStore.navigationState === 6
                    ? mantineTheme.colors[mantineTheme.primaryColor][7]
                    : "gray",
              }}
              onClick={() => {
                navigate("/polls");
                appStore.setNavigationState(6);
                setIsNavBarOpened(false);
              }}
            >
              {/* <Home size={"25"} /> */}
              <Text style={{ fontSize: "20px" }} ml={"sm"}>
                Polls
              </Text>
            </SMobileBar>
            <SMobileBar
              theme={{
                color:
                  appStore.navigationState === 7
                    ? mantineTheme.colors[mantineTheme.primaryColor][7]
                    : "gray",
              }}
              onClick={() => {
                navigate("/comingSoon");
                appStore.setNavigationState(7);
                setIsNavBarOpened(false);
              }}
            >
              {/* <Home size={"25"} /> */}
              <Text style={{ fontSize: "20px" }} ml={"sm"}>
                Coming Soon
              </Text>
            </SMobileBar>
            <SMobileBar
              theme={{
                color:
                  appStore.navigationState === 8
                    ? mantineTheme.colors[mantineTheme.primaryColor][7]
                    : "gray",
              }}
              onClick={() => {
                navigate("/feedback");
                appStore.setNavigationState(8);
                setIsNavBarOpened(false);
              }}
            >
              {/* <Home size={"25"} /> */}
              <Text style={{ fontSize: "20px" }} ml={"sm"}>
                Feed Back
              </Text>
            </SMobileBar>
          </SNavBarMobile>
        );
      }}
    </Observer>
  );
}

export default NavBarMobile;
