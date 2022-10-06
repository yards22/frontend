import { useEffect, useState } from "react"
import styled from "styled-components"
import { MProfile } from "../../../../Logic/Model/MProfile";
import { useStores } from "../../../../Logic/Providers/StoresProviders";
import EditPageOne from "./EditPageOne/EditPageOne";
import EditPageTwo from "./EditPageTwo/EditPageTwo";

const SEditProfileModalIndex = styled.div`
   width : 100%;
   display : flex;
   flex-direction : column;
   align-items : center;
   position : relative;
   min-height: 400px;
   padding-bottom: 50px;
   overflow: scroll;
`

interface EditProfileIndexModalProps{
   profileInfo : MProfile | null,
}

function EditProfileModalIndex(props: EditProfileIndexModalProps) {
  const [currentEditPage,setCurrentEditPage] = useState(1);
  const [bio , setBio] = useState<string|null|undefined>("");
  const [username , setUserName] = useState<string|undefined>("");
  const [profileImageUri, setProfileImageUri] = useState<any>(null)
  const [interests , setInterests] = useState("");
  const store = useStores();

  useEffect(()=>{
    setBio(props.profileInfo?.bio)
    setUserName(props.profileInfo?.username)
   //  if(props.profileInfo?.interests) setInterests(props.profileInfo.interests)
    setProfileImageUri(props.profileInfo?.profile_image_uri)
  },[])
 
  const handleChangeTheCurrentPage = () =>{
    setCurrentEditPage(1); 
  }

  const handleChangeEditPageOneDetails = (profileDetails:any)=>{
    setBio(profileDetails.bio)
    setUserName(profileDetails.username)
    setProfileImageUri(profileDetails.profileImageUri)
    setCurrentEditPage(2);
  }

  const handleSubmitNewUserDetails = (interestsString : string)=>{
    store.profileStore.UpdateProfile({username , bio, image : profileImageUri , token : store.authStore.token})
  }

  return (
    <SEditProfileModalIndex>
      { currentEditPage === 1 
           && 
         <EditPageOne 
            profilePhotoUri = {profileImageUri}
            bio = {bio}
            username = {username}
            handleChangeTheCurrentPage = {handleChangeTheCurrentPage}
            handleChangeEditPageOneDetails = {handleChangeEditPageOneDetails}
         />
      }
      
      { currentEditPage === 2 &&
         <EditPageTwo 
            handleChangeTheCurrentPage = {handleChangeTheCurrentPage}
            handleSubmitNewUserDetails = {handleSubmitNewUserDetails}
         />}
    </SEditProfileModalIndex>
  )
}

export default EditProfileModalIndex