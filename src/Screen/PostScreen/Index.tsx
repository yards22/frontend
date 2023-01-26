import { Observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../Atoms/Loading";
import MPost from "../../Logic/Model/MPost";
import { useStores } from "../../Logic/Providers/StoresProviders";
import { DeHashWithDate } from "../../Logic/Utils/Common";
import NormalPost from "../FeedScreen/Post/NormalPost";
const SPostIndex = styled.section`
  height: 100%;
  width: 100%;
  max-width: 600px;
  padding: 10px;
`;
function PostIndex() {
  const { postStore } = useStores();
  const search = useLocation().search;
  const queryPostId = new URLSearchParams(search).get("post_id");
  const queryPostHash = new URLSearchParams(search).get("pr");
  useEffect(() => {
    postStore.viewPosts = null;
    let findBy = "";
    if (queryPostId && queryPostId !== "") {
      // using legacy post_id share
      findBy = queryPostId;
    } else if (queryPostHash && queryPostHash !== "") {
      findBy = DeHashWithDate(queryPostHash);
    } else {
      //invalid findBy
      findBy = "";
    }

    if (findBy !== "") {
      postStore.GetPostByID(BigInt(findBy));
    } else {
      postStore.viewPosts = null;
    }
  }, [queryPostId, queryPostHash]);

  return (
    <SPostIndex>
      <Observer>
        {() => {
          const { viewPosts } = postStore;
          if (!viewPosts) return <Loading />;
          if (viewPosts.length === 0)
            return (
              <p className="mt-10 w-full text-center font-bold">
                No post found. <br />
                <span className="font-normal text-gray-700">
                  Either share link has expired or is invalid.
                </span>
              </p>
            );
          return (
            <>
              {viewPosts.map((post) => (
                <NormalPost data={post} key={"post_id" + post.post_id} />
              ))}
            </>
          );
        }}
      </Observer>
    </SPostIndex>
  );
}

export default PostIndex;
