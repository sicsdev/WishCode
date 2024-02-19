import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./css/login.css";
import "./css/style.css";
import RouteCom from "./Component/RouteCom";
import { GoogleOAuthProvider } from '@react-oauth/google';
function App() {
  return (
    <div>
      <Router>
        <div className="App">
          <RouteCom />
        </div>
      </Router>
    </div>
  );
}
export default App;
