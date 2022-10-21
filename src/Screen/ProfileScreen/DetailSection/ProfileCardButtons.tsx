import { Center, ActionIcon } from "@mantine/core";
import React from "react";
import { MoreVertical, Edit2, LogOut } from "react-feather";
import { Menu, Button } from "@mantine/core";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import { Observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

function ProfileCardButtons() {
  const { profileStore, authStore } = useStores();
  const navigate = useNavigate();
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
            >
              {viewProfile?.user_id === profile?.user_id
                ? "Edit Profile"
                : "Follow"}
            </Button>

            {viewProfile?.user_id === profile?.user_id && (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Center style={{ marginLeft: "10px" }}>
                    <ActionIcon variant="light" size={"lg"}>
                      <MoreVertical />
                    </ActionIcon>
                  </Center>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    icon={<Edit2 size={16} />}
                    onClick={() => {
                      navigate("/profile/edit");
                    }}
                  >
                    Edit Profile
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    icon={<LogOut size={16} />}
                    onClick={() => {
                      authStore.LogoutUser().then(() => {
                        navigate("/login");
                      });
                    }}
                  >
                    Log Out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </div>
        );
      }}
    </Observer>
  );
}

export default ProfileCardButtons;
