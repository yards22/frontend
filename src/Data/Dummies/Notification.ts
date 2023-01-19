import { MNotification } from "../../Logic/Model/MNotification";

const now = new Date().getTime();
export const dummyNotifications: MNotification[] = [
  {
    id: BigInt(3453445),
    status: "Unseen",
    type: "FOLLOW",
    triggered_by_id: 3,
    entity_identifier: null,
    entity: "FOLLOW",
    extra: null,
    created_at: new Date(now - 1000 * 60 * 14),
  },
  {
    id: BigInt(3453445),
    status: "Unseen",
    type: "FOLLOW",
    triggered_by_id: 5,
    entity_identifier: null,
    entity: "FOLLOW",
    extra: null,
    created_at: new Date(now - 1000 * 60 * 10),
  },
  {
    id: BigInt(354534),
    status: "Unseen",
    type: "LIKE",
    triggered_by_id: 2,
    entity: "POST",
    entity_identifier: "30234",
    extra: null,
    created_at: new Date(),
  },
  {
    id: BigInt(354534),
    status: "Unseen",
    type: "LIKE",
    triggered_by_id: 3,
    entity: "POST",
    entity_identifier: "30234",
    extra: null,
    created_at: new Date(),
  },

  {
    id: BigInt(354534),
    status: "Unseen",
    type: "COMMENT",
    triggered_by_id: 2,
    entity_identifier: "30234",
    entity: "POST",
    extra: null,
    created_at: new Date(now - 1000 * 60 * 5),
  },
  {
    id: BigInt(354534),
    status: "Seen",
    type: "COMMENT",
    triggered_by_id: 2,
    entity_identifier: "30234",
    entity: "POST",
    extra: null,
    created_at: new Date(now - 1000 * 60 * 5),
  },
  {
    id: BigInt(354534),
    status: "Unseen",
    type: "COMMENT",
    triggered_by_id: 4,
    entity_identifier: "30234",
    entity: "POST",
    extra: null,
    created_at: new Date(now - 1000 * 60 * 5),
  },
  {
    id: BigInt(3453445),
    status: "Read",
    type: "NEW",
    extra: {
      content: "Explore our new feature.",
      redirect_url: "/new_feature",
    },
    entity: "NEW",
    entity_identifier: null,
    triggered_by_id: null,
    created_at: new Date(),
  },
  {
    id: BigInt(3453446),
    status: "Read",
    type: "INFO",
    entity: "INFO",
    entity_identifier: null,
    triggered_by_id: null,
    extra: {
      content:
        "We have updated our policies. Click to read it.",
      redirect_url: "/new_feature",
    },
    created_at: new Date(now - 1000 * 60 * 10),
  },
];

export const dummyUserIdUsername: Map<number, string> =
  new Map()
    .set(1, "himanshu")
    .set(2, "darshan")
    .set(3, "rithvik")
    .set(4, "adarsh")
    .set(5, "sai_chand");
