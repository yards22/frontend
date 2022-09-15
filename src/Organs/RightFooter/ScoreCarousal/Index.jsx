import { createStyles } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import ScoreCarousalCard from './ScoreCarousalCard';

const tempMatches = [
    "IND vs PAK",
    "AFG vs SL",
    "AFG vs SL",
    "AFG vs SL",
]

function ScoreCarousalIndex() {
  return (
    <Carousel
        sx={{ width: "300px", height : "300px",marginBottom: "10px" }}
        mx="auto"
        withIndicators
        styles={{
          control: {
            '&[data-inactive]': {
              opacity: 0,
              cursor: 'default',
            },
          },
        }}
        dragFree
        slideGap="md"
        align="start"
     >
        {
          tempMatches.map((each)=>{
            return (
              <Carousel.Slide>
                 <ScoreCarousalCard match={each}/>
              </Carousel.Slide>
            )
          })
        }
  </Carousel>
  )
}

export default ScoreCarousalIndex