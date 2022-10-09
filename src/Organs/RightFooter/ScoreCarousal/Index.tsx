import { Carousel } from "@mantine/carousel";
import ScoreCarousalCard from "./ScoreCarousalCard";
import { Text , Divider } from "@mantine/core";

const tempMatches: {
  battingTeam: string;
  bowlingTeam: string;
  runs: number;
  wickets: number;
  totalOvers: number;
  overRunning: number;
  image ?: string;
}[] = [
  {
    battingTeam: "IND",
    bowlingTeam: "SL",
    overRunning: 5.4,
    runs: 56,
    totalOvers: 20,
    wickets: 1,
    image : "https://res.cloudinary.com/du7d2nmbw/image/upload/v1665152157/WhatsApp_Image_2022-10-07_at_7.45.11_PM_px1sqt.jpg",
  },
  {
    battingTeam: "AUS",
    bowlingTeam: "PAK",
    overRunning: 5.4,
    runs: 56,
    totalOvers: 20,
    wickets: 1,
    image : "https://res.cloudinary.com/du7d2nmbw/image/upload/v1665151700/WhatsApp_Image_2022-10-07_at_7.37.41_PM_cahxll.jpg"
  },
  {
    battingTeam: "ENG",
    bowlingTeam: "WI",
    overRunning: 5.4,
    runs: 56,
    totalOvers: 20,
    wickets: 1,
    image: "https://res.cloudinary.com/du7d2nmbw/image/upload/v1665152061/WhatsApp_Image_2022-10-07_at_7.39.38_PM_phs0za.jpg"
  },
];

function ScoreCarousalIndex() {
  return (
    <div style={{ width: "100%", height: "200px",marginBottom:"15px"}}>
      <Text italic size={"md"} style={{marginLeft:"5px"}}>
           Coming Soon...
       </Text>
       <Divider my="sm" color={"black"} style={{ marginTop:"5px" }}/>
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
