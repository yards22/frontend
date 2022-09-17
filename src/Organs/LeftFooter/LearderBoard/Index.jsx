import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import styled from "styled-components";

const SLeaderBoardIndex = styled.div`
  height: 300px;
  width: 100%;
`;

function LeaderBoardIndex() {
  return (
    <SLeaderBoardIndex>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        {/* <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>This is Leader Board</Text>
            <Badge color="pink" variant="light">
            On Sale
            </Badge>
        </Group> */}
        <div style={{ height: "100px" }}>
          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>Leader Board</Text>
          </Group>
        </div>
      </Card>
    </SLeaderBoardIndex>
  );
}

export default LeaderBoardIndex;
