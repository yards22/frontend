import { Avatar, Button, Card, Text } from "@mantine/core";
import { MRecommended } from "../../../Logic/Model/MExplore";
import { useStores } from "../../../Logic/Providers/StoresProviders";
// import ProfilePhoto from "../../ProfileScreen/ProfileDetailsSection/ProfilePhoto"

function RecommendationsCard() {
  const stores = useStores();
  
  function handleFollow(user:MRecommended){
    if(stores.authStore.token){
        stores.exploreStore.MakeNewConnection({user_id:user.user_id,token:stores.authStore.token})
        .then((res)=>{
           if(res === 200){
             let w = stores.exploreStore.RecommendationsList.filter(x => user.user_id)
             stores.exploreStore.SetRecommendations([...w])
           }
        })
    } 
  }

  return (
    <Card
      style={{
        height: "225px",
        flexGrow: "1",
        minWidth: "160px",
        margin: "5px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "240px",
      }}
    >
      <Avatar size={70} radius={"xl"} />
      <Text mt={5}>UserName</Text>
      <Text mt={5} size={"sm"} mb={10}>
        CricIndex : 400
      </Text>
      <Button size={"xs"} onClick={()=>{handleFollow({user_id:1,cricindex:100,username:"Saichand",profile_pic_uri:""})}}>Follow</Button>
    </Card>
  );
}

export default RecommendationsCard;
