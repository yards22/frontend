import { useEffect, useState } from "react";
import React from "react";
import { Loader } from "@mantine/core";
import { useStores } from "./Logic/Providers/StoresProviders";
import { Navigate, Outlet } from "react-router-dom";

const AUTH_INITIAL = 0;
const CHECKING_AUTH = 1;
const CHECKED_AUTH_LOGGED_IN = 2;

interface ProtectedRoutesProps {}

function ProtectedRoutes(props: ProtectedRoutesProps) {
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
  }
  if (authStage === AUTH_INITIAL) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}
export default ProtectedRoutes;
