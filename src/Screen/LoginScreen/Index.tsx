import { Loader } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { useStores } from "../../Logic/Providers/StoresProviders";
import LeftPane from "./LeftPane";
import RightPane from "./RightPane";

const SLoginIndex = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  position: fixed;
  top: 0px;
`;

const AUTH_INITIAL = 0;
const CHECKING_AUTH = 1;
const CHECKED_AUTH_LOGGED_IN = 2;

function LoginIndex() {
  const [authStage, setAuthStage] = useState(CHECKING_AUTH);
  const store = useStores();
  useEffect(() => {
    if (
      !store.authStore.user &&
      (store.authStore.token == null || store.authStore.token === "")
    )
      setAuthStage(AUTH_INITIAL);
    else if (store.authStore.token) {
      // check if logged in using token
      setAuthStage(CHECKING_AUTH);
      store.authStore
        .CheckIfLogin()
        .then(() => {
          setAuthStage(CHECKED_AUTH_LOGGED_IN);
        })
        .catch((err) => {
          setAuthStage(AUTH_INITIAL);
        });
    }
  }, []);
  useEffect(() => {
    if (store.authStore.token) {
      store.authStore
        .CheckIfLogin()
        .then(() => {
          setAuthStage(CHECKED_AUTH_LOGGED_IN);
        })
        .catch((err) => {});
    }
  }, []);

  if (authStage === CHECKING_AUTH) {
    return (
      <section
        style={{
          height: "100vh",
          width: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader variant="bars" size={"sm"} />
      </section>
    );
  } else if (authStage === CHECKED_AUTH_LOGGED_IN)
    return <Navigate to="/profile" />;

  return (
    <SLoginIndex>
      <LeftPane />
      {!store.appStore.isPhone && <RightPane />}
    </SLoginIndex>
  );
}

export default LoginIndex;
