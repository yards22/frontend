import { ActionIcon, Modal } from "@mantine/core";
import React, { useState } from "react";
import { LogOut } from "react-feather";
import { Button } from "@mantine/core";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import { Observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

function ProfileCardButtons() {
  const { profileStore, authStore } = useStores();
  const navigate = useNavigate();
  const [logoutModal, setLogoutModal] = useState(false);
  return (
    <Observer>
      {() => {
        const { viewProfile, profile } = profileStore;
        return (
          <div
            style={{
              minWidth: "150px",
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: "15px",
            }}
          >
            <Button
              variant="light"
              style={{ width: "100%", maxWidth: "300px" }}
              onClick={() => {
                navigate("/profile/edit");
              }}
            >
              {viewProfile?.user_id === profile?.user_id
                ? "Edit Profile"
                : "Follow"}
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
                  marginTop: "20px",
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
