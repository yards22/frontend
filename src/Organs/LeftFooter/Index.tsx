import React from "react";
import styled from "styled-components";
import LeaderBoardIndex from "./LearderBoard/Index";
import PollIndex from "./Poll/Index";

const SLeftFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin-right: 30px;
  padding-top: 10px;
`;

function LeftFooterIndex() {
  return (
    <SLeftFooter>
      <PollIndex />
      <LeaderBoardIndex />
    </SLeftFooter>
  );
}

export default LeftFooterIndex;
