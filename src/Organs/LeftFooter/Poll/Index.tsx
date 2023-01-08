import { useEffect } from "react";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import PollCarousal from "./PollCarousal";

function PollIndex() {
  const store = useStores();
  useEffect(() => {
    store.miscStore.GetPolls();
  }, []);
  return <PollCarousal />;
}

export default PollIndex;
