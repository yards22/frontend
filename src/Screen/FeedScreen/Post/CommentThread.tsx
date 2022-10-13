import { DummyComments } from "../../../Data/Dummies/Comment";
import CommentTile from "../../../Atoms/CommentTile";
const comments = DummyComments;
function CommentThread() {
  return (
    <div>
      {comments.map((item, index) => {
        return (
          <div
            key={`post_comment_inside_${index}}`}
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
                  key={`post_comment_${index}_${repIndex}}`}
                  {...repItem}
                  isChildComment={true}
                  style={{ marginLeft: "40px" }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default CommentThread;
