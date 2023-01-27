import {
  Textarea,
  Text,
  TextInput,
  Button,
  Divider,
  Loader
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useStores } from "../../Logic/Providers/StoresProviders";
import { validateUsername } from "../../Logic/Utils/Common";
import EditInterest from "./EditInterest";

import EditProfileImage from "./EditProfileImage";

const SEditPageOne = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;

function EditPageOne() {
  const stores = useStores();
  const navigate = useNavigate();
  const [username, setUserName] = useState(
    stores.profileStore.profile?.username || ""
  );

  const [isUserNameCheckDone, setUserNameCheck] = useState(true);
  const [userNameError, setUserNameError] = useState("");
  const [newProfileImage, setNewProfileImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleUsernameBlur() {
    const vu = validateUsername(username);
    setUserNameCheck(false);
    if (vu) {
      setUserNameError(vu.message);
      return;
    } else {
      setUserNameError("");
    }
    if (
      username !== stores.profileStore.profile?.username &&
      stores.authStore.token
    ) {
      stores.profileStore
        .CheckUserNameAvailability(username)
        .then((res) => {
          setUserNameCheck(true);
          setUserNameError("");
        })
        .catch((err) => {
          setUserNameError("Username already taken.");
        })
        .finally(() => {
          setUserNameCheck(true);
        });
    } else {
      setUserNameError("");
    }
  }

  return (
    <Observer>
      {() => {
        const { profileStore } = stores;
        return (
          <SEditPageOne>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px 15px",
                marginBottom: "20px"
              }}
            >
              <EditProfileImage
                onImageChange={(e) => {
                  setNewProfileImage(e);
                }}
              />
              <TextInput
                style={{ width: "100%" }}
                onBlur={handleUsernameBlur}
                type="text"
                value={username}
                label="Username"
                onChange={(e: any) => {
                  setUserName(e.target.value.trim());
                }}
              />

              <Text color={"red"} mt={3} size="xs" className="w-full">
                {userNameError}
              </Text>
              {!isUserNameCheckDone && (
                <div className="flex w-full gap-2">
                  <Loader size={"xs"} color="gray" />
                  <Text size={"xs"} color="dimmed">
                    Checking username
                  </Text>
                </div>
              )}
              <TextInput
                style={{ width: "100%" }}
                type="text"
                value={profileStore.profile?.name || ""}
                label="Name"
                onChange={(e: any) => {
                  profileStore.SetProfile({
                    ...profileStore.profile,
                    name: e.target.value
                  } as any);
                }}
              />
              <Textarea
                style={{ width: "100%" }}
                label="Bio"
                value={profileStore.profile?.bio || ""}
                onChange={(e: any) => {
                  profileStore.SetProfile({
                    ...profileStore.profile,
                    bio: e.target.value
                  } as any);
                }}
                minRows={4}
              />
              <EditInterest />
              <Divider my="sm" style={{ marginTop: "30px", width: "100%" }} />
              <Button
                loading={loading}
                disabled={userNameError !== "" || !isUserNameCheckDone}
                style={{ width: "100%" }}
                onClick={() => {
                  setLoading(true);
                  profileStore
                    .UpdateProfile(
                      username,
                      profileStore.profile?.name || undefined,
                      profileStore.profile?.bio || undefined,
                      profileStore.profile?.interests,
                      newProfileImage
                    )
                    .then(() => {
                      setLoading(false);
                      showNotification({
                        message: "Profile Details Updated",
                        color: "green"
                      });
                      navigate("/profile");
                      stores.appStore.setNavigationState(4);
                    })
                    .catch(() => {
                      setLoading(false);
                      showNotification({
                        message: "Profile Details Not Updated",
                        color: "red"
                      });
                    });
                }}
              >
                Save Profile
              </Button>
            </div>
          </SEditPageOne>
        );
      }}
    </Observer>
  );
}

export default EditPageOne;
