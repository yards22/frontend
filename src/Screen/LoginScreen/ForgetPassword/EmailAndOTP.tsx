import { TextInput, Button, NumberInput } from "@mantine/core";
import React, { useState } from "react";
import { ValidateEmail } from "../../../Logic/Utils/Validation";
const OTP_SEND_TIMEOUT = 10;
interface EmailAndOTPProps {
  otpLength?: number;
  onVerified: () => void;
}
function EmailAndOTP(props: EmailAndOTPProps) {
  const [data, setData] = useState({
    email: "",
    otp: "",
  });
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
          withAsterisk
          type={"email"}
          placeholder="Enter email or username"
          style={{ width: "100%", marginRight: "10px" }}
          label="Email Address Or Username"
          onChange={(e) => {
            setData((p) => {
              return { ...p, email: e.target.value };
            });
          }}
        />

        <Button
          disabled={
            !ValidateEmail(data.email) || !buttonName.includes("end OTP")
          }
          style={{
            width: "fit-content",
            minWidth: "150px",
          }}
          onClick={() => {
            let i = OTP_SEND_TIMEOUT;
            setButtonName(`Resend in ${i}s.`);
            const timeout = setInterval(() => {
              i--;
              if (i == 0) {
                clearInterval(timeout);
                setButtonName("Resend OTP");
              } else {
                setButtonName(`Resend in ${i}s.`);
              }
            }, 1000);
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
            maxLength={props.otpLength || 6}
            withAsterisk
            hideControls
            placeholder="Enter OTP"
            style={{ width: "100%", marginRight: "10px" }}
            label="One Time Password (OTP)"
            description={`A ${
              props.otpLength || 6
            } digit OTP has been sen't to your email.`}
            onChange={(e) => {
              setData((p) => {
                return { ...p, otp: e + "" };
              });
            }}
          />
        </div>
      )}
      <Button
        disabled={!(data.otp.length == (props.otpLength || 6))}
        onClick={() => {
          props.onVerified();
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
}

export default EmailAndOTP;
