import { Button } from "@mantine/core";
import { Observer, useObserver } from "mobx-react-lite";
import React from "react";
import { useStores } from "../Logic/Providers/StoresProviders";

function Temp() {
  const store = useStores();

  return (
    <Observer>
      {() => {
        const { appStore } = store;
        return (
          <Button
            onClick={() => {
              appStore.setTheme(appStore.theme == "light" ? "dark" : "light");
            }}
          >
            {appStore.theme == "light" ? "Dark" : "Light"}
          </Button>
        );
      }}
    </Observer>
  );
}

export default Temp;
