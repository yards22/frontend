import { Title } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import styled from "styled-components";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import ProfilePhoto from "./ProfilePhoto";
const SStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
`;
function ProfilePicAndStats() {
  const { profileStore } = useStores();
  return (
    <Observer>
      {() => {
        const { viewProfile } = profileStore;
        return (
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <ProfilePhoto
              userName={viewProfile?.username}
              profileImageUri={viewProfile?.profile_image_uri}
            />
            <SStats>
              <Title order={5}>400</Title>
              <Title order={6} color="dimmed">
                Following
              </Title>
            </SStats>
            <SStats>
              <Title order={5}>145</Title>
              <Title order={6} color="dimmed">
                Followers
              </Title>
            </SStats>
            <SStats>
              <Title order={5}>27</Title>
              <Title order={6} color="dimmed">
                Cric Index
              </Title>
            </SStats>
          </div>
        );
      }}
    </Observer>
  );
}

export default ProfilePicAndStats;
