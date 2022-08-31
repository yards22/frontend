import { ActionIcon } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import React from "react";
import { IconMoon, IconSun } from "../Atoms/Icons";
import IconWrapper from "../Atoms/IconWrapper";
import { useStores } from "../Logic/Providers/StoresProviders";

function DarkThemeSwitch() {
  const store = useStores();
  return (
    <>
      <Observer>
        {() => {
          const { appStore } = store;
          return (
            <ActionIcon
              variant="default"
              onClick={() => {
                appStore.setTheme(appStore.theme == "dark" ? "light" : "dark");
              }}
            >
              <IconWrapper>
                {appStore.theme == "dark" ? IconSun : IconMoon}
              </IconWrapper>
            </ActionIcon>
          );
        }}
      </Observer>
    </>
  );
}

export default DarkThemeSwitch;
