import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import styled from "styled-components";
const SEventsIndex = styled.div`
  height: 100%;
  width: 100%;
`;

function EventsIndex() {
  return (
    <SEventsIndex>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>Events</Text>
        </Group>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>Events</Text>
        </Group>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>Events</Text>
        </Group>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>Events</Text>
        </Group>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>Events</Text>
        </Group>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>Events</Text>
        </Group>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>Events</Text>
        </Group>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>Events</Text>
        </Group>
      </Card>
    </SEventsIndex>
  );
}

export default EventsIndex;
