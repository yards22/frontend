import { Textarea, Text, TextInput, Button, Divider } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useStores } from "../../Logic/Providers/StoresProviders";
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
    const regex = new RegExp("^[A-Za-z][A-Za-z0-9_]{7,29}$");
    if (!regex.test(username))
      setUserNameError(
        "Username cannot be empty, must be 6 to 18 characters long, cannot have spaces or any special characters."
      );
    else if (
      username !== stores.profileStore.profile?.username &&
      stores.authStore.token
    ) {
      stores.profileStore.CheckUserNameAvailability(username).then((res) => {
        setUserNameCheck(true);
        setUserNameError(res !== 200 ? "Username already taken." : "");
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
                marginBottom: "20px",
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
              <Text color={"red"} mt={3} size="xs">
                {userNameError}
              </Text>

              <Textarea
                style={{ width: "100%" }}
                label="Bio"
                value={profileStore.profile?.bio || ""}
                onChange={(e: any) => {
                  profileStore.SetProfile({
                    ...profileStore.profile,
                    bio: e.target.value,
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
                      profileStore.profile?.bio || undefined,
                      profileStore.profile?.interests,
                      newProfileImage
                    )
                    .then(() => {
                      setLoading(false);
                      showNotification({
                        message: "Profile Details Updated",
                        color: "green",
                      });
                      navigate("/profile");
                      stores.appStore.setNavigationState(4);
                    })
                    .catch(() => {
                      setLoading(false);
                      showNotification({
                        message: "Profile Details Not Updated",
                        color: "red",
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
