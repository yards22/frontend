import React from "react";
import styled from "styled-components";
import NotificationTile from "./NotificationTile";

const SNotificationIndex = styled.section`
  height: 100%;
  width: 100%;
  max-width: 600px;
  border: 0.2px solid #bdbdbda0;
`;
const notifications: {
  id: BigInt;
  status: "read" | "seen" | "unseen";
  created_at: Date;
  metadata: any;
}[] = [
  {
    id: BigInt(354534),
    status: "unseen",
    metadata: {},
    created_at: new Date(),
  },
  {
    id: BigInt(354534),
    status: "unseen",
    metadata: {},
    created_at: new Date(),
  },
  {
    id: BigInt(354534),
    status: "unseen",
    metadata: {},
    created_at: new Date(),
  },
  {
    id: BigInt(354534),
    status: "unseen",
    metadata: {},
    created_at: new Date(),
  },
];
function NotificationIndex() {
  return (
    <SNotificationIndex>
      {notifications.map((item, index) => {
        return <NotificationTile />;
      })}
    </SNotificationIndex>
  );
}

export default NotificationIndex;
