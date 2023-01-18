import { Badge, Button } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackPage from "../../Atoms/BackPage";
import LinkedUserName from "../../Atoms/LinkedUserName";
import Loading from "../../Atoms/Loading";
import ProfilePhoto from "../../Atoms/ProfilePhoto";
import { useStores } from "../../Logic/Providers/StoresProviders";

function FollowersScreenIndex() {
  const navigate = useNavigate();
  const { networkStore } = useStores();
  const search = useLocation().search;
  const queryUsername = new URLSearchParams(search).get(
    "username",
  );

  useEffect(() => {
    networkStore.GetFollowersAndFollowing(
      queryUsername || undefined,
    );
  }, [queryUsername]);
  return (
    <div>
      <BackPage
        title="Followers"
        onClick={() => {
          let url = "/profile";
          if (queryUsername)
            url += "?username=" + queryUsername;
          navigate(url);
        }}
      />
      <Observer>
        {() => {
          const { followers } = networkStore;
          if (!followers) return <Loading />;
          if (followers.length === 0)
            return (
              <>
                <p className="w-full text-center font-bold">
                  You have no followers.
                </p>
                <p className="m-3 text-center">
                  Why not{" "}
                  <Button
                    onClick={() => {
                      navigate("/feed?focusInput=true");
                    }}
                    variant="subtle"
                  >
                    Post
                  </Button>{" "}
                  some interesting cricket posts to make
                  your presence and gain followers.
                </p>
              </>
            );

          return (
            <div className="flex flex-col">
              {followers.map((item, index) => {
                return (
                  <div
                    className="flex border-collapse items-center justify-between border-b border-solid
                  border-transparent border-b-gray-200 p-2"
                    key={"followers_" + item.user_id}
                  >
                    <div className="flex gap-4">
                      <ProfilePhoto
                        profileImageUri={
                          item.profile_image_uri
                        }
                        userName={item.username}
                      />
                      <div className="flex flex-col">
                        <LinkedUserName
                          username={item.username}
                        />
                        <Badge className="w-fit">
                          Cric Index {item.cric_index}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }}
      </Observer>
    </div>
  );
}

export default FollowersScreenIndex;
