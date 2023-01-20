export interface MComment {
  comment_id: bigint;
  username: string;
  profile_image_uri: string | null;
  user_id: number;
  content: string;
  replies: MCommentReply[];
  created_at: Date;
}

export interface MCommentReply {
  user_id: number;
  username: string;
  profile_image_uri: string | null;
  content: string;
  created_at: Date;
}
