import { Anchor, Button, Card, Title } from "@mantine/core";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { IconGoogle } from "../../Atoms/Icons";
import IconWrapper from "../../Atoms/IconWrapper";
import DontHaveAnAccount from "./DontHaveAnAccount";
import EmailPasswordLogin from "./EmailPasswordLogin";
import OrLabel from "./OrLabel";

const SLeftPane = styled.section`
  width: 50%;
  padding: 40px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 700px) {
    width: 100%;
  }
`;
function LeftPane() {
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
        <Button
          style={{
            margin: "30px 0",
            width: "100%",
          }}
          leftIcon={<IconWrapper>{IconGoogle}</IconWrapper>}
          variant="default"
        >
          Log in with Google
        </Button>
        <OrLabel />
        <EmailPasswordLogin />
        <DontHaveAnAccount />
        <span style={{ fontSize: "12px", maxWidth: "300px" }}>
          By signing up, you agree to the
          <Link href={"/tos"} passHref>
            <Anchor> Terms of Service </Anchor>
          </Link>
          and
          <Link href={"pp"} passHref>
            <Anchor> Privacy Policy</Anchor>
          </Link>
          .
        </span>
      </div>
    </SLeftPane>
  );
}

export default LeftPane;
