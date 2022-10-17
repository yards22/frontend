import { Loader } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useStores } from "../../Logic/Providers/StoresProviders";
import DetailSectionIndex from "./DetailSection/Index";

function ProfileIndex() {
  const store = useStores();
  const search = useLocation().search;
  const queryUsername = new URLSearchParams(search).get("username");
  const queryUserId = new URLSearchParams(search).get("user_id");

  useEffect(() => {
    store.profileStore
      .GetProfile(Number(queryUserId), queryUsername)
      .then((profile) => {
        if (profile?.user_id === store.authStore.user?.user_id) {
          store.profileStore.SetProfile(profile);
        }
        store.profileStore.SetViewProfile(profile);
      });
  }, []);

  return (
    <Observer>
      {() => {
        const { profileStore } = store;
        return profileStore.viewProfile ? (
          <DetailSectionIndex />
        ) : (
          <div
            style={{
              height: "50%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Loader />
          </div>
        );
      }}
    </Observer>
  );
}

export default ProfileIndex;
