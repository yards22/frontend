import { TextInput, Button } from "@mantine/core";
import { useInterval, useTimeout } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { IconEyeOff, IconEye } from "../../Atoms/Icons";
import IconWrapper from "../../Atoms/IconWrapper";

function NewAccount() {
  const [newAccountData, setNewAccountData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [signUpSM, setSignUpSM] = useState(0);
  const [buttonName, setButtonName] = useState("Send OTP");
  return (
    <div style={{ display: "flex", padding: "10px", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <TextInput
          placeholder="someone@email.com"
          style={{ width: "100%", marginRight: "10px" }}
          label="Email Address"
          onChange={(e) => {
            setNewAccountData((p) => {
              return { ...p, email: e.target.value };
            });
          }}
        />

        <Button
          disabled={buttonName !== "Send OTP"}
          style={{
            width: "fit-content",
            minWidth: "150px",
          }}
          onClick={() => {
            setSignUpSM(1);
            let i = 10;
            setButtonName(`Resend in ${i}s.`);
            const timeout = setInterval(() => {
              i--;
              if (i == 0) {
                setButtonName("Send OTP");
                clearInterval(timeout);
              } else {
                setButtonName(`Resend in ${i}s.`);
              }
            }, 1000);
          }}
        >
          {buttonName}
        </Button>
      </div>

      {signUpSM > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <TextInput
            placeholder="Ex: 4923"
            style={{ width: "100%", marginRight: "10px" }}
            label="OTP"
            onChange={(e) => {
              setNewAccountData((p) => {
                return { ...p, email: e.target.value };
              });
            }}
          />
          <Button
            style={{
              width: "fit-content",
            }}
            onClick={() => {
              setSignUpSM(2);
            }}
          >
            Verify OTP
          </Button>
          <Button
            variant="light"
            style={{
              width: "fit-content",
              marginLeft: "10px",
            }}
            onClick={() => {
              setSignUpSM(2);
            }}
          >
            Resend
          </Button>
        </div>
      )}
      {signUpSM > 1 && (
        <>
          <TextInput
            placeholder="Enter password"
            style={{ width: "100%", marginTop: "20px" }}
            label="Password"
            onChange={(e) => {
              setNewAccountData((p) => {
                return { ...p, password: e.target.value };
              });
            }}
          />
          <TextInput
            placeholder="Enter password again"
            style={{ width: "100%", marginTop: "20px" }}
            label="Confirm Password"
            onChange={(e) => {
              setNewAccountData((p) => {
                return { ...p, confirmPassword: e.target.value };
              });
            }}
          />
        </>
      )}
      <Button
        variant="subtle"
        compact
        style={{
          width: "fit-content",
          margin: "5px 0",
        }}
      >
        adsf
      </Button>
      <Button
        style={{
          marginTop: "20px",
          marginBottom: "10px",
          display: "block",
          width: "100%",
        }}
      >
        Sign in
      </Button>
    </div>
  );
}

export default NewAccount;
