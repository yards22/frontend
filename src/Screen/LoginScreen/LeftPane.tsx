import { Anchor, Card, Center, Modal } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DontHaveAnAccount from "./DontHaveAnAccount";
import EmailPasswordLogin from "./EmailPasswordLogin";
import NewAccount from "./NewAccount/Index";
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

interface ILeftPane{
  r : string|null,
  p : string|null
}
function LeftPane(props:ILeftPane) {
  const [newAccountModal, setNewAccountModal] = useState(false);
  return (
    <SLeftPane>
      <h1 className="my-4 font-semibold text-gray-700">22 Yardz</h1>
      <span
        style={{ opacity: "0.6", marginBottom: "30px", textAlign: "center" }}
      >
        Cricket mainz one step away. Login to get started now.
      </span>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "300px"
        }}
      >
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <SignInWithGoogle r={props.r} p={props.p}/>
          <OrLabel />
          <EmailPasswordLogin r={props.r} p={props.p}/>
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
              r={props.r} p={props.p}
            />
          </Modal>
        </Card>

        <span
          style={{ marginTop: "30px", fontSize: "12px", maxWidth: "300px" }}
        >
          By signing up, you agree to the
          <Link to={"/terms-and-conditions"}>
            <Anchor> Terms of Service </Anchor>
          </Link>
          and
          <Link to={"/privacy-policy"}>
            <Anchor> Privacy Policy</Anchor>
          </Link>
          .
        </span>
      </div>
    </SLeftPane>
  );
}

export default LeftPane;
