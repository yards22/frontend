import { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  filterAList,
  findIndex,
  findTheElement,
  MInterest,
} from "../../../../Atoms/Util";
import { InternationalTeamList } from "../../../../Data/Static/Interests";
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
  overflow: hidden;
`;

interface EditProfileIndexModalProps {
  profileInfo: MProfile | null;
  handleCloseTheEditModal: () => void;
}

function EditProfileModalIndex(props: EditProfileIndexModalProps) {
  const [currentEditPage, setCurrentEditPage] = useState(1);
  const [bio, setBio] = useState("");
  const [username, setUserName] = useState("");
  const [profileImageUri, setProfileImageUri] = useState("");
  const [interests, setInterests] = useState("");
  const [interestsArray, setInterestsArray] = useState<string[]>([]);
  const store = useStores();
  const navigator = useNavigate();
  const [internationalTeams, setInternationalTeams] = useState<MInterest[]>([]);

  useEffect(() => {
    if (props.profileInfo?.bio) {
      setBio(props.profileInfo?.bio);
    }
    if (props.profileInfo?.username) {
      setUserName(props.profileInfo?.username);
    }
    if (props.profileInfo?.interests) {
      // setInterests(props.profileInfo.interests);
      // setInterestsArray(props.profileInfo.interests.split(","));
    }
    if (props.profileInfo?.profile_image_uri) {
      setProfileImageUri(props.profileInfo?.profile_image_uri);
    }
    // let x = InternationalTeamList;
    console.log(InternationalTeamList);
    setInternationalTeams([...InternationalTeamList]);
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

  const handleAddInterestToArray = (interest: string) => {
    let w = interestsArray;
    interestsArray.push(interest);
    setInterestsArray([...w]);
  };

  const handleSubmitNewUserDetails = (interestsString: string) => {
    if (store.authStore.isNewUser) {
      store.authStore.SetIsNewUser(false);
    }
    props.handleCloseTheEditModal();
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

  //Handling Interest Suggestions
  function handleIntTeamAdd(interest: string) {
    console.log(interest);
  }

  function handleIntTeamRemove(element: MInterest) {
    // console.log("gy",element)
    // let w = filterAList({element,array: internationalTeams})
    let w = findIndex({ element, array: internationalTeams });
    let x = [...internationalTeams];
    x[w].disable = true;
    setInternationalTeams(x);
  }

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
          handleAddInterestToArray={handleAddInterestToArray}
          interestsArray={interestsArray}
          internationalTeamsList={internationalTeams}
          handleIntTeamAdd={handleIntTeamAdd}
          handleIntTeamRemove={handleIntTeamRemove}
        />
      )}
    </SEditProfileModalIndex>
  );
}

export default EditProfileModalIndex;
