export default interface MPost {
  user_id: number;
  post_id: bigint;
  content: string | null;
  media: string | null;
  original_id: bigint | null;
  created_at: Date;
  updated_at: Date;
}
