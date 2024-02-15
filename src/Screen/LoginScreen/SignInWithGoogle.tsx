import { useStores } from "../../Logic/Providers/StoresProviders";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Observer } from "mobx-react-lite";
import { useState } from "react";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
const CLIENT_ID =
  "909534443970-bqntlk3fokr64jn8lofg1sg9f651io8b.apps.googleusercontent.com";


interface ISignInWithGoogle{
    r : string|null,
    p : string|null
}

function SignInWithGoogle(props:ISignInWithGoogle) {
  const [didLoginFailed, setDidLoginFailed] = useState(false);
  const store = useStores();
  const navigate = useNavigate();

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
                    .OAuthLoginUser(credentialResponse.credential,props.r,props.p)
                    .then(() => {})
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
