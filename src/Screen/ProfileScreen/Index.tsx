import { Loader, Skeleton } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { useEffect } from "react";
import styled from "styled-components";
import { useStores } from "../../Logic/Providers/StoresProviders";
import ProfileDetailsSectionIndex from "./ProfileDetailsSection/Index";

const SProfileIndex = styled.div``;
function ProfileIndex() {
  const store = useStores();
  useEffect(() => {
    store.profileStore.GetProfile();
  }, []);

  return (
    <Observer>
      {() => {
        const { profileStore } = store;
        return profileStore.profile ? (
          <SProfileIndex>
            <ProfileDetailsSectionIndex profileInfo={profileStore.profile}/>
          </SProfileIndex>
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
