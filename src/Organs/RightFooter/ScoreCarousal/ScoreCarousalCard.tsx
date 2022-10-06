import { Observer } from "mobx-react-lite";
import styled from "styled-components";
import { useStores } from "../../../Logic/Providers/StoresProviders";

const SScoreCarousalCard = styled.div`
  height: 200px;
  width: ${(p: any)=>(p.theme.width >800 ? "300px" : `${p.theme.width * 36.5 / 100}px`)};
  border: 1px solid brown;
  margin: 0px;
  display: flex;
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
              {props.battingTeam}
            </SScoreCarousalCard>
          )
        }
      }
    </Observer>
   )
  ;
}

export default ScoreCarousalCard;
