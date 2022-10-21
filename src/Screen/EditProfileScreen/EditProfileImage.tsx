import { Center, ActionIcon, Menu } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { useRef } from "react";
import { Edit2, Plus, Repeat, Trash2 } from "react-feather";
import ProfilePhoto from "../../Atoms/ProfilePhoto";
import { useStores } from "../../Logic/Providers/StoresProviders";

function EditProfileImage() {
  const editProfilePicRef: any = useRef(null);
  const stores = useStores();

  function handleProfilePicChangeClick() {
    editProfilePicRef.current.click();
  }

  function handleProfilePicChange(e: any) {}
  return (
    <Observer>
      {() => {
        const { profileStore } = stores;
        return (
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                right: "15px",
                bottom: "15px",
                zIndex: "10",
              }}
            >
              {!profileStore.profile?.profile_image_uri ? (
                <ActionIcon
                  variant="filled"
                  color={"blue"}
                  size={"lg"}
                  radius="lg"
                >
                  <Plus size={16} />
                </ActionIcon>
              ) : (
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Center style={{ marginLeft: "10px" }}>
                      <ActionIcon
                        variant="filled"
                        color={"blue"}
                        size={"lg"}
                        radius="lg"
                      >
                        <Edit2 size={16} />
                      </ActionIcon>
                    </Center>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      icon={<Repeat size={16} />}
                      onClick={handleProfilePicChangeClick}
                    >
                      Change
                      <input
                        type={"file"}
                        accept="image/*"
                        ref={editProfilePicRef}
                        style={{
                          display: "none",
                        }}
                        onChange={handleProfilePicChange}
                      />
                    </Menu.Item>
                    <Menu.Item
                      color="red"
                      icon={<Trash2 size={16} />}
                      onClick={() => {}}
                    >
                      Remove
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )}
            </div>
            <ProfilePhoto
              profileImageUri={profileStore.profile?.profile_image_uri}
              userName={profileStore.profile?.username}
              style={{ height: "200px", width: "200px" }}
            />
          </div>
        );
      }}
    </Observer>
  );
}

export default EditProfileImage;
