export interface MNotification {
  id: BigInt;
  status: "Read" | "Seen" | "Unseen";
  created_at: Date;
  metadata: any;
}

export interface MUINotification {
  stashes: BigInt[];
  status: "Read" | "Seen" | "Unseen";
  happened: string;
  content: JSX.Element;
  type: string;
  extra: any;
}
