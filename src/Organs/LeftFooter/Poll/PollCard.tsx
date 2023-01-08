import { Card, Title, useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import styled from "styled-components";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import PollButtons from "./PollButtons";

interface PollCardProps {
  pollId: number;
  question: string;
  options: { title: string; votes: number }[];
  hasPolled: boolean;
}

const SEventsIndex = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const Flag = styled.div`
  position: absolute;
  left: -40px;
  top: 20px;
  z-index: 10;
  width: 150px;
  background: #ff5b5b;
  display: flex;
  justify-content: center;
  color: white;
  font-weight: bold;
  transform: rotate(-45deg);
`;

function PollCard(props: PollCardProps) {
  const stores = useStores();
  const { colors } = useMantineTheme();
  return (
    <SEventsIndex>
      <Card
        shadow="lg"
        p="lg"
        withBorder
        style={{ padding: "0", width: "300px" }}
      >
        <Flag>Poll</Flag>
        <div
          style={{
            background: colors.blue[8],
            padding: "10px 10px",
            minHeight: "50px",
          }}
        >
          <Title order={5} color="white" style={{ marginLeft: "80px" }}>
            {props.question}
          </Title>
        </div>
        <div
          style={{ padding: "30px", display: "flex", flexDirection: "column" }}
        >
          <PollButtons
            selected={props.hasPolled}
            buttons={props.options}
            onPoll={(index) => {
              stores.miscStore
                .PostPollReaction(props.pollId, index)
                .then(() => {
                  showNotification({
                    message: "Your poll has been submitted.",
                    color: "green",
                  });
                })
                .catch((err) => {
                  showNotification({
                    message: JSON.stringify(err),
                    color: "red",
                  });
                });
            }}
          />
        </div>
      </Card>
    </SEventsIndex>
  );
}

export default PollCard;
