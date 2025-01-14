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
            <Text
              className="font-normal text-gray-700"
              style={{ marginTop: "10px" }}
            >
              {viewProfile?.username}
            </Text>
            <Title className="text-gray-700" size={"sm"}>
              {viewProfile?.name}
            </Title>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {viewProfile?.interests &&
                viewProfile?.interests.map((item, index) => {
                  return (
                    <Badge
                      key={"interest" + viewProfile.user_id + index}
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
                fontSize: "16px"
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
