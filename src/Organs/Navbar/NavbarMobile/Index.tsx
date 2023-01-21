import { Badge, useMantineTheme } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import {
  Award,
  BarChart2,
  Clock,
  DollarSign,
  Edit,
  FileText,
  Rss,
  User
} from "react-feather";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import NavbarMobileItem from "./NavbarMobileItem";

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
  width: 100%;
  margin: 8px 0px;
  color: ${(p) => p.theme.color || "gray"};
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
                  appStore.navigationState === 5
                    ? mantineTheme.colors[mantineTheme.primaryColor][7]
                    : "gray"
              }}
              onClick={() => {
                navigate("/leaderboard");
                appStore.setNavigationState(5);
                setIsNavBarOpened(false);
              }}
            >
              <NavbarMobileItem title="Leaderboard" icon={<Award />} />
            </SMobileBar>
            <SMobileBar
              theme={{
                color:
                  appStore.navigationState === 6
                    ? mantineTheme.colors[mantineTheme.primaryColor][7]
                    : "gray"
              }}
              onClick={() => {
                navigate("/polls");
                appStore.setNavigationState(6);
                setIsNavBarOpened(false);
              }}
            >
              <NavbarMobileItem title="Polls" icon={<BarChart2 />} />
            </SMobileBar>
            <SMobileBar
              onClick={() => {
                navigate("/auction-table");
                setIsNavBarOpened(false);
              }}
            >
              <NavbarMobileItem
                title="Auction Table"
                icon={<DollarSign />}
                badge={<Badge color={"yellow"}>Coming Soon</Badge>}
              />
            </SMobileBar>
            <SMobileBar
              onClick={() => {
                navigate("/live-scores");
                setIsNavBarOpened(false);
              }}
            >
              <NavbarMobileItem
                title="Live Scores"
                icon={<Rss />}
                badge={<Badge color={"yellow"}>Coming Soon</Badge>}
              />
            </SMobileBar>{" "}
            <SMobileBar
              onClick={() => {
                navigate("/news");
                setIsNavBarOpened(false);
              }}
            >
              <NavbarMobileItem
                title="News Articles"
                icon={<FileText />}
                badge={<Badge color={"yellow"}>Coming Soon</Badge>}
              />
            </SMobileBar>
            <SMobileBar
              theme={{
                color:
                  appStore.navigationState === 8
                    ? mantineTheme.colors[mantineTheme.primaryColor][7]
                    : "gray"
              }}
              onClick={() => {
                navigate("/feedback");
                appStore.setNavigationState(8);
                setIsNavBarOpened(false);
              }}
            >
              <NavbarMobileItem title="Feedback" icon={<Edit />} />
            </SMobileBar>
          </SNavBarMobile>
        );
      }}
    </Observer>
  );
}

export default NavBarMobile;
