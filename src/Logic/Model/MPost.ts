export default interface MPost {
  user_id: number;
  post_id: bigint;
  content: string | null;
  media: string[] | null;
  original_id: bigint | null;

  // username of the person who created post
  username: string;

  // profile pic of the person who created the post
  profile_pic_ref?: string;

  // total number of likes
  likes: number;

  // if that particular user has liked the post
  is_liked: boolean;

  // if the particular post has been favorite
  is_favorite: boolean;

  // will contain user name of people liked the post
  liked_by: string[];

  created_at: Date;
  updated_at: Date;
}
