import { Observer } from "mobx-react-lite";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStores } from "../../Logic/Providers/StoresProviders";
import LeftPane from "./LeftPane";
import RightPane from "./RightPane";

const SLoginIndex = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

function LoginIndex() {
  const [isPhone, setIsPhone] = useState(false);
  useEffect(() => {
    setIsPhone(window.innerWidth < 700);
  }, []);
  return (
    <SLoginIndex>
      <LeftPane />
      {!isPhone && <RightPane />}
    </SLoginIndex>
  );
}

export default LoginIndex;
