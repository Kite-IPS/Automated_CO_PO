import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import AttainmentSheet from "./Pages/AttainmentSheet";
import GenerateCOPO from "./Pages/GenerateCOPO";
import Login from "./Pages/Login";
import UserProvider, { UserContext } from "./Context/userContext";
import VerifyEmail from "./Pages/VerifyEmail";

const App = () => {
  React.useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === null) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    } else {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/attainment-sheet" element={<AttainmentSheet />} />
          <Route path="/generate-co-po" element={<GenerateCOPO />} />
          <Route path="/" element={<Root />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <Outlet />;

  if (!user) {
    return <Navigate to="/login" />;
  }
};
