import { Observer } from "mobx-react-lite";
import { useStores } from "../../Logic/Providers/StoresProviders";

function ProfileIndex() {
  const store = useStores();
  return (
    <Observer>
      {() => {
        const { authStore } = store;
        return <div>{authStore.user?.mail_id}</div>;
      }}
    </Observer>
  );
}

export default ProfileIndex;
