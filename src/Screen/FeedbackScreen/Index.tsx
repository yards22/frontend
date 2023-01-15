import React, { useEffect } from "react";
import { useStores } from "../../Logic/Providers/StoresProviders";
import FeedbackIndex from "../../Organs/RightFooter/Feedback/Index";

function FeedBackScreenIndex() {
  const stores = useStores();

  useEffect(() => {
    stores.appStore.setNavigationState(8);
  });
  return (
    <div style={{ margin: "10px" }}>
      <FeedbackIndex />
    </div>
  );
}

export default FeedBackScreenIndex;
