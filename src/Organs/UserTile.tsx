import { Badge, Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import LinkedUserName from "../Atoms/LinkedUserName";
import ProfilePhoto from "../Atoms/ProfilePhoto";
import { useStores } from "../Logic/Providers/StoresProviders";

interface UserTileProps {
  user_id: number;
  username: string;
  cric_index: number;
  profile_image_uri: string | null;
}

function UserTile(props: UserTileProps) {
  const { networkStore } = useStores();
  const [doesFollow, setDoesFollow] = useState(
    networkStore.IfFollows(props.user_id)
  );
  return (
    <div className="flex h-[225] min-w-[180] items-center justify-center rounded-md border border-solid border-gray-200 p-2">
      <ProfilePhoto
      size={"lg"}
        profileimageuri={props.profile_image_uri}
        username={props.username}
      />
      <div className="flex-1 ml-2 items-center justify-center">
        <LinkedUserName username={props.username} type="hard" />
        <Badge mt={5} mb={10}>
          <b>Cric Index</b> {props.cric_index}
        </Badge>
      </div>
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
    </div>
  );
}

export default UserTile;
