import { Text } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import RecommendationsCard from "./RecommendationsCard";

const SPeopleRecommendationsSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  padding-bottom: 30px;
`;

const SShowMore = styled.div`
  color: #1c7ed6;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
  position: absolute;
  bottom: 6px;
  right: 6px;
`;
const SHideMore = styled.div`
  color: #1c7ed6;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
  position: absolute;
  bottom: 6px;
  left: 6px;
`;

function PeopleRecommendationsSection() {
  const stores = useStores();
  const [currentHeight, setCurrentHeight] = useState(235);
  const [isShowMoreEnabled, setIsShowMoreEnabled] = useState(true);
  const [isHideEnabled, setIsHideEnabled] = useState(false);
  const recommendationDivRef: any = useRef(null);

  useEffect(() => {
    handleDivSizeChanges();
    window.addEventListener("resize", handleDivSizeChanges);
  }, []);

  useEffect(() => {
    handleDivSizeChanges();
  }, [currentHeight]);

  const handleDivSizeChanges = () => {
    let h = recommendationDivRef.current.offsetHeight;
    let w = recommendationDivRef.current.clientWidth;
    if (h < 300) {
      setIsHideEnabled(false);
    } else {
      setIsHideEnabled(true);
    }
    console.log(h, w);
    w = w / 170;
    h = h / 235;
    console.log(h, w);
    if (h * w >= 6) {
      setIsShowMoreEnabled(false);
    } else {
      setIsShowMoreEnabled(true);
    }
  };

  return (
    <SPeopleRecommendationsSection>
      <div
        ref={recommendationDivRef}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          overflow: "hidden",
          height: `${currentHeight}px`,
        }}
      >
        <RecommendationsCard />
        <RecommendationsCard />
        <RecommendationsCard />
        <RecommendationsCard />
        <RecommendationsCard />
        <RecommendationsCard />
      </div>

      {isShowMoreEnabled && (
        <SShowMore
          onClick={() => {
            setCurrentHeight(currentHeight + 235);
          }}
        >
          Show More
        </SShowMore>
      )}
      {isHideEnabled && (
        <SHideMore
          onClick={() => {
            setCurrentHeight(currentHeight - 235);
          }}
        >
          Hide
        </SHideMore>
      )}
    </SPeopleRecommendationsSection>
  );
}

export default PeopleRecommendationsSection;
