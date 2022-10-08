import styled from "styled-components";
import PeopleRecommendationsSection from "./PeopleRecommendationsSection/PeopleRecomendationsSection";

const SNetworkIndex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SExploreTopBar = styled.div`
  width: 40%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  cursor: pointer;
  margin-bottom: 10px;

`

function ExploreIndex() {

  return(
      <SNetworkIndex>
         <div
           style={{
             display : "flex",
             width : "100%",
             justifyContent : "center"
           }}
         >
           <PeopleRecommendationsSection/>
           
         </div>
      </SNetworkIndex>
  )
}

export default ExploreIndex;
