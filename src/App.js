import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./css/login.css";
import "./css/style.css";
import RouteCom from "./Component/RouteCom";
import { ColorProvider } from "./commanapi/ColorProvider";
function App() {
  return (
    <ColorProvider>
      <Router>
        <div className="App">
          <RouteCom />
        </div>
      </Router>
    </ColorProvider>
  );
}
export default App;
