import { Button } from "@mantine/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import PollCarousal from "./PollCarousal";

function PollIndex() {
  const store = useStores();
  const navigate = useNavigate();
  useEffect(() => {
    store.miscStore.GetPolls();
  }, []);
  return (
    <>
      <div className="mb-3 flex w-full items-center justify-between">
        <b>Polls</b>
        <Button
          variant="subtle"
          onClick={() => {
            navigate("/polls");
          }}
        >
          View All
        </Button>
      </div>
      <PollCarousal />
    </>
  );
}

export default PollIndex;
