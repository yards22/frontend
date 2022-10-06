import React from "react";
import ReactDOM from "react-dom/client";
import styled from "styled-components";
import App from "./App";
import ProvidedApp from "./ProvidedApp";

const SIndex = styled.div`
      display : flex;
      justify-content : center;
      height : calc(100vh - 60px);
      padding : 10px;
      max-width : 1400px;
      margin-left : auto;
      margin-right : auto;
      margin-top : 60px;
      
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ProvidedApp>
      <SIndex>
      <App />
      </SIndex>
    </ProvidedApp>
  </React.StrictMode>
);
