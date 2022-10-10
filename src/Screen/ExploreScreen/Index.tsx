import styled from "styled-components";
import PeopleRecommendationsSection from "./PeopleRecommendationsSection/PeopleRecomendationsSection";

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
  return (
    <SNetworkIndex>
      <SExploreSectionHeading>Recommendations</SExploreSectionHeading>
      <PeopleRecommendationsSection />
      <SExploreSectionHeading>Trending Posts</SExploreSectionHeading>
    </SNetworkIndex>
  );
}

export default ExploreIndex;
