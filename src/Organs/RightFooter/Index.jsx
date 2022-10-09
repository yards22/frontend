import React from "react";
import styled from "styled-components";
import NewsIndex from "./News/Index";
import ScoreCarousalIndex from "./ScoreCarousal/Index";

const SRightFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin-left: 30px;
`;

function RightFooterIndex() {
  return (
    <SRightFooter>
      <ScoreCarousalIndex />
      <NewsIndex />
    </SRightFooter>
  );
}

export default RightFooterIndex;
