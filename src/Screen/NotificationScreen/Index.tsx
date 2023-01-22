import { Observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import styled from "styled-components";
import Loading from "../../Atoms/Loading";
import { useStores } from "../../Logic/Providers/StoresProviders";
import NotificationTile from "./NotificationTile";

const SNotificationIndex = styled.section`
  height: 100%;
  width: 100%;
  max-width: 600px;
  border: 0.2px solid #bdbdbda0;
`;

function NotificationIndex() {
  const stores = useStores();

  useEffect(() => {
    if (!stores.notificationStore.finalNotifications) {
      stores.notificationStore.GetNotifications();
    }
    stores.notificationStore.MarkAsSeen();
    stores.appStore.setNavigationState(3);
  }, []);

  return (
    <Observer>
      {() => {
        const { notificationStore } = stores;
        if (!notificationStore.rawNotifications) return <Loading />;
        if (notificationStore.finalNotifications.length === 0)
          return (
            <b className="flex h-[140px] w-full items-center justify-center text-center text-gray-400">
              You're all caught up. No Notifications.
            </b>
          );
        return (
          <SNotificationIndex>
            {notificationStore.finalNotifications.map((item, index) => {
              return (
                <NotificationTile {...item} key={"notification_" + index} />
              );
            })}
          </SNotificationIndex>
        );
      }}
    </Observer>
  );
}

export default NotificationIndex;
