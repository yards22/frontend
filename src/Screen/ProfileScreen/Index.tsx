import { Loader } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { useEffect } from "react";
import styled from "styled-components";
import { useStores } from "../../Logic/Providers/StoresProviders";
import InterestsSection from "./InterestsSection/InterestsSection";
import ProfileDetailsSectionIndex from "./ProfileDetailsSection/Index";

const SProfileIndex = styled.div`
  width: 100%;
`;
function ProfileIndex() {
  const store = useStores();
  useEffect(() => {
    store.profileStore.GetProfile(store.authStore.token);
  }, []);

  return (
    <Observer>
      {() => {
        const { profileStore } = store;
        return profileStore.profile ? (
          <SProfileIndex>
            <ProfileDetailsSectionIndex profileInfo={profileStore.profile}/>
            <InterestsSection/>
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
