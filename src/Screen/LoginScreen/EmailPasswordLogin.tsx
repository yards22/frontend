import { TextInput, Button } from "@mantine/core";
import React, { useState } from "react";
import { IconEye, IconEyeOff } from "../../Atoms/Icons";
import IconWrapper from "../../Atoms/IconWrapper";

function EmailPasswordLogin() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <TextInput
        placeholder="Enter email address of username"
        style={{ width: "100%", marginTop: "20px" }}
        label="Email address or username"
        onChange={(e) => {
          setCredentials((p) => {
            return { ...p, email: e.target.value };
          });
        }}
      />
      <TextInput
        placeholder="Enter password"
        type={showPassword ? "text" : "password"}
        rightSection={
          credentials.password.length > 0 && (
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                setShowPassword((p) => !p);
              }}
            >
              <IconWrapper>{showPassword ? IconEyeOff : IconEye}</IconWrapper>
            </div>
          )
        }
        style={{ width: "100%", marginTop: "20px" }}
        label="Password"
        onChange={(e) => {
          setCredentials((p) => {
            return { ...p, password: e.target.value };
          });
        }}
      />
      <Button
        variant="subtle"
        compact
        style={{
          margin: "5px",
        }}
      >
        Forgot password?
      </Button>
      <Button
        disabled={
          credentials.email.length === 0 || credentials.password.length === 0
        }
        style={{
          marginTop: "20px",
          marginBottom: "10px",
          display: "block",
          width: "100%",
        }}
      >
        Sign in
      </Button>
    </>
  );
}

export default EmailPasswordLogin;
