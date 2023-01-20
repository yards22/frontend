import { useEffect } from "react";
import styled from "styled-components";
import { useStores } from "../../Logic/Providers/StoresProviders";
import PeopleRecommendationsSection from "./PeopleRecommendation/PeopleRecommendationIndex";
import TrendingPostsSection from "./TrendingPosts/TrendingPostsIndex";
import UserSearchIndex from "./UserSearch/Index";

const SNetworkIndex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 10px;
`;

function ExploreIndex() {
  const stores = useStores();
  useEffect(() => {
    stores.postStore.GetPosts("trending");
    stores.appStore.setNavigationState(1);
  }, []);

  return (
    <SNetworkIndex>
      <UserSearchIndex />
      <PeopleRecommendationsSection />
      <TrendingPostsSection />
    </SNetworkIndex>
  );
}

export default ExploreIndex;
