import React, { useEffect } from "react";
import { useStores } from "../../Logic/Providers/StoresProviders";
import LeaderBoardIndex from "../../Organs/LeftFooter/LearderBoard/Index";

function LeaderBoardScreenIndex() {
  const stores = useStores();

  useEffect(() => {
    stores.appStore.setNavigationState(5);
  });
  return (
    <div style={{ margin: "10px" }}>
      <LeaderBoardIndex />
    </div>
  );
}

export default LeaderBoardScreenIndex;
