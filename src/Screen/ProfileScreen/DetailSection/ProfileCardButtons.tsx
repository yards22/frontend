import { Center, ActionIcon } from "@mantine/core";
import React from "react";
import { MoreVertical, Edit2, LogOut } from "react-feather";
import { Menu, Button } from "@mantine/core";

function ProfileCardButtons() {
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
      <Button variant="light" style={{ width: "100%", maxWidth: "300px" }}>
        Edit
      </Button>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Center style={{ marginLeft: "10px" }}>
            <ActionIcon variant="light" size={"lg"}>
              <MoreVertical />
            </ActionIcon>
          </Center>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item icon={<Edit2 size={16} />} onClick={() => {}}>
            Edit Profile
          </Menu.Item>
          <Menu.Item color="red" icon={<LogOut size={16} />}>
            Log Out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}

export default ProfileCardButtons;
