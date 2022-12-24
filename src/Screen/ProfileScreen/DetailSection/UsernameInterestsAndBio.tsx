import styled from "styled-components";
import { Title, Text, Badge, Spoiler } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { useStores } from "../../../Logic/Providers/StoresProviders";
const SUsernameInterestsAndBio = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

function UsernameInterestsAndBio() {
  const { profileStore } = useStores();

  return (
    <Observer>
      {() => {
        const { viewProfile } = profileStore;

        return (
          <SUsernameInterestsAndBio>
            <Title order={6} style={{ marginTop: "10px" }}>
              {viewProfile?.username}
            </Title>
            <Text color="dimmed" size={"sm"}>
              {viewProfile?.email_id}
            </Text>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {viewProfile?.interests &&
                viewProfile?.interests.map((item, index) => {
                  return (
                    <Badge
                      color={"blue"}
                      style={{ marginRight: "10px", marginTop: "8px" }}
                    >
                      {item}
                    </Badge>
                  );
                })}
            </div>
            <Spoiler
              maxHeight={50}
              showLabel="Show more"
              hideLabel="Hide"
              style={{
                marginTop: "15px",
                fontSize: "16px",
              }}
            >
              <Text style={{ fontSize: "16px" }} color="dimmed">
                 {viewProfile?.bio}
              </Text>
            </Spoiler>
          </SUsernameInterestsAndBio>
        );
      }}
    </Observer>
  );
}

export default UsernameInterestsAndBio;
