export interface MFollow {
  username: string;
  profile_image_uri: string | null;
  user_id: number;
}

export interface MRecommended {
  username: string;
  profile_image_uri: string | null;
  user_id: number;
  cricindex: number;
}
