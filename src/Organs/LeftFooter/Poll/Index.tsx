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
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
