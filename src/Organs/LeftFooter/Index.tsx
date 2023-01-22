import { Button } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LeaderBoardIndex from "./LearderBoard/Index";
import PollIndex from "./Poll/Index";

const SLeftFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin-right: 30px;
  margin-top: 10px;
`;

function LeftFooterIndex() {
  const navigate = useNavigate();
  return (
    <SLeftFooter>
      <PollIndex />
      <div className="mt-4 mb-1 flex w-full items-center justify-between">
        <b>Leaderboard</b>
        <Button
          variant="subtle"
          onClick={() => {
            navigate("/leaderboard");
          }}
        >
          View All
        </Button>
      </div>
      <LeaderBoardIndex />
    </SLeftFooter>
  );
}

export default LeftFooterIndex;
