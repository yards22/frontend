import { Avatar, Card, Center, Text } from "@mantine/core";


interface MInterestSectionCard {
    image: string;
    label: string;
    description: string;
}

function InterestSectionCard(props : MInterestSectionCard) {
  return (
     <Card 
       style={{
         height : "200px",
         marginRight : "10px",
         minWidth : "150px",
         display : "flex",
         flexDirection : "column",
         alignItems : "center",
         textAlign : "center"
       }}
       withBorder
       shadow={"md"}
     >  
        <Avatar size={50} style={{marginBottom :" 5px"}} src={props.image}/>
        <Text weight={700} style={{marginBottom :" 5px"}}  size="sm">{props.label}</Text>
        <Text size="xs">{props.description}</Text>
     </Card>
  )
}

export default InterestSectionCard