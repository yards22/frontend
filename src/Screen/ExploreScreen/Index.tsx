import { useEffect } from "react";
import styled from "styled-components";
import { useStores } from "../../Logic/Providers/StoresProviders";
import PeopleRecommendationsSection from "./PeopleRecommendation/PeopleRecommendationIndex";
import TrendingPostsSection from "./TrendingPosts/TrendingPostsIndex";

const SNetworkIndex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
`;

function ExploreIndex() {
  const stores = useStores();
  useEffect(() => {
    stores.postStore.GetPosts("trending");
    stores.appStore.setNavigationState(1);
  }, []);

  return (
    <SNetworkIndex>
      <div style={{ height: "40px" }} />
      <PeopleRecommendationsSection />
      <div style={{ height: "40px" }} />
      <TrendingPostsSection />
    </SNetworkIndex>
  );
}

export default ExploreIndex;
