import ProvidedApp from "./ProvidedApp";
import ProtectedRoutes from "./ProtectedRoutes";
import ProfileIndex from "./Screen/ProfileScreen/Index";
import LogoutIndex from "./Screen/LogoutScreen/Index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginIndex from "./Screen/LoginScreen/Index";
import NetworkIndex from "./Screen/NetworkScreen/Index";

function App() {
  return (
    <ProvidedApp>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginIndex />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="network" element={<NetworkIndex />} />
            <Route path="profile" element={<ProfileIndex />} />
            <Route path="logout" element={<LogoutIndex />} />
          </Route>
          <Route>404</Route>
        </Routes>
      </Router>
    </ProvidedApp>
  );
}

export default App;
