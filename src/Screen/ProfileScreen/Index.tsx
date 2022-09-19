import { Loader } from "@mantine/core";
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
          <Loader variant="bars" />
        );
      }}
    </Observer>
  );
}

export default ProfileIndex;
