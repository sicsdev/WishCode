import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./css/login.css";
import "./css/style.css";
import RouteCom from "./Component/RouteCom";

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
