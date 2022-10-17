import { Title } from "@mantine/core";
import React from "react";
import styled from "styled-components";
import ProfilePhoto from "./ProfilePhoto";
const SStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
`;
function ProfilePicAndStats() {
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
        userName="something"
        profileImageUri={
          "https://img.freepik.com/premium-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg?w=2000"
        }
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
}

export default ProfilePicAndStats;
