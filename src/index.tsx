import React from "react";
import ReactDOM from "react-dom/client";
import styled from "styled-components";
import App from "./App";
import ProvidedApp from "./ProvidedApp";

const SIndex = styled.div`
      display : flex;
      justifyContent : space-around;
      height : 100vh;
      padding : 10px;
      border : 1px solid black;
      maxWidth : 1400px;
      marginLeft : auto;
      marginRight : auto;
      padding-top : 50px;
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
