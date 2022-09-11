import { Observer } from "mobx-react-lite";
import Router from "next/router";
import React, { useEffect } from "react";
import { useStores } from "../../Logic/Providers/StoresProviders";

function ProfileIndex() {
  const store = useStores();
  useEffect(() => {
    console.log(store.authStore.user);
  }, [store]);
  return (
    <Observer>
      {() => {
        const { authStore } = store;
        return <div>{authStore.user?.mail_id}</div>;
      }}
    </Observer>
  );
}

export default ProfileIndex;
