import { Carousel } from "@mantine/carousel";
import ScoreCarousalCard from "./ScoreCarousalCard";

const tempMatches: {
  battingTeam: string;
  bowlingTeam: string;
  runs: number;
  wickets: number;
  totalOvers: number;
  overRunning: number;
}[] = [
  {
    battingTeam: "IND",
    bowlingTeam: "SL",
    overRunning: 5.4,
    runs: 56,
    totalOvers: 20,
    wickets: 1,
  },
  {
    battingTeam: "AUS",
    bowlingTeam: "PAK",
    overRunning: 5.4,
    runs: 56,
    totalOvers: 20,
    wickets: 1,
  },
  {
    battingTeam: "ENG",
    bowlingTeam: "WI",
    overRunning: 5.4,
    runs: 56,
    totalOvers: 20,
    wickets: 1,
  },
];

function ScoreCarousalIndex() {
  return (
    <div style={{ width: "300px", height: "200px",marginBottom:"15px"}}>
      <Carousel
        withIndicators
        styles={{
          control: {
            "&[data-inactive]": {
              opacity: 0,
              cursor: "default",
            },
          },
        }}
        dragFree
        slideGap="md"
        align="start"
      >
        {tempMatches.map((each) => {
          return (
            <Carousel.Slide
              key={each.battingTeam + each.battingTeam + each.runs}
            >
              <ScoreCarousalCard {...each} />
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </div>
  );
}

export default ScoreCarousalIndex;
