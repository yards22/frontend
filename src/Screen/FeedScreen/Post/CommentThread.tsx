import { Observer } from "mobx-react-lite";
import { useEffect } from "react";
import CommentTile from "./CommentTile";
import Loading from "../../../Atoms/Loading";
import { useStores } from "../../../Logic/Providers/StoresProviders";
interface CommentThreadProps {
  post_id: bigint;
}
function CommentThread(props: CommentThreadProps) {
  const { commentStore } = useStores();
  useEffect(() => {
    commentStore.GetComment(props.post_id);
  }, []);
  return (
    <Observer>
      {() => {
        const { comments } = commentStore;
        const show = comments.get(props.post_id);
        if (!show) return <Loading />;
        return (
          <div>
            {show.map((item, index) => {
              return (
                <div
                  key={`post_comment_${props.post_id}_${index}`}
                  className="mb-2 flex flex-col"
                >
                  <CommentTile
                    {...item}
                    comment_id={item.comment_id}
                    isReply={false}
                  />
                  {item.replies.map((repItem, repIndex) => {
                    return (
                      <CommentTile
                        key={`post_reply_${index}_${props.post_id}_${item.comment_id}_${repIndex}}`}
                        {...repItem}
                        comment_id={item.comment_id}
                        isReply={true}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      }}
    </Observer>
  );
}

export default CommentThread;
