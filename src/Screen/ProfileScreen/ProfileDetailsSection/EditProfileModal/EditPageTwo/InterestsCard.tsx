import { Avatar, Box } from "@mantine/core";
import { useState } from "react";
import styled from "styled-components";

const SInterestsCard = styled.div`
  cursor: pointer;
`;

interface InterestsCardProps {
  image: string;
  label: string;
  description: string;
  handleAddInterestToArray(interest: string): void;
}

function InterestsCard(props: InterestsCardProps) {
  const [isInterestSelected, setIsInterestSelected] = useState(false);

  const handleInterestSelected = () => {
    props.handleAddInterestToArray(props.label);
  };
  return (
    <SInterestsCard
      key={props.label}
      onClick={handleInterestSelected}
      style={{
        backgroundColor: `${isInterestSelected ? "gray" : ""}`,
      }}
    >
      <Box
        style={{
          display: "flex",
          cursor: "default",
          alignItems: "center",
          backgroundColor: "white",
          border: `1px solid gray`,
          padding: "5px",
          paddingLeft: "10px",
          borderRadius: "4px",
          marginBottom: "8px",
        }}
      >
        <Box mr={10}>
          <Avatar size={"sm"} src={props.image} />
        </Box>
        <div>{props.label}</div>
      </Box>
    </SInterestsCard>
  );
}

export default InterestsCard;
