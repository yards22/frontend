import { Textarea, Text, TextInput, Button, Divider } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Observer } from "mobx-react-lite";
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
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
  const [profileImage,setProfileImage] = useState(stores.profileStore.profile?.username || null)
  const [profileImageFile,setProfileImageFile] = useState(stores.profileStore.profile?.username || null)

  async function handleUsernameBlur() {
    if (username === "") setUserNameError("Username cannot be empty.");
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
              <EditProfileImage profileImage = {profileImage}  
                   handleProfilePicChange={(e)=>{
                      setProfileImage(e)
                   }}
                   handleProfilePicFileChange={(e)=>{
                    setProfileImageFile(e)
                 }}
              />
              <TextInput
                style={{ width: "100%" }}
                onBlur={handleUsernameBlur}
                type="text"
                value={username}
                label="Username"
                onChange={(e: any) => {
                  setUserName(e.target.value);
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
                disabled={userNameError !== "" || !isUserNameCheckDone}
                style={{ width: "100%" }}
                onClick={() => {
                  const editedDetails = {
                    ...profileStore.profile,
                    username : username,
                    interests : profileStore.profile?.interests.toString(),
                    image : profileImageFile
                  }
                  console.log(editedDetails)
                  profileStore.UpdateProfile(editedDetails)
                  .then((res)=>{
                     console.log(res)
                     showNotification({
                      title:"Profile Details Updated",
                      message : "",
                      autoClose: 2500,
                      color: 'green'
                     })
                     navigate({
                      pathname: "/profile",
                      search: `${createSearchParams({
                        user: `${stores.profileStore.profile?.username}`,
                      })}`,
                    });
                    stores.appStore.setNavigationState(4);
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
