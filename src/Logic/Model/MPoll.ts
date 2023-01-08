export interface MPoll {
  poll: {
    poll_id: number;
    poll_question: string;
    options: string[];
  };
  hasPolled: boolean;
  reaction: {
    type: number;
    count: number;
  }[];
}
