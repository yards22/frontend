import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../Atoms/Loading";
import MPost from "../../Logic/Model/MPost";
import { useStores } from "../../Logic/Providers/StoresProviders";
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
  const queryPostId = new URLSearchParams(search).get(
    "post_id"
  );
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<MPost | null>(null);
  useEffect(() => {
    if (queryPostId && !post) {
      postStore
        .GetPostByID(BigInt(queryPostId))
        .then((p) => {
          setPost(p);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [queryPostId]);
  if (loading) return <Loading />;
  if (!post) return <p>No post found.</p>;
  return (
    <SPostIndex>
      <NormalPost data={post} />
    </SPostIndex>
  );
}

export default PostIndex;
