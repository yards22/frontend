export interface MComment {
  comment_id: bigint;
  username: string;
  profile_image_uri: string | null;
  user_id: number;
  content: string;
  replies: MCommentReply[];
  is_own_comment: boolean;
  created_at: Date;
}

export interface MCommentReply {
  reply_id: bigint;
  user_id: number;
  username: string;
  profile_image_uri: string | null;
  content: string;
  is_own_reply: boolean;
  created_at: Date;
}
