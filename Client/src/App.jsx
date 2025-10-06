import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import AttainmentSheet from "./Pages/AttainmentSheet";
import GenerateCOPO from "./Pages/GenerateCOPO";

const App = () => {
  React.useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === null) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    } else {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/attainment-sheet" element={<AttainmentSheet/>}/>
        <Route path="/generate-co-po" element={<GenerateCOPO/>} />
      </Routes>
    </Router>
  );
};

export default App;
