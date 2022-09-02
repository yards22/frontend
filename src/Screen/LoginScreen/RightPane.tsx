import React from "react";
import DarkThemeSwitch from "../../Organs/DarkThemeSwitch";
import NewAccount from "./NewAccount/Index";
import PasswordInput from "./NewAccount/PasswordInput";

function RightPane() {
  return (
    <div>
      <DarkThemeSwitch />
      <NewAccount />
      <PasswordInput />
    </div>
  );
}

export default RightPane;
