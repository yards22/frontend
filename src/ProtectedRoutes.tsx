import { useEffect, useState } from "react";
import React from "react";
import { Loader } from "@mantine/core";
import { useStores } from "./Logic/Providers/StoresProviders";
import { createSearchParams, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const AUTH_INITIAL = 0;
const CHECKING_AUTH = 1;
const CHECKED_AUTH_LOGGED_IN = 2;

interface ProtectedRoutesProps {}

function ProtectedRoutes(props: ProtectedRoutesProps) {
  const [authStage, setAuthStage] = useState(CHECKING_AUTH);
  const [nextRouteRef,setNextRouteRef] = useState("")
  const store = useStores();
  const location = useLocation();
  const navigate = useNavigate()
  
  useEffect(() => {
    if (
      !store.authStore.user &&
      (store.authStore.token == null || store.authStore.token === "")
    ) { 
      console.log(location.pathname+location.search) 
      let r = location.pathname.slice(1);
      console.log(r)
      let p = location.search.slice(1);
      console.log(p)
      setAuthStage(AUTH_INITIAL);
      let pathParams = {}
      if(p){
        pathParams = {r,p}
      }else{
        pathParams = {r}
      }
      navigate({
        pathname : "/",
        search : `${createSearchParams(pathParams)}`
      })
    }
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
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader size={"sm"} />
      </section>
    );
  }
  return <Outlet />;
}
export default ProtectedRoutes;
