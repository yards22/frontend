import { Observer } from "mobx-react-lite";
import React from "react";
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
  return (
    <Observer>
      {() => {
        const { notificationStore } = stores;
        return (
          <SNotificationIndex>
            {notificationStore.finalNotifications.map((item, index) => {
              return <NotificationTile {...item} />;
            })}
          </SNotificationIndex>
        );
      }}
    </Observer>
  );
}

export default NotificationIndex;
