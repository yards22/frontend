import { Button, Card, Skeleton, Text } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import styled from "styled-components";
import ProfileAvatar from "../../../Atoms/ProfileAvatar";
import { DummyFollowingList } from "../../../Data/Dummies/Following";
import { MFollow } from "../../../Logic/Model/MExplore";
import { useStores } from "../../../Logic/Providers/StoresProviders";

const SFollowers = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
interface FollowingProps {
  handleCurrentRenderingInProfileRoute: (p: string) => void;
}

function Followers(props: FollowingProps) {
  const stores = useStores();
  return (
    <Observer>
       {
         () => {
           const {exploreStore} = stores
           return(
            <SFollowers>
                <Text
                  size={"md"}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => props.handleCurrentRenderingInProfileRoute("Profile")}
                >
                  {"<- Back"}
                </Text>
                  {!exploreStore.isLoading && exploreStore.FollowersList.map(
                    (each: MFollow) => {
                      return (
                        <Card
                          style={{
                            display: "flex",
                            margin: "5px",
                            alignItems: "center",
                          }}
                          key = {each.username}
                        >
                          <ProfileAvatar imageUrl={each.profile_pic_uri} />
                          <Text ml={18}>{each.username}</Text>
                        </Card>
                      );
                    }
                  )}
                  {
                    exploreStore.isLoading && 
                    ([...Array(5)]).map(each => {
                      return (
                        <Card
                          style={{
                            display: "flex",
                            margin: "5px",
                            alignItems: "center",
                          }}
                          key = {each}
                        >
                          <Skeleton height={40} circle mb="xl" style={{margin:"0px",marginRight:"10px"}}/>
                          <Skeleton height={15} width = "30%" radius="xl" />
                       </Card>
                      )
                    })
                  }
              </SFollowers>
           )
         }
       }
    </Observer>
  );
}

export default Followers;
