import styled from "styled-components"
import { DummyPosts } from "../../../Data/Dummies/Post";
import NormalPost from "../../FeedScreen/Post/NormalPost";

const SUserFavourites = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5px;
`

function UserFavourites() {
  return (
    <SUserFavourites>
    {
      DummyPosts.map((item, index) => {
        return <NormalPost data={item} key={`normal_post_${index}`} />;
      })
    }
  </SUserFavourites>
  )
}

export default UserFavourites