import MPost from "../../Logic/Model/MPost";

export const DummyPosts: MPost[] = [
  {
    content: `बीते 2 दशकों के निरंतर प्रयासों से बनासकांठा की तस्वीर बदल चुकी है।
    नर्मदा के नीर, सुजलाम-सुफलाम और ड्रिप इरीगेशन ने स्थिति को बदलने में बड़ी भूमिका निभाई है 2`,
    created_at: new Date(),
    post_id: BigInt(1),
    username: "himanshu_sah",
    user_id: 3904874,
    profile_pic_ref: null,
    updated_at: new Date(),
    is_liked: true,
    is_favorite: true,
    likes: 343,
    liked_by: ["govindrt8", "darshanboy69"],
    media: [],
    original_id: null,
  },
  {
    content: "What a game of cricket! ⛈️ 0",
    created_at: new Date(),
    post_id: BigInt(1),
    user_id: 3904874,
    profile_pic_ref: null,
    username: "himanshu_sah",
    updated_at: new Date(),
    is_liked: true,
    is_favorite: false,
    likes: 343,
    liked_by: [],
    media: [],
    original_id: null,
  },
  {
    content: "What a game of cricket! ⛈️ 4",
    created_at: new Date(),
    post_id: BigInt(1),
    user_id: 3904874,
    username: "himanshu_sah",
    updated_at: new Date(),
    profile_pic_ref: null,
    is_liked: true,
    is_favorite: false,
    likes: 343,
    liked_by: ["govindrt8", "darshanboy69", "govindrt8", "darshanboy69"],
    media: [],
    original_id: null,
  },
  {
    content: "What a game of cricket! ⛈️ 1",
    created_at: new Date(),
    post_id: BigInt(1),
    username: "himanshu_sah",
    user_id: 3904874,
    updated_at: new Date(),
    profile_pic_ref: null,
    is_liked: false,
    is_favorite: true,
    liked_by: ["govindrt8"],
    likes: 343,
    media: [],
    original_id: null,
  },
];
