import { Card, Image, Text, Badge, Button, Group, Textarea } from "@mantine/core";
import styled from "styled-components";
const SNewsIndex = styled.div`
  width: 100%;
  margin-top: 30px;
`;

function NewsIndex() {
  return (
    <SNewsIndex>
      <Card 
         shadow="sm" 
         p="lg" 
         radius="md" withBorder 
         style={{
           display : "flex",
           flexDirection : "column",
           alignItems : "center"
      }}>
         <Text size={"lg"}>
             Send Us Your Feedback
         </Text>
         <Textarea 
            style={{
              marginBottom : "10px",
              marginTop : "10px",
              width : "100%",
              fontSize : "25px"
            }}
            minRows = {7}     
            placeholder = "Every word of you impacts this website"
         />
         <Button
           variant="filled"
         >
             Send FeedBack
         </Button>
      </Card>
    </SNewsIndex>
  );
}

export default NewsIndex;
