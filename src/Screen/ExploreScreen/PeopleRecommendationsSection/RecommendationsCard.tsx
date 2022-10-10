import { Avatar, Button, Card, Text } from "@mantine/core"
// import ProfilePhoto from "../../ProfileScreen/ProfileDetailsSection/ProfilePhoto"

function RecommendationsCard() {
  return (
    <Card
        style={{
          height: "225px",
          flexGrow : "1",
          minWidth: "160px",
          margin : "5px",
          display : "flex",
          flexDirection : "column",
          alignItems : "center",
          justifyContent : "center",
          maxWidth : "240px"
        }}
    >     
        <Avatar
           size={70}
           radius = {"xl"}
        />
        <Text mt={5}>
           UserName
        </Text>
        <Text mt={5} size={"sm"} mb={10}>
           CricIndex : 400
        </Text>
        <Button size={"xs"}>
           Follow
        </Button>
         
    </Card>
  )
}

export default RecommendationsCard