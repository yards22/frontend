import { Observer } from "mobx-react-lite";
import styled from "styled-components";
import { useStores } from "../../Logic/Providers/StoresProviders";
import ComingSoonIndex from "./ComingSoon/Index";
import FeedbackIndex from "./Feedback/Index";

const SRightFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${(p: any) =>
    p.theme.width > 800 ? "300px" : `${(p.theme.width * 36.5) / 100}px`};
  margin-left: 30px;
  margin-top: 15px;
`;

function RightFooterIndex() {
  const store = useStores();
  return (
    <Observer>
      {() => {
        const { appStore, authStore } = store;
        if (!authStore.user) return <></>;
        return (
          <SRightFooter theme={{ width: appStore.deviceWidth }}>
            <ComingSoonIndex />
            <div className="h-8" />
            <FeedbackIndex />
          </SRightFooter>
        );
      }}
    </Observer>
  );
}

export default RightFooterIndex;
