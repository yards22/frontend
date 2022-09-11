import { TextInput, Button, Modal } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import React, { useState } from "react";
import { IconEye, IconEyeOff } from "../../Atoms/Icons";
import IconWrapper from "../../Atoms/IconWrapper";
import { useStores } from "../../Logic/Providers/StoresProviders";
import { ValidateEmail } from "../../Logic/Utils/Validation";
import ForgotPassword from "./ForgetPassword/Index";
function EmailPasswordLogin() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const store = useStores();
  return (
    <Observer>
      {() => {
        const { authStore } = store;
        return (
          <>
            <TextInput
              placeholder="Enter email address of username"
              style={{ width: "100%", marginTop: "20px" }}
              label="Email address or username"
              type={"email"}
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
                    <IconWrapper>
                      {showPassword ? IconEyeOff : IconEye}
                    </IconWrapper>
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
              onClick={() => {
                setForgotPasswordModal(true);
              }}
            >
              Forgot password?
            </Button>
            <Modal
              title="Forgot Password"
              centered
              transition="fade"
              transitionDuration={600}
              transitionTimingFunction="ease"
              overlayOpacity={0.55}
              overlayBlur={3}
              opened={forgotPasswordModal}
              onClose={() => {
                setForgotPasswordModal(false);
              }}
            >
              <ForgotPassword />
            </Modal>
            <Button
              disabled={
                credentials.email.length === 0 ||
                credentials.password.length === 0 ||
                !ValidateEmail(credentials.email)
              }
              style={{
                marginTop: "20px",
                marginBottom: "10px",
                display: "block",
                width: "100%",
              }}
              onClick={() => {
                authStore.LoginUser(credentials.email, credentials.password);
              }}
            >
              Sign In
            </Button>
          </>
        );
      }}
    </Observer>
  );
}

export default EmailPasswordLogin;
