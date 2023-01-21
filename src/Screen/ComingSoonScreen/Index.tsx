import React, { useEffect } from "react";
import { useStores } from "../../Logic/Providers/StoresProviders";
import ScoreCarousalIndex from "../../Organs/RightFooter/ScoreCarousal/Index";

function ComingSoonScreenIndex() {
  const stores = useStores();

  useEffect(() => {
    stores.appStore.setNavigationState(7);
  });

  return (
    <div style={{ margin: "10px" }}>
      <ScoreCarousalIndex />
    </div>
  );
}

export default ComingSoonScreenIndex;
