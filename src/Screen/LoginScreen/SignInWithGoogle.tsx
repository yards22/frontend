import React, { useEffect, useRef, useState } from "react";
import { useStores } from "../../Logic/Providers/StoresProviders";
import { Request } from "../../Logic/Utils/Fetch";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
const CLIENT_ID =
  "442538559529-bm10qpqtcg3k06rrgnc4i0pqnc3fee4s.apps.googleusercontent.com";

function SignInWithGoogle() {
  const [idToken, setIdToken] = useState<null | string>(null);
  const googleButton = useRef(null);
  const store = useStores();

  useEffect(() => {
    if (idToken == null) return;
    new Request({})
      .Post("http://localhost:4000/auth/oauth", {
        id_token: idToken,
      })
      .then(() => {
        console.log("sent id token");
        return <Outlet/>
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idToken]);

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Observer>
        {() => {
          const { appStore } = store;
          return (
            <GoogleLogin
              size="large"
              width="300px"
              theme={appStore.theme == "dark" ? "filled_blue" : "outline"}
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse.credential);
                setIdToken(credentialResponse.credential || null);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          );
        }}
      </Observer>
    </GoogleOAuthProvider>
  );
}

export default SignInWithGoogle;
