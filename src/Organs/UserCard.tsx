import { Badge, Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import styled from "styled-components";
import LinkedUserName from "../Atoms/LinkedUserName";
import ProfilePhoto from "../Atoms/ProfilePhoto";
import { useStores } from "../Logic/Providers/StoresProviders";

const SUserCard = styled.div`
  height: 225px;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 200px;
  border-radius: 8px;
  border: 1px solid #e7e7e7;
  margin-right: 10px;
`;

interface UserCardProps {
  user_id: number;
  username: string;
  cric_index: number;
  profile_image_uri: string | null;
}

function UserCard(props: UserCardProps) {
  const { networkStore } = useStores();
  const [doesFollow, setDoesFollow] = useState(
    networkStore.IfFollows(props.user_id)
  );
  return (
    <SUserCard>
      <ProfilePhoto
        profileimageuri={props.profile_image_uri}
        username={props.username}
      />
      <LinkedUserName username={props.username} type="hard" />
      <Badge mt={5} mb={10}>
        <b>Cric Index</b> {props.cric_index}
      </Badge>
      <Button
        variant={doesFollow ? "outline" : "filled"}
        size={"xs"}
        onClick={() => {
          if (!doesFollow)
            networkStore
              .Follow(
                props.user_id,
                props.username,
                props.cric_index,
                props.profile_image_uri
              )
              .then(() => {
                setDoesFollow(true);
                showNotification({
                  message: (
                    <p>
                      Started following <b>{props.username}</b>
                    </p>
                  ),
                  color: "green"
                });
              })
              .catch((err) => {
                showNotification({
                  message: (
                    <p>
                      Could not follow <b>{props.username}</b>
                    </p>
                  ),
                  color: "red"
                });
              });
          else
            networkStore
              .UnFollow(props.user_id)
              .then(() => {
                setDoesFollow(false);
                showNotification({
                  message: (
                    <p>
                      Un-followed <b>{props.username}</b>
                    </p>
                  ),
                  color: "green"
                });
              })
              .catch((err) => {
                showNotification({
                  message: (
                    <p>
                      Could not un-follow <b>{props.username}</b>
                    </p>
                  ),
                  color: "red"
                });
              });
        }}
      >
        {doesFollow ? "Un-follow" : "Follow"}
      </Button>
    </SUserCard>
  );
}

export default UserCard;
