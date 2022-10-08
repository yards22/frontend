import { Text } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import styled from "styled-components";
import { useStores } from "../../../Logic/Providers/StoresProviders";

const SScoreCarousalCard = styled.div`
  height: 200px;
  width: ${(p: any)=>(p.theme.width >800 ? "300px" : `${p.theme.width * 36.5 / 100}px`)};
  margin: 0px;
  display: flex;
  flex-direction : column;
  justify-content: center;
  align-items: center;
`;

interface ScoreCarousalCardProps {
  battingTeam: string;
  bowlingTeam: string;
  runs: number;
  wickets: number;
  totalOvers: number;
  overRunning: number;
  image ?:string;
}

function ScoreCarousalCard(props: ScoreCarousalCardProps) {

  const store = useStores();

  return (
    <Observer>
      {
        () =>{
          return (
            <SScoreCarousalCard
               theme={{width : store.appStore.deviceWidth}}
            >
              <img src={props.image} width={"100%"} height={"100%"}/>
            </SScoreCarousalCard>
          )
        }
      }
    </Observer>
   )
  ;
}

export default ScoreCarousalCard;
