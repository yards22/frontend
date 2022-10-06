import { useState } from "react";
import styled from "styled-components";
import RecomendationsIndex from "./Recomendations/Index";
import TrendingPostsIndex from "./TrendingPosts/Index";

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

function NetworkIndex() {

  const [selectedInExplore , setSelectedInExplore] = useState("people")

  return(
      <SNetworkIndex>
         <div
           style={{
             display : "flex",
             width : "100%",
             justifyContent : "center"
           }}
         >
           <SExploreTopBar 
               onClick={()=>setSelectedInExplore("people")}
            >
              People
            </SExploreTopBar>
           <SExploreTopBar 
               onClick={()=>setSelectedInExplore("posts")}
            >
              Trending Posts
            </SExploreTopBar>
         </div>
         { selectedInExplore === "people" ? <RecomendationsIndex/> : <TrendingPostsIndex/>}

      </SNetworkIndex>
  )
}

export default NetworkIndex;
