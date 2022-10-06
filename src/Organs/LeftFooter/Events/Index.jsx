import { Card, Text } from "@mantine/core";
import styled from "styled-components";
const SEventsIndex = styled.div`
  height: 100%;
  width: 100%;
`;

const SPollOption = styled.div`
  border: 1px solid gray;
  width: 100%;
  margin-top: 8px;
  padding: 3px 6px ;
  border-radius: 4px;
  cursor: pointer;
`

function EventsIndex() {
  return (
    <SEventsIndex>
      <Card shadow="sm" p="lg" radius="md" withBorder>
          <Text>
             Who are Going to win todays match #INDVSSA
          </Text>
          <SPollOption>IND</SPollOption>
          <SPollOption>SA</SPollOption>
          <SPollOption>DRAW</SPollOption>
      </Card>
    </SEventsIndex>
  );
}

export default EventsIndex;
