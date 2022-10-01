import React from "react";
import ReactDOM from "react-dom/client";
import styled from "styled-components";
import App from "./App";
import ProvidedApp from "./ProvidedApp";

const SIndex = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  padding: 10px;
  maxwidth: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 50px;
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ProvidedApp>
      <App />
    </ProvidedApp>
  </React.StrictMode>
);
