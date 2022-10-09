import { useEffect, useState } from "react";
import styled from "styled-components";

const SInterestsCard = styled.div`
  padding: 4px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid brown;
  margin: 3px;
`;

interface InterestsCardProps {
  name: string;
  handleAddInterestToArray(interest: string): void;
  handleRemoveInterestFromArray(interest: string): void;
  interestsArray: string[];
}

function InterestsCard(props: InterestsCardProps) {
  const [isInterestSelected, setIsInterestSelected] = useState(false);

  useEffect(() => {
    if (props.interestsArray.includes(props.name)) {
      setIsInterestSelected(true);
    }
  });

  const handleInterestSelected = () => {
    if (isInterestSelected) {
      setIsInterestSelected(false);
      props.handleRemoveInterestFromArray(props.name);
    } else {
      setIsInterestSelected(true);
      props.handleAddInterestToArray(props.name);
    }
  };
  return (
    <SInterestsCard
      key={props.name}
      onClick={handleInterestSelected}
      style={{
        backgroundColor: `${isInterestSelected ? "gray" : ""}`,
      }}
    >
      {props.name}
    </SInterestsCard>
  );
}

export default InterestsCard;
