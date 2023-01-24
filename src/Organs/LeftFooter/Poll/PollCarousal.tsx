import { Carousel } from "@mantine/carousel";
import { Observer } from "mobx-react-lite";
import Loading from "../../../Atoms/Loading";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import PollCard from "./PollCard";

function PollCarousal() {
  const { miscStore } = useStores();

  return (
    <Observer>
      {() => {
        const { polls } = miscStore;
        if (!polls) return <Loading />;
        if (polls.length === 0)
          return (
            <b className="flex h-[100px] items-center justify-center text-gray-400">
              No Polls at the moment.
            </b>
          );
        return (
          <div className="h-fit w-[300px]">
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
                    width: 40
                  }
                }
              }}
              slideGap="md"
              align="start"
            >
              {polls.map((each, index) => {
                if (index <= 5)
                  return (
                    <Carousel.Slide key={"poll_" + each.poll.poll_id}>
                      <PollCard pollData={each} />
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
