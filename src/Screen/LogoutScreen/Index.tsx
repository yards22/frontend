import React from "react";
import { Button } from "@mantine/core";
import { useStores } from "../../Logic/Providers/StoresProviders";
import { useNavigate } from "react-router-dom";
function LogoutIndex() {
  const store = useStores();
  const navigator = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Button
        color={"red"}
        variant="light"
        onClick={() => {
          store.authStore.LogoutUser().then(() => {
            navigator("/login");
          });
        }}
      >
        Log Out
      </Button>
      <Button color={"red"} variant="light" style={{ marginTop: "20px" }}>
        Log out from all devices
      </Button>
    </div>
  );
}

export default LogoutIndex;
