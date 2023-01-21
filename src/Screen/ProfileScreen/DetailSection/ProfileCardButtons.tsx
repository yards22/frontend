import { ActionIcon, Modal } from "@mantine/core";
import React, { useState } from "react";
import { Edit2, LogOut, Share2 } from "react-feather";
import { Button } from "@mantine/core";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import { Observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import { CopyToClipboard, GetHostUrl } from "../../../Logic/Utils/Common";

function ProfileCardButtons() {
  const navigate = useNavigate();
  const { profileStore, authStore, networkStore } = useStores();
  networkStore.GetFollowersAndFollowing();
  const [logoutModal, setLogoutModal] = useState(false);
  return (
    <Observer>
      {() => {
        const { viewProfile, profile } = profileStore;
        const { following } = networkStore;
        let doesFollow = false;
        if (viewProfile)
          doesFollow = networkStore.IfFollows(viewProfile.user_id);

        let buttonName = "Loading...";
        if (viewProfile?.user_id === profile?.user_id)
          buttonName = "Edit Profile";
        else if (following) buttonName = doesFollow ? "Un-follow" : "Follow";

        return (
          <div
            style={{
              minWidth: "150px",
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: "15px"
            }}
          >
            <Button
              variant="light"
              leftIcon={<Edit2 size={16} />}
              onClick={() => {
                if (viewProfile?.user_id === profile?.user_id)
                  navigate("/profile/edit");
                else if (viewProfile) {
                  if (!doesFollow)
                    networkStore
                      .Follow(
                        viewProfile?.user_id,
                        viewProfile.username,
                        viewProfile.cric_index,
                        viewProfile.profile_image_uri
                      )
                      .then(() => {
                        showNotification({
                          message: (
                            <p>
                              Started following <b>{viewProfile.username}</b>
                            </p>
                          ),
                          color: "green"
                        });
                      })
                      .catch((err) => {
                        showNotification({
                          message: (
                            <p>
                              Could not follow <b>{viewProfile.username}</b>
                            </p>
                          ),
                          color: "red"
                        });
                      });
                  else
                    networkStore
                      .UnFollow(viewProfile?.user_id)
                      .then(() => {
                        showNotification({
                          message: (
                            <p>
                              Un-followed <b>{viewProfile.username}</b>
                            </p>
                          ),
                          color: "green"
                        });
                      })
                      .catch((err) => {
                        showNotification({
                          message: (
                            <p>
                              Could not un-follow <b>{viewProfile.username}</b>
                            </p>
                          ),
                          color: "red"
                        });
                      });
                }
              }}
            >
              {buttonName}
            </Button>
            <Button
              variant="light"
              color="blue"
              style={{ marginLeft: "10px" }}
              leftIcon={<Share2 size={16} />}
              onClick={() => {
                CopyToClipboard(
                  `${GetHostUrl()}/profile?username=${viewProfile?.username}`
                );
                showNotification({
                  title: "Copied To Clipboard",
                  message: "You can share profile via copied link."
                });
              }}
            >
              Share Profile
            </Button>
            {viewProfile?.user_id === profile?.user_id && (
              <ActionIcon
                variant="light"
                size={"lg"}
                color="red"
                style={{ marginLeft: "10px" }}
                onClick={() => {
                  setLogoutModal(true);
                }}
              >
                <LogOut />
              </ActionIcon>
            )}

            <Modal
              title="Are you sure to log out?"
              centered
              opened={logoutModal}
              onClose={() => {
                setLogoutModal(false);
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginTop: "20px"
                }}
              >
                <Button
                  variant="subtle"
                  style={{ marginRight: "10px" }}
                  onClick={() => setLogoutModal(false)}
                >
                  Close
                </Button>
                <Button
                  color="red"
                  onClick={() => {
                    authStore.LogoutUser().then(() => {
                      navigate("/");
                    });
                  }}
                >
                  Logout
                </Button>
              </div>
            </Modal>
          </div>
        );
      }}
    </Observer>
  );
}

export default ProfileCardButtons;
