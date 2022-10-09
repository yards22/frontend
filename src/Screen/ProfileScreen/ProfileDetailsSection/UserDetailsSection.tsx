import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Modal } from "@mantine/core";
import IconWrapper from "../../../Atoms/IconWrapper";
import { IconPencil } from "../../../Atoms/Icons";
import { Observer } from "mobx-react-lite";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import EditProfileModalIndex from "./EditProfileModal/Index";

const SUserDetailsSection = styled.div`
  padding: 0px 15px 20px 15px;
`;

const SEditButtonContainer = styled.div`
  height: 70px;
  display: flex;
  justify-content: end;
  padding-top: 25px;
`;

function UserDetailsSection() {
  const [editProfileModal, setEditProfileModal] = useState(false);
  const store = useStores();

  useEffect(() => {
    setEditProfileModal(false);
  }, [store.profileStore.profile]);
  return (
    <Observer>
      {() => {
        const { profileStore } = store;
        return (
          <SUserDetailsSection>
            <SEditButtonContainer>
              <Button
                variant="outline"
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
                <EditProfileModalIndex profileInfo={profileStore.profile} />
              </Modal>
            </SEditButtonContainer>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3 style={{ margin: "0px" }}>
                {profileStore.profile?.username}
              </h3>
              <p style={{ margin: "0px" }}>{profileStore.profile?.email_id}</p>
              <p style={{ margin: "0px" }}>{profileStore.profile?.bio}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ margin: "0px" }}>Created_At</p>
                <p style={{ margin: "0px" }}>
                  {profileStore.profile?.cric_index}
                </p>
              </div>
              <div></div>
            </div>
          </SUserDetailsSection>
        );
      }}
    </Observer>
  );
}

export default UserDetailsSection;
