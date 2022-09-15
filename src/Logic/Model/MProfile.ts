export interface MProfile {
  user_id: number;
  username: string;
  email_id: string | null;
  profile_image_uri: string | null;
  bio: string | null;
  cric_index: number;
  updated_at: Date;
  interests: string[];
}
