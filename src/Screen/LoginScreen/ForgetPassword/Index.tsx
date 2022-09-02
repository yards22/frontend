import { useState } from "react";
import EmailAndOTP from "./EmailAndOTP";
import PasswordInput from "./PasswordInput";

function NewAccount() {
  const [stage, setStage] = useState(0);
  return (
    <>
      {stage == 0 && (
        <EmailAndOTP
          onVerified={() => {
            setStage(1);
          }}
        />
      )}
      {stage == 1 && <PasswordInput />}
    </>
  );
}

export default NewAccount;
