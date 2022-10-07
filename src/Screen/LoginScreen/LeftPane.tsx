import { Anchor, Button, Card, Modal, Title } from "@mantine/core";
import React, { useState } from "react";
import styled from "styled-components";
import DontHaveAnAccount from "./DontHaveAnAccount";
import EmailPasswordLogin from "./EmailPasswordLogin";
import NewAccount from "./NewAccount/Index";
import ForgotPassword from "./ForgetPassword/Index";
import OrLabel from "./OrLabel";
import SignInWithGoogle from "./SignInWithGoogle";

const SLeftPane = styled.section`
  width: 50%;
  padding: 40px;
  padding-left: 100px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 750px) {
    width: 100%;
    padding-left: 40px;
  }
`;
function LeftPane() {
  const [newAccountModal, setNewAccountModal] = useState(false);
  return (
    <SLeftPane>
      <h1 style={{ fontWeight: "100", margin: "0" }}>Log in</h1>
      <span style={{ opacity: "0.6", marginBottom: "30px" }}>
        Cricket mainz one step away. Login to get started now.
      </span>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "300px",
        }}
      >
        <SignInWithGoogle />
        <OrLabel />
        <EmailPasswordLogin />
        <DontHaveAnAccount
          onSignUpRequest={() => {
            setNewAccountModal(true);
          }}
        />
        <Modal
          title="New Account"
          centered
          transition="fade"
          transitionDuration={600}
          transitionTimingFunction="ease"
          overlayOpacity={0.55}
          overlayBlur={3}
          opened={newAccountModal}
          onClose={() => {
            setNewAccountModal(false);
          }}
        >
          <NewAccount
            onClose={() => {
              setNewAccountModal(false);
            }}
          />
        </Modal>
        <span style={{ fontSize: "12px", maxWidth: "300px" }}>
          By signing up, you agree to the
          <Anchor> Terms of Service </Anchor>
          and
          <Anchor> Privacy Policy</Anchor>.
        </span>
      </div>
    </SLeftPane>
  );
}

export default LeftPane;
