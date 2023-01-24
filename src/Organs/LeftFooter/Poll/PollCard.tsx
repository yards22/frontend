import { Card, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import styled from "styled-components";
import { MPoll } from "../../../Logic/Model/MPoll";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import PollButtons from "./PollButton";

const Flag = styled.div`
  transform: rotate(-45deg);
`;

function MakeOptions(data: MPoll) {
  const res: { title: string; percentage: number }[] = [];

  let totalVotes = 0;
  const reactionCountMap = new Map<number, number>();
  data.reaction.forEach((reaction) => {
    totalVotes += reaction.count;
    reactionCountMap.set(
      reaction.type,
      (reactionCountMap.get(reaction.type) || 0) + reaction.count
    );
  });

  data.poll.options.forEach((pollOption, index) => {
    if (totalVotes === 0)
      res.push({
        title: pollOption,
        percentage: 0
      });
    else
      res.push({
        title: pollOption,
        percentage: Math.round(
          ((reactionCountMap.get(index) || 0) * 100) / totalVotes
        )
      });
  });
  return res;
}

function PollCard(props: { pollData: MPoll }) {
  const stores = useStores();
  const buttonsProps = MakeOptions(props.pollData);
  return (
    <div>
      <Card shadow="lg" p="lg" withBorder className="w-full p-0">
        <Flag
          className={`${
            props.pollData.hasPolled ? "bg-green-600" : "bg-red-600"
          } absolute left-[-40px] top-[20px] z-10 flex w-[150px] -rotate-45 justify-center font-bold text-white`}
        >
          {props.pollData.hasPolled ? "Polled" : "Poll"}
        </Flag>
        <div className="min-h-[50px] bg-prim-700 p-3">
          <Title order={5} color="white" style={{ marginLeft: "80px" }}>
            {props.pollData.poll.poll_question}
          </Title>
        </div>
        <div className="flex flex-col p-8">
          {buttonsProps.map((v, i) => {
            return (
              <PollButtons
                key={"pollId" + i}
                hasPolled={props.pollData.hasPolled}
                title={v.title}
                percentage={v.percentage}
                onClick={() => {
                  stores.miscStore
                    .PostPollReaction(props.pollData.poll.poll_id, i)
                    .then(() => {
                      showNotification({
                        message: "Your poll has been submitted.",
                        color: "green"
                      });
                    })
                    .catch((err) => {
                      showNotification({
                        message: "Could not post your poll.",
                        color: "red"
                      });
                    });
                }}
              />
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export default PollCard;
