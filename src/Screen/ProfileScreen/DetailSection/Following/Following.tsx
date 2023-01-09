import { Button, Card, Skeleton, Text } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ProfileAvatar from "../../../../Atoms/ProfileAvatar";
import { DummyFollowingList } from "../../../../Data/Dummies/Following";
import { MFollow } from "../../../../Logic/Model/MExplore";
import { useStores } from "../../../../Logic/Providers/StoresProviders";

const SFollowing = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
interface FollowingProps {
  handleCurrentRenderingInProfileRoute: (p: string) => void;
}

function Following(props: FollowingProps) {
  const stores = useStores();
  const [followingList, setFollowingList] = useState<MFollow[]>([]);

  useEffect(() => {
    //   if(stores.authStore.token){
    //     stores.exploreStore.GetFollowing(stores.authStore.token)
    //     .then(()=>{

    //     })
    //  }
    setFollowingList(stores.exploreStore.FollowingList);
  }, []);

  return (
    <Observer>
      {() => {
        const { exploreStore } = stores;
        return (
          <SFollowing>
            <Text
              size={"md"}
              style={{
                cursor: "pointer",
              }}
              onClick={() =>
                props.handleCurrentRenderingInProfileRoute("Profile")
              }
            >
              {"<- Back"}
            </Text>
            {!exploreStore.isLoading &&
              stores.exploreStore.FollowingList.map((each: MFollow) => {
                return (
                  <Card
                    style={{
                      display: "flex",
                      margin: "5px",
                      alignItems: "center",
                    }}
                    key={each.username}
                  >
                    <ProfileAvatar imageUrl={each.profile_pic_uri} />
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text ml={18}>{each.username}</Text>
                      <Button
                        variant="light"
                        size={"sm"}
                        onClick={() => {
                          if (stores.authStore.token) {
                            stores.exploreStore
                              .DeleteNewConnection({
                                user_id: each.user_id,
                                token: stores.authStore.token,
                              })
                              .then((res) => {
                                if (res === 200) {
                                  if (stores.authStore.token) {
                                    stores.exploreStore.GetFollowing(
                                      stores.authStore.token
                                    );
                                  }
                                }
                              });
                          }
                        }}
                      >
                        UnFollow
                      </Button>
                    </div>
                  </Card>
                );
              })}
            {exploreStore.isLoading &&
              [...Array(5)].map((each) => {
                return (
                  <Card
                    style={{
                      display: "flex",
                      margin: "5px",
                      alignItems: "center",
                    }}
                    key={each}
                  >
                    <Skeleton
                      height={40}
                      circle
                      mb="xl"
                      style={{ margin: "0px", marginRight: "10px" }}
                    />
                    <Skeleton height={15} width="30%" radius="xl" />
                  </Card>
                );
              })}
          </SFollowing>
        );
      }}
    </Observer>
  );
}

export default Following;
