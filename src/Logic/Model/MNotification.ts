export interface MNotification {
  id: bigint;
  triggered_by_id: number | null;
  entity: string;
  entity_identifier: string | null;
  type: string;
  extra: any;
  status: "Read" | "Seen" | "Unseen";
  created_at: Date;
}

export interface MUINotification {
  stashes: BigInt[];
  status: "Read" | "Seen" | "Unseen";
  happened: string;
  content: JSX.Element;
  type: string;
  extra: any;
}
