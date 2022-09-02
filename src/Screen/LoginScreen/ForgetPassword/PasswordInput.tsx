import { TextInput, Button, NumberInput } from "@mantine/core";
import React, { useState } from "react";
interface PasswordInputProps {
  minPasswordLength?: number;
}
function PasswordInput(props: PasswordInputProps) {
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });
  return (
    <div style={{ display: "flex", padding: "10px", flexDirection: "column" }}>
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
      {data.password.length >= (props.minPasswordLength || 8) &&
        data.confirmPassword.length >= (props.minPasswordLength || 8) &&
        data.password !== data.confirmPassword && (
          <p style={{ fontSize: "small", color: "red" }}>Password Mismatch.</p>
        )}
      <Button
        disabled={
          data.password.length < (props.minPasswordLength || 8) ||
          data.confirmPassword.length < (props.minPasswordLength || 8) ||
          (data.password.length >= (props.minPasswordLength || 8) &&
            data.confirmPassword.length >= (props.minPasswordLength || 8) &&
            data.password !== data.confirmPassword)
        }
        onClick={() => {}}
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
}

export default PasswordInput;
