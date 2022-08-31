import React, { useEffect, useRef } from "react";
import { useStores } from "../../Logic/Providers/StoresProviders";

const loadScript = (src: any): Promise<void> =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.body.appendChild(script);
  });

function SignInWithGoogle() {
  // ref for google button
  const googleButton = useRef(null);
  const store = useStores();
  useEffect(() => {
    const src = "https://accounts.google.com/gsi/client";
    const id =
      "442538559529-bm10qpqtcg3k06rrgnc4i0pqnc3fee4s.apps.googleusercontent.com";

    loadScript(src)
      .then(() => {
        /*global google*/
        google.accounts.id.initialize({
          client_id: id,
          callback: handleCredentialResponse,
        });
        google.accounts.id.renderButton(googleButton.current, {
          theme: store.appStore.theme == "dark" ? "filled_blue" : "outline",
          size: "large",
          width: "300px",
        });
      })
      .catch(console.error);

    return () => {
      const scriptTag = document.querySelector(`script[src="${src}"]`);
      if (scriptTag) document.body.removeChild(scriptTag);
    };
  }, [store.appStore.theme]);

  function handleCredentialResponse(response: any) {
    console.log("Id Token: " + response.credential);
  }

  return <div ref={googleButton}></div>;
}

export default SignInWithGoogle;
