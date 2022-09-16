import { Button } from "@mantine/core";
import React from "react";
import { useStores } from "../../Logic/Providers/StoresProviders";

function Logout() {
  const store = useStores();
  return (
    <Button
      onClick={() => {
        store.authStore.LogoutUser();
      }}
    >
      Logout
    </Button>
  );
}

export default Logout;
