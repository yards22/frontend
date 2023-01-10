import { Carousel } from "@mantine/carousel";
import { Observer } from "mobx-react-lite";
import { MPoll } from "../../../Logic/Model/MPoll";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import PollCard from "./PollCard";

function getOptions(poll: MPoll): { title: string; votes: number }[] {
  const res: { title: string; votes: number }[] = [];
  poll.poll.options.forEach((option, index) => {
    let count = 0;
    poll.reaction.forEach((rx) => {
      if (rx.type === index) count++;
    });
    res.push({ title: option, votes: count });
  });
  return res;
}

function PollCarousal() {
  const stores = useStores();
  return (
    <Observer>
      {() => {
        const { miscStore } = stores;
        if (!miscStore.polls) return <p>Loading</p>;
        return (
          <div
            style={{
              width: "300px",
              height: "fit-content",
            }}
          >
            <Carousel
              loop
              withControls={false}
              withIndicators
              styles={{
                indicator: {
                  width: 12,
                  height: 4,
                  transition: "width 250ms ease",
                  background: "gray",
                  "&[data-active]": {
                    width: 40,
                  },
                },
              }}
              slideGap="md"
              align="start"
            >
              {miscStore.polls.map((each, index) => {
                if (index <= 2)
                  return (
                    <Carousel.Slide key={"poll_" + each.poll.poll_id}>
                      <PollCard
                        hasPolled={each.hasPolled}
                        pollId={each.poll.poll_id}
                        question={each.poll.poll_question}
                        options={getOptions(each)}
                      />
                    </Carousel.Slide>
                  );
                return null;
              })}
            </Carousel>
          </div>
        );
      }}
    </Observer>
  );
}

export default PollCarousal;
