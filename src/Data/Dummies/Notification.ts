const now = new Date().getTime();
export const dummyNotifications: {
  id: BigInt;
  status: "read" | "seen" | "unseen";
  created_at: Date;
  metadata: any;
}[] = [
  {
    id: BigInt(3453445),
    status: "unseen",
    metadata: {
      type: "FOLLOW",
      by: 3,
    },
    created_at: new Date(now - 1000 * 60 * 14),
  },
  {
    id: BigInt(3453445),
    status: "unseen",
    metadata: {
      type: "FOLLOW",
      by: 5,
    },
    created_at: new Date(now - 1000 * 60 * 10),
  },
  {
    id: BigInt(354534),
    status: "unseen",
    metadata: {
      type: "LIKE",
      by: 2,
      post_id: 30234,
    },
    created_at: new Date(),
  },
  {
    id: BigInt(3453445),
    status: "unseen",
    metadata: {
      type: "LIKE",
      by: 3,
      post_id: 30234,
    },
    created_at: new Date(),
  },

  {
    id: BigInt(354534),
    status: "unseen",
    metadata: {
      type: "COMMENT",
      by: 2,
      post_id: 30234,
    },
    created_at: new Date(now - 1000 * 60 * 5),
  },
  {
    id: BigInt(3453445),
    status: "seen",
    metadata: {
      type: "COMMENT",
      by: 3,
      post_id: 30234,
    },
    created_at: new Date(),
  },
  {
    id: BigInt(3453445),
    status: "unseen",
    metadata: {
      type: "COMMENT",
      by: 4,
      post_id: 30234,
    },
    created_at: new Date(),
  },
  {
    id: BigInt(3453445),
    status: "unseen",
    metadata: {
      type: "NEW",
      content: "Explore our new feature.",
      redirect_url: "/new_feature",
    },
    created_at: new Date(),
  },
  {
    id: BigInt(3453446),
    status: "unseen",
    metadata: {
      type: "INFO",
      content: "We have updated our policies. Click to read it.",
      redirect_url: "/new_feature",
    },
    created_at: new Date(now - 1000 * 60 * 10),
  },
];

export const dummyUserIdUsername: Map<number, string> = new Map()
  .set(1, "himanshu")
  .set(2, "darshan")
  .set(3, "rithvik")
  .set(4, "adarsh")
  .set(5, "sai_chand");
