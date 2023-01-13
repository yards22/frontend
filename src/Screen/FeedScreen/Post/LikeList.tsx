import React from "react";
import LinkedUserName from "../../../Atoms/LinkedUserName";

interface LikeListProps {
  likedBy: string[];
}
function LikeList(props: LikeListProps) {
  return (
    <div>
      {props.likedBy.map((item, index) => {
        return (
          <div
            style={{
              display: "flex",
              padding: "10px",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <LinkedUserName username={item} style={{ marginLeft: "15px" }}>
              {item}
            </LinkedUserName>
          </div>
        );
      })}
    </div>
  );
}

export default LikeList;
