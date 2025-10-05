import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";

const App = () => {
  React.useEffect(() => {
    // Remove the theme initialization from here as it's now handled in ThemeToggleButton
    const theme = localStorage.getItem('theme');
    if (theme === null) {
      // If no theme is set, check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    } else {
      // Apply saved theme
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/dashboard" index element={<Dashboard/>} />
      </Routes>
    </Router>
  );
};

export default App;
