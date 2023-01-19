import { Observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import styled from "styled-components";
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
  });

  return (
    <Observer>
      {() => {
        const { notificationStore } = stores;
        return (
          <SNotificationIndex>
            {notificationStore.finalNotifications.map(
              (item, index) => {
                return (
                  <NotificationTile
                    {...item}
                    key={"notification_" + index}
                  />
                );
              }
            )}
          </SNotificationIndex>
        );
      }}
    </Observer>
  );
}

export default NotificationIndex;
