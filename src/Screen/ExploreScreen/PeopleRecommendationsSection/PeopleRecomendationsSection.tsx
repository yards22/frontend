import { Text } from "@mantine/core"
import { useState } from "react"
import styled from "styled-components"
import RecommendationsCard from "./RecommendationsCard"

const SPeopleRecommendationsSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const SShowMore = styled.div`
   color : #1C7ED6;
   cursor : pointer;
   :hover{
     text-decoration: underline;
   }
`
function PeopleRecommendationsSection() {

  const [isShowMoreSelected , setIsShowMoreSelected] = useState(false)

  return (
    <SPeopleRecommendationsSection>
        <div
            style={{
              display:"flex",
              flexDirection:"row",
              flexWrap : "wrap",
              overflow : "hidden",
              maxHeight : `${isShowMoreSelected ? "": "240px"}`
            }}
        >
          <RecommendationsCard/>
          <RecommendationsCard/>
          <RecommendationsCard/>
          <RecommendationsCard/>
          <RecommendationsCard/>
          <RecommendationsCard/>
        </div>
        <div style={{
            display : "flex",
            justifyContent : "end",
    
        }}>
            <SShowMore 
             
              onClick={()=>{setIsShowMoreSelected(!isShowMoreSelected)}}
            >
                { isShowMoreSelected ? "Hide" : "Show More"}
            </SShowMore>
        </div>
    </SPeopleRecommendationsSection>
  )
}

export default PeopleRecommendationsSection