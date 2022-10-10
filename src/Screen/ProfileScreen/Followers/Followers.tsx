import { Button, Card, Text } from "@mantine/core";
import styled from "styled-components";
import ProfileAvatar from "../../../Atoms/ProfileAvatar";
import { DummyFollowingList } from "../../../Data/Dummies/Following";

const SFollowers = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
interface FollowingProps {
  handleCurrentRenderingInProfileRoute: (p: string) => void;
}

function Followers(props: FollowingProps) {
  return (
    <SFollowers>
      <Text
        size={"md"}
        style={{
          cursor: "pointer",
        }}
        onClick={() => props.handleCurrentRenderingInProfileRoute("Profile")}
      >
        {"<- Back"}
      </Text>
      {DummyFollowingList.map(
        (each: { username: string; profile_pic_uri: string }) => {
          return (
            <Card
              style={{
                display: "flex",
                margin: "5px",
                alignItems: "center",
              }}
            >
              <ProfileAvatar imageUrl={each.profile_pic_uri} />
              <Text ml={18}>{each.username}</Text>
            </Card>
          );
        }
      )}
    </SFollowers>
  );
}

export default Followers;
