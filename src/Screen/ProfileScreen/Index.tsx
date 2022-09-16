import { Loader } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { useEffect } from "react";
import styled from "styled-components";
import { useStores } from "../../Logic/Providers/StoresProviders";
import ProfileSectionIndex from "./ProfileDetailsSection/Index";

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
            <ProfileSectionIndex />
          </SProfileIndex>
        ) : (
          <Loader variant="bars" />
        );
      }}
    </Observer>
  );
}

export default ProfileIndex;
