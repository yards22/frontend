import { Loader } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useStores } from "../../Logic/Providers/StoresProviders";
import Followers from "./Followers/Followers";
import Following from "./Following/Following";
import InterestsSection from "./InterestsSection/InterestsSection";
import ProfileDetailsSectionIndex from "./ProfileDetailsSection/Index";

const SProfileIndex = styled.div`
  width: 100%;
`;

function ProfileIndex() {
  const store = useStores();
  const [currentRenderingInProfileRoute, setCurrentRenderingInProfileRoute] = useState("Profile")

  useEffect(() => {
    store.profileStore.GetProfile(store.authStore.token);
    store.appStore.setNavigationState(4)
  }, []);

  function handleCurrentRenderingInProfileRoute(current : string){
     setCurrentRenderingInProfileRoute(current)
  }  

  return (
    <Observer>
      {() => {
        const { profileStore } = store;
        return profileStore.profile ? (
          <SProfileIndex>
            { currentRenderingInProfileRoute === "Profile" &&
              <>
                <ProfileDetailsSectionIndex 
                  profileInfo={profileStore.profile} 
                  handleCurrentRenderingInProfileRoute = {handleCurrentRenderingInProfileRoute}
                  />
                <InterestsSection/>
              </>
            }
            {
               currentRenderingInProfileRoute === "Following" &&
               <Following
               handleCurrentRenderingInProfileRoute = {handleCurrentRenderingInProfileRoute}
               /> 
            }
            {
               currentRenderingInProfileRoute === "Followers" &&
               <Followers
               handleCurrentRenderingInProfileRoute = {handleCurrentRenderingInProfileRoute}
               /> 
            }
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
