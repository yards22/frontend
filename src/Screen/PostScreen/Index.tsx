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
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<MPost | null>(null);
  useEffect(() => {
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
      postStore
        .GetPostByID(BigInt(findBy))
        .then((p) => {
          setPost(p);
        })
        .catch((err) => {})
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      setPost(null);
    }
  }, [queryPostId]);
  if (loading) return <Loading />;
  if (!post)
    return (
      <p className="mt-10 w-full text-center font-bold">
        No post found. <br />
        <span className="font-normal text-gray-700">
          Either share link has expired or is invalid.
        </span>
      </p>
    );
  return (
    <SPostIndex>
      <NormalPost data={post} />
    </SPostIndex>
  );
}

export default PostIndex;
