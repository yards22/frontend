import { Avatar, Box, Button } from "@mantine/core";


interface InterestsCardProps {
  image: string;
  label: string;
  disable ?: boolean;
  value : string;
  handleAddInterestToArray(interest: string): void;
}

function InterestsCard(props: InterestsCardProps) {
  
  const handleInterestSelected = () => {
    props.handleAddInterestToArray(props.value);
  };
  return (
        <Button
          variant="outline"
          style={{
            borderRadius: "4px",
            margin: "4px",
          }}
          disabled = {props.disable}
          onClick = {handleInterestSelected}
          leftIcon = {<Avatar src={props.image} size="xs"/>}
        >
           {props.label}
        </Button>
  );
}

export default InterestsCard;
