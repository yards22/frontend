import { TextInput, Button, NumberInput, Alert } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconEyeOff, IconEye } from "../../../Atoms/Icons";
import IconWrapper from "../../../Atoms/IconWrapper";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import { ValidateEmail } from "../../../Logic/Utils/Validation";
const OTP_SEND_TIMEOUT = 10;
const OTP_LENGTH = 4;
const MIN_PASSWORD_LEN = 8;

interface NewAccountProps {
  onClose: () => void;
}

function NewAccount(props: NewAccountProps) {
  const store = useStores();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfrimPassword, setShowConfrimPassword] = useState(false);
  const [buttonName, setButtonName] = useState("Send OTP");
  const [stage, setStage] = useState(0);
  const [errorText, setErrorText] = useState("");
  const [data, setData] = useState<{
    mail_id: string;
    password: string;
    confirmPassword: string;
    otp: string;
  }>({
    mail_id: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const navigator = useNavigate();

  async function handleRouteToProfile() {
    const profile = await store.profileStore.GetProfile(null, null);
    store.profileStore.SetViewProfile(profile);
    navigator("/profile");
    store.appStore.setNavigationState(4);
  }

  function handleSendOTPClick() {
    store.authStore
      .SendSignUpOTP(data.mail_id)
      .then(() => {
        setErrorText("");
        let i = OTP_SEND_TIMEOUT;
        setButtonName(`Resend in ${i}s.`);
        const timeout = setInterval(() => {
          i--;
          if (i === 0) {
            clearInterval(timeout);
            setButtonName("Resend OTP");
          } else {
            setButtonName(`Resend in ${i}s.`);
          }
        }, 1000);
      })
      .catch((err) => {
        setErrorText(err.message);
      });
  }

  function handleVerifyTheOTP() {
    store.authStore
      .VerifySignUpOTP(data.mail_id, data.otp)
      .then(() => {
        setErrorText("");
        setStage(1);
      })
      .catch((err) => {
        setErrorText(err.message);
      });
  }

  function handleSignUp() {
    store.authStore
      .SignUpUser(data.mail_id, data.confirmPassword, data.otp)
      .then(() => {
        props.onClose();
        handleRouteToProfile();
      })
      .catch((err) => {
        setErrorText(err.message);
      });
  }

  return (
    <>
      {stage === 0 && (
        <Observer>
          {() => {
            const { authStore } = store;
            return (
              <div
                style={{
                  display: "flex",
                  padding: "10px",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}
                >
                  <TextInput
                    withAsterisk
                    type={"email"}
                    placeholder="someone@email.com"
                    style={{ width: "100%", marginRight: "10px" }}
                    label="Email Address"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendOTPClick();
                      }
                    }}
                    onChange={(e) => {
                      setData((p) => {
                        return { ...p, mail_id: e.target.value };
                      });
                    }}
                  />
                  <Button
                    disabled={
                      !ValidateEmail(data.mail_id) ||
                      !buttonName.includes("end OTP")
                    }
                    style={{
                      width: "fit-content",
                      minWidth: "150px",
                    }}
                    onClick={handleSendOTPClick}
                  >
                    {buttonName}
                  </Button>
                </div>
                {buttonName.includes("Resend") && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-end",
                    }}
                  >
                    <NumberInput
                      maxLength={OTP_LENGTH || 6}
                      withAsterisk
                      hideControls
                      placeholder="Enter OTP"
                      style={{ width: "100%", marginRight: "10px" }}
                      label="One Time Password (OTP)"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleVerifyTheOTP();
                        }
                      }}
                      description={`A ${
                        OTP_LENGTH || 6
                      } digit OTP has been sen't to your email.`}
                      onChange={(e) => {
                        setData((p) => {
                          return { ...p, otp: e + "" };
                        });
                      }}
                    />
                  </div>
                )}
                {errorText !== "" && (
                  <Alert style={{ marginTop: "20px" }} color={"red"}>
                    {errorText}
                  </Alert>
                )}
                <Button
                  loading={authStore.isLoading}
                  disabled={!(data.otp.length === (OTP_LENGTH || 6))}
                  onClick={handleVerifyTheOTP}
                  style={{
                    marginTop: "20px",
                    marginBottom: "10px",
                    display: "block",
                    width: "100%",
                  }}
                >
                  Verify & Continue
                </Button>
              </div>
            );
          }}
        </Observer>
      )}
      {stage === 1 && (
        <Observer>
          {() => {
            const { authStore } = store;
            return (
              <div
                style={{
                  display: "flex",
                  padding: "10px",
                  flexDirection: "column",
                }}
              >
                <h3>Set Password</h3>
                <TextInput
                  type={showPassword ? "text" : "password"}
                  withAsterisk
                  style={{ width: "100%", marginRight: "10px" }}
                  label="Password"
                  placeholder="Enter password"
                  onChange={(e) => {
                    setData((p) => {
                      return { ...p, password: e.target.value };
                    });
                  }}
                  rightSection={
                    data.password.length > 0 && (
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
                />
                <TextInput
                  type={showConfrimPassword ? "text" : "password"}
                  withAsterisk
                  style={{ width: "100%", marginRight: "10px" }}
                  label="Confirm Password"
                  placeholder="Enter password again"
                  onChange={(e) => {
                    setData((p) => {
                      return { ...p, confirmPassword: e.target.value };
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSignUp();
                    }
                  }}
                  rightSection={
                    data.confirmPassword.length > 0 && (
                      <div
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={() => {
                          setShowConfrimPassword((p) => !p);
                        }}
                      >
                        <IconWrapper>
                          {showConfrimPassword ? IconEyeOff : IconEye}
                        </IconWrapper>
                      </div>
                    )
                  }
                />
                {data.password.length >= (MIN_PASSWORD_LEN || 8) &&
                  data.confirmPassword.length >= (MIN_PASSWORD_LEN || 8) &&
                  data.password !== data.confirmPassword && (
                    <p style={{ fontSize: "small", color: "red" }}>
                      Password Mismatch.
                    </p>
                  )}
                <Button
                  loading={authStore.isLoading}
                  disabled={
                    data.password.length < (MIN_PASSWORD_LEN || 8) ||
                    data.confirmPassword.length < (MIN_PASSWORD_LEN || 8) ||
                    (data.password.length >= (MIN_PASSWORD_LEN || 8) &&
                      data.confirmPassword.length >= (MIN_PASSWORD_LEN || 8) &&
                      data.password !== data.confirmPassword)
                  }
                  onClick={handleSignUp}
                  style={{
                    marginTop: "20px",
                    marginBottom: "10px",
                    display: "block",
                    width: "100%",
                  }}
                >
                  Sign Up
                </Button>
              </div>
            );
          }}
        </Observer>
      )}
    </>
  );
}

export default NewAccount;
