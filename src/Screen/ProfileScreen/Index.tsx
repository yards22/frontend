import { Observer } from "mobx-react-lite";
import styled from "styled-components";
import { useStores } from "../../Logic/Providers/StoresProviders";
import ProfileSectionIndex from "./ProfileDetailsSection/Index";


const SProfileIndex = styled.div`
   
`
function ProfileIndex() {
  const store = useStores();
  return (
    <Observer>
      {() => {
        const { authStore } = store;
        return (
        <SProfileIndex
        >
           <ProfileSectionIndex/>
        </SProfileIndex>)
      }}
    </Observer>
  );
}

export default ProfileIndex;
