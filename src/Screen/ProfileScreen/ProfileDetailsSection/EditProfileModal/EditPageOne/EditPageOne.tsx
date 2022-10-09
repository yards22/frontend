import { Button, Input, Textarea } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components"
import ProfilePhoto from "../../ProfilePhoto";

const SEditPageOne = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
`;

interface EditPageOneProps{
  profilePhotoUri : any,
  bio : string | null | undefined,
  username : string | undefined,
  handleChangeTheCurrentPage (): void,
  handleChangeEditPageOneDetails (a : any) : void
}

const fileToDataUri = (file:File) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = (event:any) => {
    resolve(event.target.result)
  };
  reader.readAsDataURL(file);
  })

function EditPageOne(props:EditPageOneProps) {
  const [profileImageUri,setProfilePicUri] = useState<any>(null)
  const [profilePic,setProfilePic] = useState("")
  const [bio,setBio] = useState("")
  const [username,setUserName] = useState("");
  const editProfilePicRef:any = useRef(null);

  useEffect(()=>{
    if(props.bio) setBio(props.bio);
    if(props.profilePhotoUri){
      setProfilePic(props.profilePhotoUri)
      setProfilePicUri(props.profilePhotoUri)
    }
    if(props.username) setUserName(props.username)
  },[props])

  function handleProfilePicChangeClick(){
    editProfilePicRef.current.click()
  }

  function handleProfilePicChange(e:any){
     setProfilePic(URL.createObjectURL(e.target.files[0]))
     setProfilePicUri(e.target.files[0])
    // fileToDataUri(e.target.files[0])
    //   .then(dataUri => {
    //     setProfilePicUri(dataUri)
    // })
  }

  function handleFocusOutUserNameField(){
    //API CALL TO VERIFY WHETHER USERNAME IS PRESENT OR NOT
    console.log("gyg")
  }

  const handleMoveToEditPageTwo = () =>{
     props.handleChangeEditPageOneDetails({bio,username,profileImageUri})
  }
  
  return (
    <SEditPageOne>
         <div 
             style={{
                width : "100%",
                display: "flex",
                justifyContent : "space-around",
                padding: "0px 15px",
                marginBottom : "20px"
             }}>
              
                  <ProfilePhoto 
                      profileImageUri={profilePic} 
                      userName={username}
                    />
          
             <div style={{
                display: "flex",
                justifyContent : "space-around",
                flexDirection : "column",
             }}>
               <Button 
                 onClick={handleProfilePicChangeClick}
               >
                Choose Image
               </Button>
               <input 
                  type={"file"} 
                  accept="image/*" 
                  ref={editProfilePicRef} 
                  style={{
                    display: "none"
                  }}
                  onChange={handleProfilePicChange}
               />
               <Button 
                 onClick={()=>{
                    setProfilePic("")
                   
                 }}
                 color={"red"}
                >Remove Profile Pic</Button>
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
              onChange={(e:any)=>{
                setUserName(e.target.value)
              }}
            />
         </div>
         <div
            style={{
                width: "100%",
                marginTop : "20px"
            }}
         >  
            Bio
            <Textarea 
                defaultValue={bio}
                onChange={(e:any)=>{
                  setBio(e.target.value)
                }}
            />
         </div>
         <Button
              style={{
                position: "absolute",
                bottom: "5px",
                right: "5px"
              }}
              onClick = {handleMoveToEditPageTwo}
            >
              Next
           </Button>
    </SEditPageOne>
  )
}

export default EditPageOne