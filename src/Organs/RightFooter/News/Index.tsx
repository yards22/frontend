import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import styled from "styled-components";
const SNewsIndex = styled.div`
  width: 100%;
`;

function NewsIndex() {
  return (
    <SNewsIndex>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>News</Text>
        </Group>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>News</Text>
        </Group>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>News</Text>
        </Group>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>News</Text>
        </Group>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>News</Text>
        </Group>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>News</Text>
        </Group>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>News</Text>
        </Group>
      </Card>
    </SNewsIndex>
  );
}

export default NewsIndex;
