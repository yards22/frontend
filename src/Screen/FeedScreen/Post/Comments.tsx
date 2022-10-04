import { DummyComments } from "../../../Data/Dummies/Comment";
import CommentTile from "../../../Atoms/CommentTile";
const comments = DummyComments;
function Comments() {
  return (
    <div>
      {comments.map((item, index) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "10px",
            }}
          >
            <CommentTile {...item} isChildComment={false} />
            {item.replies.map((repItem, repIndex) => {
              return (
                <CommentTile
                  {...repItem}
                  isChildComment={true}
                  style={{ marginLeft: "50px" }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Comments;
