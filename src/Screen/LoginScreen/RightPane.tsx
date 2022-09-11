import { Observer } from "mobx-react-lite";
import Link from "next/link";
import React from "react";
import { useStores } from "../../Logic/Providers/StoresProviders";
import DarkThemeSwitch from "../../Organs/DarkThemeSwitch";
import Logout from "./Logout";

function RightPane() {
  const store = useStores();
  return (
    <Observer>
      {() => {
        const { authStore } = store;
        return (
          <div>
            <DarkThemeSwitch />
            {authStore.user?.mail_id}
            <Link href={"/profile"}>Profile</Link>
            {authStore.user && <Logout />}
          </div>
        );
      }}
    </Observer>
  );
}

export default RightPane;
