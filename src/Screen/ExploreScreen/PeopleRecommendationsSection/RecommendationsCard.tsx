import { Avatar, Button, Card, Text } from "@mantine/core";
import styled from "styled-components";
// import ProfilePhoto from "../../ProfileScreen/ProfileDetailsSection/ProfilePhoto"

const SRecommendationsCard = styled.div`
    height: 225px;
    flex-grow: 1;
    min-width: 160px;
    margin: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 240px;
    border : 1px solid black;
`

function RecommendationsCard() {
  return (
    <SRecommendationsCard>
      <Avatar size={70} radius={"xl"} />
      <Text mt={5}>UserName</Text>
      <Text mt={5} size={"sm"} mb={10}>
        CricIndex : 400
      </Text>
      <Button size={"xs"}>Follow</Button>
    </SRecommendationsCard>
  );
}

export default RecommendationsCard;
