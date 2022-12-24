import React from 'react'
import styled from 'styled-components';
import { DummyPosts } from '../../../Data/Dummies/Post';
import NormalPost from '../../FeedScreen/Post/NormalPost';

const SUserLikedPosts = styled.div`
  display: flex;
  flex-direction: column;
`;

function UserLikedPosts() {
  return (
    <SUserLikedPosts>
    {DummyPosts.map((item, index) => {
      return <NormalPost data={item} key={`normal_post_${index}`} />;
    })}
  </SUserLikedPosts>
  )
}

export default UserLikedPosts