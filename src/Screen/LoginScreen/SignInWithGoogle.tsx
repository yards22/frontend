import { useStores } from "../../Logic/Providers/StoresProviders";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Observer } from "mobx-react-lite";
import { useState } from "react";
import { Button } from "@mantine/core";
import { createSearchParams, useNavigate } from "react-router-dom";
const CLIENT_ID =
  "442538559529-bm10qpqtcg3k06rrgnc4i0pqnc3fee4s.apps.googleusercontent.com";

function SignInWithGoogle() {
  const [didLoginFailed, setDidLoginFailed] = useState(false);
  const store = useStores();
  const navigator = useNavigate();

  async function handleRouteToProfile(){
     await store.profileStore.GetProfile(store.authStore.token);
     navigator(
        {
          pathname : "/profile",
          search : `${createSearchParams({user : `${store.profileStore.profile?.username}`})}`
       })
       store.appStore.setNavigationState(4)
      
  }

  return !didLoginFailed ? (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Observer>
        {() => {
          const { appStore } = store;
          return (
            <GoogleLogin
              size="large"
              width="300px"
              theme={appStore.theme === "dark" ? "filled_blue" : "outline"}
              onSuccess={(credentialResponse) => {
                if (credentialResponse.credential)
                  store.authStore
                    .OAuthLoginUser(credentialResponse.credential)
                    .then(() => {
                      handleRouteToProfile()
                    })
                    .catch((err) => setDidLoginFailed(true));
                else setDidLoginFailed(true);
              }}
              onError={() => {
                setDidLoginFailed(true);
              }}
            />
          );
        }}
      </Observer>
    </GoogleOAuthProvider>
  ) : (
    <Button
      color="red"
      variant="light"
      onClick={() => {
        setDidLoginFailed(false);
      }}
    >
      Failed to login with Google. Click to retry.
    </Button>
  );
}

export default SignInWithGoogle;
