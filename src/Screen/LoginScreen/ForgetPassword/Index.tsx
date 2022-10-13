import { TextInput, Button, NumberInput, Alert } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
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
                    onClick={() => {
                      authStore
                        .SendForgotPasswordOTP(data.mail_id)
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
                    }}
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
                  disabled={!(data.otp.length === (OTP_LENGTH || 6))}
                  loading={authStore.isLoading}
                  onClick={() => {
                    authStore
                      .VerifyForgotPasswordOTP(data.mail_id, data.otp)
                      .then(() => {
                        setErrorText("");
                        setStage(1);
                      })
                      .catch((err) => {
                        setErrorText(err.message);
                      });
                  }}
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
                <h3>Set New Password</h3>
                <TextInput
                  withAsterisk
                  style={{ width: "100%", marginRight: "10px" }}
                  label="Password"
                  placeholder="Enter password"
                  onChange={(e) => {
                    setData((p) => {
                      return { ...p, password: e.target.value };
                    });
                  }}
                />
                <TextInput
                  withAsterisk
                  style={{ width: "100%", marginRight: "10px" }}
                  label="Confirm Password"
                  placeholder="Enter password again"
                  onChange={(e) => {
                    setData((p) => {
                      return { ...p, confirmPassword: e.target.value };
                    });
                  }}
                />
                {data.password.length >= (MIN_PASSWORD_LEN || 8) &&
                  data.confirmPassword.length >= (MIN_PASSWORD_LEN || 8) &&
                  data.password !== data.confirmPassword && (
                    <p style={{ fontSize: "small", color: "red" }}>
                      Password Mismatch.
                    </p>
                  )}
                <Button
                  disabled={
                    data.password.length < (MIN_PASSWORD_LEN || 8) ||
                    data.confirmPassword.length < (MIN_PASSWORD_LEN || 8) ||
                    (data.password.length >= (MIN_PASSWORD_LEN || 8) &&
                      data.confirmPassword.length >= (MIN_PASSWORD_LEN || 8) &&
                      data.password !== data.confirmPassword)
                  }
                  loading={authStore.isLoading}
                  onClick={() => {
                    authStore
                      .UpdatePassword(
                        data.mail_id,
                        data.confirmPassword,
                        data.otp
                      )
                      .then(() => {
                        props.onClose();
                        navigator({
                          pathname: "/profile",
                          search: `${createSearchParams({
                            user: `${store.profileStore.profile?.username}`,
                          })}`,
                        });
                      })
                      .catch((err) => {
                        setErrorText(err.message);
                      });
                  }}
                  style={{
                    marginTop: "20px",
                    marginBottom: "10px",
                    display: "block",
                    width: "100%",
                  }}
                >
                  Reset Password
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
