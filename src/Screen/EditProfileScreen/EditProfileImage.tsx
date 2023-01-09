import { Center, ActionIcon, Menu, FileInput } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { Edit2, Plus, Repeat, Trash2 } from "react-feather";
import ProfilePhoto from "../../Atoms/ProfilePhoto";
import { useStores } from "../../Logic/Providers/StoresProviders";

interface IEditProfileImage {
  onImageChange: (image: File) => void;
}

function EditProfileImage(props: IEditProfileImage) {
  const fileInputRef: any = useRef(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedImageViewUri, setSelectedImageViewUri] = useState<any>(null);
  useEffect(() => {
    if (window.FileReader && selectedImage) {
      const fr = new FileReader();
      fr.onloadend = function (e) {
        if (e.target?.result) setSelectedImageViewUri(e.target.result);
      };
      fr.readAsDataURL(selectedImage);
    }
  }, [selectedImage]);
  const stores = useStores();
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
                      onClick={() => {
                        if (fileInputRef) fileInputRef.current.click();
                      }}
                    >
                      Change
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
              profileImageUri={
                selectedImageViewUri ??
                stores.profileStore.profile?.profile_image_uri
              }
              userName={profileStore.profile?.username}
              style={{ height: "200px", width: "200px" }}
            />
            <FileInput
              accept="image/*"
              ref={fileInputRef}
              style={{
                display: "none",
              }}
              onChange={(e) => {
                setSelectedImage(e);
                if (e) props.onImageChange(e);
              }}
            />
          </div>
        );
      }}
    </Observer>
  );
}

export default EditProfileImage;
