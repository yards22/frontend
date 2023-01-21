import { Title } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import styled from "styled-components";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import ProfilePhoto from "../../../Atoms/ProfilePhoto";
import { useNavigate } from "react-router-dom";
const SStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
`;
function ProfilePicAndStats() {
  const navigate = useNavigate();
  const { profileStore } = useStores();
  return (
    <Observer>
      {() => {
        const { viewProfile, profile } = profileStore;
        return (
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <ProfilePhoto
              size={"xl"}
              username={viewProfile?.username}
              profileimageuri={viewProfile?.profile_image_uri}
            />
            <SStats
              onClick={() => {
                if (viewProfile?.user_id !== profile?.user_id)
                  navigate("/following?username=" + viewProfile?.username);
                else navigate("/following");
              }}
            >
              <Title order={5}>{viewProfile?.following}</Title>
              <Title order={6} color="dimmed">
                Following
              </Title>
            </SStats>
            <SStats
              onClick={() => {
                if (viewProfile?.user_id !== profile?.user_id)
                  navigate("/followers?username=" + viewProfile?.username);
                else navigate("/followers");
              }}
            >
              <Title order={5}>{viewProfile?.followers}</Title>
              <Title order={6} color="dimmed">
                Followers
              </Title>
            </SStats>
            <SStats>
              <Title order={5}>{viewProfile?.cric_index}</Title>
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
