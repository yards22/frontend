import { Observer } from "mobx-react-lite";
import styled from "styled-components";
import { useStores } from "../../Logic/Providers/StoresProviders";
import FeedbackIndex from "./Feedback/Index";
import ScoreCarousalIndex from "./ScoreCarousal/Index";

const SRightFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${(p: any) =>
    p.theme.width > 800 ? "300px" : `${(p.theme.width * 36.5) / 100}px`};
  margin-left: 30px;
  padding-top: 20px;
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
            <ScoreCarousalIndex />
            <FeedbackIndex />
          </SRightFooter>
        );
      }}
    </Observer>
  );
}

export default RightFooterIndex;
