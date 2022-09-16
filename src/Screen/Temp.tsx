import { Button, Input } from "@mantine/core";
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
          <div>
            <Button
              style={{ margin: "10px" }}
              onClick={() => {
                appStore.setTheme(appStore.theme == "light" ? "dark" : "light");
              }}
            >
              {appStore.theme == "light"
                ? "Switch To Dark Theme"
                : "Switch To Light Theme"}
            </Button>
            <Input />
          </div>
        );
      }}
    </Observer>
  );
}

export default Temp;
