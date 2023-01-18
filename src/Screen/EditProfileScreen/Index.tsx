import { Loader } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackPage from "../../Atoms/BackPage";
import { useStores } from "../../Logic/Providers/StoresProviders";
import EditPageOne from "./EditPageOne";

function EditProfileIndex() {
  const store = useStores();
  const navigate = useNavigate();
  useEffect(() => {
    store.appStore.setNavigationState(4);
    if (!store.profileStore.profile)
      store.profileStore
        .GetProfile(null, null)
        .then((profile) => {
          if (
            profile?.user_id ===
            store.authStore.user?.user_id
          ) {
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
          <>
            <BackPage
              title="Edit Profile"
              onClick={() => {
                navigate("/profile");
              }}
            />
            <EditPageOne />
          </>
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

export default EditProfileIndex;
