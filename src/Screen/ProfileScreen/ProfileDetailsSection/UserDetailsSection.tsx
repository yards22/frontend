import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Modal, Menu, Center } from "@mantine/core";
import IconWrapper from "../../../Atoms/IconWrapper";
import { IconPencil } from "../../../Atoms/Icons";
import { Observer } from "mobx-react-lite";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import EditProfileModalIndex from "./EditProfileModal/Index";
import { MoreVertical , Trash2 } from "react-feather"


const SUserDetailsSection = styled.div`
  padding: 0px 15px 20px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;


const SSubContainer = styled.div`
  min-width: 40px;
  width: 30%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
`

function UserDetailsSection() {
  const [editProfileModal, setEditProfileModal] = useState(false);
  const store = useStores();

  useEffect(()=>{
    setEditProfileModal(false)
  },[store.profileStore.profile])
  return (
    <Observer>
      {() => {
        const { profileStore } = store;
        return (
          <SUserDetailsSection>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2 style={{ margin: "0px" }}>
                {profileStore.profile?.username}
              </h2>
              <p style={{ margin: "0px" }}>{profileStore.profile?.email_id}</p>
            </div>
            <div
              style={{
                minWidth : "150px",
                width : "95%",
                display : "flex",
                justifyContent : "center"           
              }}
            >
              <SSubContainer>
                 <h3 style={{margin: "0px"}}>600</h3>
                 <p style={{margin: "0px"}}>Following</p>
              </SSubContainer>
              <SSubContainer>
                 <h3 style={{margin: "0px"}}>600</h3>
                 <p style={{margin: "0px"}}>Following</p>
              </SSubContainer>
              <SSubContainer>
                 <h3 style={{margin: "0px"}}>{profileStore?.profile?.cric_index}</h3>
                 <p style={{margin: "0px"}}>Cric-Index</p>
              </SSubContainer>
            </div>
            <div
              style={{
                minWidth : "150px",
                width : "90%",
                display : "flex",
                justifyContent : "center" ,
                marginTop : "15px",
              }}
            >
              <Button
                variant="outline"
                fullWidth
                rightIcon={<IconWrapper>{IconPencil}</IconWrapper>}
                onClick={() => {
                  setEditProfileModal(true);
                }}
              >
                Edit Profile
              </Button>
              <Modal
                size={"450px"}
                title="Profile Edit"
                centered
                transition="fade"
                transitionDuration={600}
                transitionTimingFunction="ease"
                overlayOpacity={0.55}
                overlayBlur={3}
                opened={editProfileModal}
                onClose={() => {
                  setEditProfileModal(false);
                }}
                overflow="inside"
              >
                 <EditProfileModalIndex profileInfo={profileStore.profile}/>
              </Modal>
              <Menu shadow="md" width={200}>
                 <Menu.Target>
                    <Center>
                      <MoreVertical 
                        style={{
                          border : "1px solid gray",
                          height : "35px",
                          paddingTop : "5px",
                          paddingBottom : "5px",
                          width : "30px",
                          borderRadius : "5px",
                          marginLeft : "8px",
                          cursor : "pointer",
                        }}
                      />
                    </Center>
                 </Menu.Target>
                 <Menu.Dropdown>
                    <Menu.Item color="red" icon={<Trash2 size={20}/>}>Delete my account</Menu.Item>
                 </Menu.Dropdown>
              </Menu>
            </div>
          </SUserDetailsSection>
        );
      }}
    </Observer>
  );
}

export default UserDetailsSection;
