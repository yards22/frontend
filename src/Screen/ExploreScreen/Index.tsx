import { useEffect } from "react";
import styled from "styled-components";
import { useStores } from "../../Logic/Providers/StoresProviders";
import PeopleRecommendationsSection from "./PeopleRecommendationsSection/PeopleRecomendationsSection";
import TrendingPostsSection from "./TrendingPostsSection/TrendingPostsSection";

const SNetworkIndex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SExploreSectionHeading = styled.div`
  width: 100%;
  /* background-color: #e0dcd1; */
  border-bottom: 0.2em solid black;
  color: black;
  padding: 6px 10px;
  margin-bottom: 2px;
  font-size: 20px;
`;

function ExploreIndex() {
  const store = useStores()
  useEffect(()=>{
    store.appStore.setNavigationState(1)
  })

  return (
    <SNetworkIndex>
      <SExploreSectionHeading>Recommendations</SExploreSectionHeading>
      <PeopleRecommendationsSection />
      <SExploreSectionHeading>Trending Posts</SExploreSectionHeading>
      <TrendingPostsSection />
    </SNetworkIndex>
  );
}

export default ExploreIndex;
