import { ActionIcon, useMantineTheme } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { Home, User, PlusSquare, Globe } from "react-feather";
import { useNavigate } from "react-router-dom";
import NotificationBellWithCount from "../../Atoms/NotificationBellWithCount";
import { useStores } from "../../Logic/Providers/StoresProviders";

function BottomBar() {
  const mantineTheme = useMantineTheme();
  const stores = useStores();
  const navigate = useNavigate();

  return (
    <Observer>
      {() => {
        const { appStore } = stores;
        return (
          <div className="fixed bottom-0 right-0 left-0 z-50 flex h-16 items-center justify-around border border-solid border-transparent border-t-gray-200 bg-gray-100 shadow-md">
            <ActionIcon
              color={
                appStore.navigationState === 0
                  ? mantineTheme.colors[mantineTheme.primaryColor][9]
                  : "gray"
              }
              onClick={() => {
                navigate("/feed");
                appStore.setNavigationState(0);
              }}
            >
              <Home size={"20"} />
            </ActionIcon>
            <ActionIcon
              color={
                appStore.navigationState === 1
                  ? mantineTheme.colors[mantineTheme.primaryColor][9]
                  : "gray"
              }
              onClick={() => {
                navigate("/explore");
                appStore.setNavigationState(1);
              }}
            >
              <Globe size={"20"} />
            </ActionIcon>
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 p-2"
              onClick={() => {
                navigate("/feed?inputFocus=true" + new Date().getTime());
              }}
            >
              <PlusSquare size={"20"} color="white" />
            </div>
            <ActionIcon
              color={
                appStore.navigationState === 3
                  ? mantineTheme.colors[mantineTheme.primaryColor][9]
                  : "gray"
              }
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
            </ActionIcon>
            <ActionIcon
              color={
                appStore.navigationState === 4
                  ? mantineTheme.colors[mantineTheme.primaryColor][9]
                  : "gray"
              }
              onClick={() => {
                navigate("/profile");
                appStore.setNavigationState(4);
              }}
            >
              <User size={"20"} />
            </ActionIcon>
          </div>
        );
      }}
    </Observer>
  );
}

export default BottomBar;
