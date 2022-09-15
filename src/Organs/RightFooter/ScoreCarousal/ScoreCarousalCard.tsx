import styled from "styled-components";

const SScoreCarousalCard = styled.div`
  height: 200px;
  width: 300px;
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
  return <SScoreCarousalCard>{props.battingTeam}</SScoreCarousalCard>;
}

export default ScoreCarousalCard;
