import styled from "styled-components";
import { Title, Text, Badge, Spoiler } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { useStores } from "../../../Logic/Providers/StoresProviders";
const SDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

function Details() {
  const { profileStore } = useStores();

  return (
    <Observer>
      {() => {
        const { viewProfile } = profileStore;
        return (
          <SDetails>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
                tenetur reprehenderit magnam velit deserunt repellat. Dolor
                numquam officiis rerum architecto doloremque, sint perferendis
                enim fugit velit voluptates, ipsum ea dicta.
              </Text>
            </Spoiler>
          </SDetails>
        );
      }}
    </Observer>
  );
}

export default Details;
