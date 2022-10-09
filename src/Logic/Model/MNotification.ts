import React from "react";

export interface MNotification {
  id: BigInt;
  status: "read" | "seen" | "unseen";
  created_at: Date;
  metadata: any;
}

export interface MUINotification {
  stashes: BigInt[];
  status: "read" | "seen" | "unseen";
  happened: string;
  content: JSX.Element;
  type: string;
  extra: any;
}
