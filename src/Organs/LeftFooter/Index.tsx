import React from "react";
import styled from "styled-components";
import { useStores } from "../../Logic/Providers/StoresProviders";
import EventsIndex from "./Events/Index";
import LeaderBoardIndex from "./LearderBoard/Index";

const SLeftFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`;

function LeftFooterIndex() {
  const store = useStores();
  return (
    <SLeftFooter>
      <LeaderBoardIndex />
      <EventsIndex />
    </SLeftFooter>
  );
}

export default LeftFooterIndex;
