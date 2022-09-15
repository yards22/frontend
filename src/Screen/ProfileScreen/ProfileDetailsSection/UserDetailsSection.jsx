import React, { useState } from "react";
import styled from "styled-components";
import { Button, Modal } from "@mantine/core";
import IconWrapper from "../../../Atoms/IconWrapper";
import { IconPencil } from "../../../Atoms/Icons";

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
          size={"500px"}
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
          <div style={{ minHeight: "70vh" }}></div>
        </Modal>
      </SEditButtonContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3 style={{ margin: "0px" }}>Username</h3>
        <p style={{ margin: "0px" }}>MailID</p>
        <p style={{ margin: "0px" }}>BIO</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p style={{ margin: "0px" }}>Created_At</p>
          <p style={{ margin: "0px" }}>CRIC INDEX</p>
        </div>
        <div></div>
      </div>
    </SUserDetailsSection>
  );
}

export default UserDetailsSection;
