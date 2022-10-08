import { Observer } from "mobx-react-lite";
import styled from "styled-components";
import { useStores } from "../../Logic/Providers/StoresProviders";

const SRightPane = styled.div`
  border: 1px solid black;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

function RightPane() {
  const store = useStores();
  return (
    <Observer>
      {() => {
        const { authStore } = store;
        return (
          <SRightPane>
              Right Pane
          </SRightPane>
        );
      }}
    </Observer>
  );
}

export default RightPane;
