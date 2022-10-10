import { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MProfile } from "../../../../Logic/Model/MProfile";
import { useStores } from "../../../../Logic/Providers/StoresProviders";
import EditPageOne from "./EditPageOne/EditPageOne";
import EditPageTwo from "./EditPageTwo/EditPageTwo";

const SEditProfileModalIndex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 400px;
  padding-bottom: 50px;
  overflow: hidden;
`;

interface EditProfileIndexModalProps {
  profileInfo: MProfile | null;
}

function EditProfileModalIndex(props: EditProfileIndexModalProps) {
  const [currentEditPage, setCurrentEditPage] = useState(1);
  const [bio, setBio] = useState("");
  const [username, setUserName] = useState("");
  const [profileImageUri, setProfileImageUri] = useState("");
  const [interests, setInterests] = useState("");
  const store = useStores();
  const navigator = useNavigate();

  useEffect(() => {
    if (props.profileInfo?.bio) {
      setBio(props.profileInfo?.bio);
    }
    if (props.profileInfo?.username) {
      setUserName(props.profileInfo?.username);
    }
    //  if(props.profileInfo?.interests) setInterests(props.profileInfo.interests)
    if (props.profileInfo?.profile_image_uri) {
      setProfileImageUri(props.profileInfo?.profile_image_uri);
    }
  }, []);

  const handleChangeTheCurrentPage = () => {
    setCurrentEditPage(1);
  };

  const handleChangeEditPageOneDetails = (profileDetails: any) => {
    setBio(profileDetails.bio);
    setUserName(profileDetails.username);
    setProfileImageUri(profileDetails.profileImageUri);
    setCurrentEditPage(2);
  };

  const handleSubmitNewUserDetails = (interestsString: string) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("image", profileImageUri);
    formData.append("bio", bio);
    store.profileStore
      .UpdateProfile({ formData, token: store.authStore.token })
      .then(() => {
        navigator({
          pathname: "/profile",
          search: `${createSearchParams({
            user: `${store.profileStore.profile?.username}`,
          })}`,
        });
      });
  };

  return (
    <SEditProfileModalIndex>
      {currentEditPage === 1 && (
        <EditPageOne
          profilePhotoUri={profileImageUri}
          bio={bio}
          username={username}
          handleChangeTheCurrentPage={handleChangeTheCurrentPage}
          handleChangeEditPageOneDetails={handleChangeEditPageOneDetails}
        />
      )}

      {currentEditPage === 2 && (
        <EditPageTwo
          handleChangeTheCurrentPage={handleChangeTheCurrentPage}
          handleSubmitNewUserDetails={handleSubmitNewUserDetails}
        />
      )}
    </SEditProfileModalIndex>
  );
}

export default EditProfileModalIndex;
