import { Button, Input, Textarea ,Text} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useStores } from "../../../../../Logic/Providers/StoresProviders";
import ProfilePhoto from "../../ProfilePhoto";

const SEditPageOne = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

interface EditPageOneProps {
  profilePhotoUri: any;
  bio: string | null | undefined;
  username: string | undefined;
  handleChangeTheCurrentPage(): void;
  handleChangeEditPageOneDetails(a: any): void;
}

const fileToDataUri = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });

function EditPageOne(props: EditPageOneProps) {
  const [profileImageUri, setProfilePicUri] = useState<any>(null);
  const [profilePic, setProfilePic] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUserName] = useState("");
  const [userNameError, setUserNameError ] = useState("")
  const editProfilePicRef: any = useRef(null);
  const stores = useStores();

  useEffect(() => {
    if (props.bio) setBio(props.bio);
    if (props.profilePhotoUri) {
      setProfilePic(props.profilePhotoUri);
      setProfilePicUri(props.profilePhotoUri);
    }
    if (props.username) setUserName(props.username);
  }, [props]);

  function handleProfilePicChangeClick() {
    editProfilePicRef.current.click();
  }

  function handleProfilePicChange(e: any) {
    setProfilePic(URL.createObjectURL(e.target.files[0]));
    setProfilePicUri(e.target.files[0]);
    // fileToDataUri(e.target.files[0])
    //   .then(dataUri => {
    //     setProfilePicUri(dataUri)
    // })
  }

  async function handleFocusOutUserNameField() {
    if(username !== stores.profileStore.profile?.username && stores.authStore.token){
      stores.profileStore.CheckUserNameAvailability({username,token :stores.authStore.token})
      .then((res)=>{
        console.log("username check response",res)
        if(res === 200){
          setUserNameError("Try Other UserName")
        }else{
          setUserNameError("")
        }
      })
    }else{
      setUserNameError("")
    }
  }

  const handleMoveToEditPageTwo = () => {
    if(userNameError ==="" && stores.authStore.token){
      stores.profileStore.CheckUserNameAvailability({username,token :stores.authStore.token})
      .then((res)=>{
        console.log("username check response",res)
        if(res === 200){
          setUserNameError("Try Other UserName")
        }else{
          props.handleChangeEditPageOneDetails({ bio, username, profileImageUri });
        }
      })
    }
  };

  return (
    <SEditPageOne>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          padding: "0px 15px",
          marginBottom: "20px",
        }}
      >
        <ProfilePhoto profileImageUri={profilePic} userName={username} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "column",
          }}
        >
          <Button onClick={handleProfilePicChangeClick}>Choose Image</Button>
          <input
            type={"file"}
            accept="image/*"
            ref={editProfilePicRef}
            style={{
              display: "none",
            }}
            onChange={handleProfilePicChange}
          />
          <Button
            onClick={() => {
              setProfilePic("");
            }}
            color={"red"}
          >
            Remove Profile Pic
          </Button>
        </div>
      </div>
      <div
        style={{
          width: "100%",
        }}
      >
        UserName
        <Input
          width={"100%"}
          onBlur={handleFocusOutUserNameField}
          type="text"
          defaultValue={username}
          onChange={(e: any) => {
            setUserName(e.target.value);
          }}
        />
        <Text color={"red"} mt={3} size="xs">{userNameError}</Text>
      </div>
      <div
        style={{
          width: "100%",
          marginTop: "20px",
        }}
      >
        Bio
        <Textarea
          defaultValue={bio}
          onChange={(e: any) => {
            setBio(e.target.value);
          }}
        />
      </div>
      <Button
        style={{
          position: "absolute",
          bottom: "5px",
          right: "5px",
        }}
        onClick={handleMoveToEditPageTwo}
      >
        Next
      </Button>
    </SEditPageOne>
  );
}

export default EditPageOne;
