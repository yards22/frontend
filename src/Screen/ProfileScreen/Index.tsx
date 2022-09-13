import { Observer } from "mobx-react-lite";
import { useStores } from "../../Logic/Providers/StoresProviders";

function ProfileIndex() {
  const store = useStores();
  return (
    <Observer>
      {() => {
        const { authStore } = store;
        return (
        <div
          style={{
            "height" : "100vh"            
          }}
        >
           Profile
        </div>)
      }}
    </Observer>
  );
}

export default ProfileIndex;
