import React from "react";
import styled from "styled-components";

interface NotificationTile {
  id: BigInt;
  status: "read" | "seen" | "unseen";
  created_at: Date;
  metadata: any;
}

const SNotificationTile = styled.div`
  min-height: 60px;
  padding: 10px 10px;
  border: 1px solid red;
`;
function NotificationTile() {
  return <SNotificationTile>NotificationTile</SNotificationTile>;
}

export default NotificationTile;
